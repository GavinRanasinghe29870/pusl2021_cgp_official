require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:3000/checkout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Order Schema
const OrderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  address: String,
  productName: String,
  itemPrice: Number,
  itemCount: Number,
  totalPrice: Number,
  paymentStatus: { type: String, default: 'Pending' },
});

const Order = mongoose.model('Order', OrderSchema);

// 🛒 Place an Order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📜 Get All Orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PayPal Payment Placeholder
app.post('/api/paypal-payment', async (req, res) => {
  try {
    // Simulate payment process (Replace with PayPal SDK)
    console.log('Processing PayPal Payment:', req.body);
    res.json({ message: 'Payment processing...', success: true });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});