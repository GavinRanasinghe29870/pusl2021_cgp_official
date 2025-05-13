const express = require("express");
const router = express.Router();
const Sale = require("../../models/admin/salesModel"); 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Stripe setup

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems, user } = req.body;

  try {
    if (!cartItems || cartItems.length === 0 || !user) {
      return res.status(400).json({ error: "Invalid cart or user data" });
    }

    // Insert sales into MongoDB
    await Promise.all(
      cartItems.map((item) => {
        const sale = new Sale({
          orderId: Math.floor(Math.random() * 1000000),
          productName: item.productId?.pd_name || "Unnamed",
          address: user.address,
          date: new Date(),
          price: item.price * item.quantity,
          status: "Pending",
          userId: user._id,
          username: user.username
        });
        return sale.save();
      })
    );

    // Create line items for Stripe checkout
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.productId?.pd_name || "Unnamed Product",
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/shop",
      cancel_url: "http://localhost:3000/cart",
      customer_email: user.email,
      metadata: {
        userId: user._id,
        username: user.username,
      },
    });

    res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;
