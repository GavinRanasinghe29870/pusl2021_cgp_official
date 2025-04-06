const express = require("express");
const Product = require("../../models/sportPeople/Product");
const router = express.Router();

//Get all Products in loading
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get product by ID
router.get("/id/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//Get Products by Category
router.get("/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ pd_category:category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Insert Product
router.post("/add", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;