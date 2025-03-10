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