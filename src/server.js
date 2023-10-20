const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();


const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to your MongoDB database
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import user model functions
const { registerUser, loginUser } = require("./service/user");
const { createProduct, getProducts } = require("./service/product");

// User registration route
app.post("/api/user/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  try {
    const user = await registerUser(firstName, lastName, username, password);
    res.status(201).json({ message: "Registration successful", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// User login route
app.post("/api/user/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await loginUser(username, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
});

app.post("/api/product/create", async (req, res) => {
    const { name, description, price, quantity } = req.body;
    try {
      const product = await createProduct(name, description, price, quantity);
      res.status(201).json({ message: "Product created", data: product });
    } catch (error) {
      res.status(500).json({ message: "Product creation failed" });
    }
  });

  app.get("/api/product/list", async (req, res) => {
    const { page, limit } = req.query;
    try {
      const products = await getProducts(page, limit);
      res.status(200).json({ data: products });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
