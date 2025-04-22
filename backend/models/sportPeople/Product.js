const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pd_name: {
        type: String,
        required: true
    },
    pd_category: {
        type: String,
        required: true
    },
    pd_price: {
        type: Number,
        required: true
    },
    pd_description: { 
        type: String, 
        required: true 
    },
    pd_colors: {
        type: [String],
        default: []
    },
    pd_size: {
        type: [String], 
        default: []
    }
});

module.exports = mongoose.model("Product", productSchema);
