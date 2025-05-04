const express = require("express");
const router = express.Router();
const CheckoutOrder = require("../../models/clubs/CheckoutOrder.js"); // Import the CheckoutOrder model

// POST: Handle checkout and save order
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      payment,
      cartItems,
      totalPrice,
    } = req.body;

    console.log("Request Body:", req.body); // Debugging request body

    // Validate required fields
    if (!firstName || !lastName || !email || !mobile || !address || !cartItems || !totalPrice) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new checkout order
    const newOrder = new CheckoutOrder({
      firstName,
      lastName,
      email,
      mobile,
      address,
      payment,
      cartItems,
      totalPrice,
    });

    // Save the order to the database
    await newOrder.save();
    console.log("Order saved successfully:", newOrder); // Debugging saved order

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;