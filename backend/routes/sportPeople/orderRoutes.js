const express = require("express");
const router = express.Router();
const Order = require("../../models/sportPeople/orderModel");
const mongoose = require("mongoose");

// Create a new order
router.post("/", async (req, res) => {
  try {
    console.log("Received order request:", req.body);
    
    const { userId, productId, quantity, selectedColor, selectedSize, price, imageUrl } = req.body;
    
    // Validate required fields
    if (!userId || !productId || !quantity || !selectedColor || !selectedSize || !price || !imageUrl) {
      console.log("Missing required fields:", { userId, productId, quantity, selectedColor, selectedSize, price, imageUrl });
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Validate ObjectIDs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId format:", userId);
      return res.status(400).json({ message: "Invalid userId format" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log("Invalid productId format:", productId);
      return res.status(400).json({ message: "Invalid productId format" });
    }

    // Calculate total amount
    const totalAmount = parseFloat(price) * parseInt(quantity);

    const newOrder = new Order({
      userId,
      productId,
      quantity,
      selectedColor,
      selectedSize,
      price: parseFloat(price),
      totalAmount,
      imageUrl
    });

    console.log("Attempting to save order:", newOrder);
    const savedOrder = await newOrder.save();
    console.log("Order saved successfully:", savedOrder);
    
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Server error creating order:", err);
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // Populate user details
      .populate("productId", "pd_name pd_price pd_image"); // Populate product details
    
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// Get orders by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const orders = await Order.find({ userId })
      .populate("productId", "pd_name pd_price pd_image")
      .sort({ createdAt: -1 });
      
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
});

module.exports = router;