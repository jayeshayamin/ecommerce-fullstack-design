const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const productsPath = path.join(__dirname, "../data/products.json");

const readProducts = () => JSON.parse(fs.readFileSync(productsPath, "utf8"));
const writeProducts = (products) =>
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

router.get("/", (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const products = readProducts();
    const product = products.find((p) => p.id == req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", (req, res) => {
  try {
    const products = readProducts();
    const newProduct = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const products = readProducts();
    const productIndex = products.findIndex((p) => p.id == req.params.id);
    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found" });
    products[productIndex] = { ...products[productIndex], ...req.body };
    writeProducts(products);
    res.json(products[productIndex]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const products = readProducts();
    const productIndex = products.findIndex((p) => p.id == req.params.id);
    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found" });
    products.splice(productIndex, 1);
    writeProducts(products);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
