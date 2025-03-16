const mongoose = require("mongoose");

const SingleProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {
    Specifications: [{ title: { type: String, required: true }, value: { type: String, required: true } }],
    Features: [{ title: { type: String, required: true }, value: { type: String, required: true } }],
    Package: [{ title: { type: String, required: true }, value: { type: String, required: true } }],
  },
  highlights: [{ type: String, required: true }], // Ensure highlights are always present
  price: { type: Number, required: true, min: 0 }, // Prevent negative prices
  images: { type: [String], default: [] }, // Set a default empty array
  colors: { type: [String], default: [] },
});

const Product = mongoose.models.Product || mongoose.model("Product", SingleProductSchema);

module.exports = Product;

