const express = require("express");
const Product = require("../../models/sportPeople/Product");
const router = express.Router();

//Get all Products in loading
router.get("/", async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

//Get Products by Category
router.get("/category/:category", async (req, res) => {
    try{
        const products = await Product.find({ category: req.params.category});
        res.json(products);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;