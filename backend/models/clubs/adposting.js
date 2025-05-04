const mongoose = require("mongoose");

const adPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdPosting", adPostingSchema);
