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

// GET orders by user ID with populated product details
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate('productId'); // Assumes productId refers to a Product model
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update order quantity
router.put('/:orderId', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.quantity = quantity;
    order.totalAmount = quantity * order.price;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order quantity:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete order (remove product from cart)
router.delete('/:orderId', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order removed successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE all orders by userId
router.delete('/user/:userId', async (req, res) => {
  try {
    const result = await Order.deleteMany({ userId: req.params.userId });
    res.status(200).json({
      message: "All orders for user deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("Error deleting user's orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




module.exports = router;