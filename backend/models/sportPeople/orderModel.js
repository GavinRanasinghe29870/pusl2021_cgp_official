const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  selectedColor: { type: String, required: true },
  selectedSize: { type: String, required: true },
  price: { type: Number, required: true }, // Price per unit
  totalAmount: { type: Number, required: true }, // Total price (price * quantity)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);