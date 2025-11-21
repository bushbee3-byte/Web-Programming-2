// server.js
// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const { request, response } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
 
const { DB_URI } = process.env;
const Product = require("./models/product");
 
// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors()); // allow frontend to call this backend
 
// Connect to the database
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });
 
// Routes
server.get("/", (request, response) => {
  response.send("Server is Live");
});
 
//  Get all products
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});
 
//  Add a product
server.post("/add-product", async (request, response) => {
  const { id, productName, brand, image, price } = request.body;
 
  const newProduct = new Product({
    id,
    productName,
    brand,
    image,
    price,
  });
 
  try {
    await newProduct.save();
    response.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});
 
//  Delete a product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
   d
 
  try {
    await Product.findByIdAndDelete(id);
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});
 
//  Update a product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params; 
  const { productName, brand, image, price } = request.body;
 
  try {
    await Product.findByIdAndUpdate(id, {
      productName,
      brand,
      image,
      price,
    }).then((response) => {
      console.log(response);

    });
await 
response.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});
 
 