const express = require("express");
const Sale = require("../../models/admin/salesModel"); // Adjust the path as necessary
const router = express.Router();

// Get all sales
router.get("/", async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get sale by ID
router.get("/id/:id", async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get sales by status (e.g., Pending, Shipped, Delivered)
router.get("/status/:status", async (req, res) => {
    try {
        const sales = await Sale.find({ status: req.params.status });
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Insert a new sale
router.post("/add", async (req, res) => {
    try {
        const newSale = new Sale(req.body);
        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update sale status by ID
router.patch("/update/:id", async (req, res) => {
    try {
        const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.json(updatedSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a sale by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedSale = await Sale.findByIdAndDelete(req.params.id);
        if (!deletedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.json({ message: "Sale deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
