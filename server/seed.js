const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const sampleProducts = [
  {
    name: "Laptop",
    price: 999.99,
    image: "https://via.placeholder.com/300x200?text=Laptop",
    description: "High-performance laptop for work and gaming.",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "Smartphone",
    price: 699.99,
    image: "https://via.placeholder.com/300x200?text=Smartphone",
    description: "Latest smartphone with advanced features.",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Headphones",
    price: 199.99,
    image: "https://via.placeholder.com/300x200?text=Headphones",
    description: "Noise-cancelling wireless headphones.",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "T-Shirt",
    price: 29.99,
    image: "https://via.placeholder.com/300x200?text=T-Shirt",
    description: "Comfortable cotton t-shirt.",
    category: "Clothing",
    stock: 50,
  },
  {
    name: "Book",
    price: 19.99,
    image: "https://via.placeholder.com/300x200?text=Book",
    description: "Bestselling novel.",
    category: "Books",
    stock: 30,
  },
];

const seedDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce",
  );
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log("Database seeded");
  process.exit();
};

seedDB();
