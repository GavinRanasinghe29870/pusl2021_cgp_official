const mongoose = require('mongoose');

const donatingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true }, // Fixed typo here
  profilePic: { type: String }, // Image filename
}, { timestamps: true });

const DonatingRequest = mongoose.model('DonatingRequest', donatingSchema);

module.exports = DonatingRequest;
