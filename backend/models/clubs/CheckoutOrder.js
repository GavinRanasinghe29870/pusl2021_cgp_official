const mongoose = require("mongoose");

const checkoutOrderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  address: String,
  payment: {
    cardNumber: String,
    expiry: String,
    cvv: String,
    cardholder: String,
  },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CheckoutOrder.js", checkoutOrderSchema);
