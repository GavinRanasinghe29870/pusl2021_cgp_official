const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    orderId: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered"], required: true }
}, { timestamps: true });

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
