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
    pd_image: {
        type: String,
        required: true
    },
    pd_description: { 
        type: String, required: true 
    },

});

module.exports = mongoose.model("Product", productSchema);