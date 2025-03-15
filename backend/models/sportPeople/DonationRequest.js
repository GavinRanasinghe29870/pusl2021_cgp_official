const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true }, // Fixed typo here
  profilePic: { type: String }, // Image filename
}, { timestamps: true });

const DonationRequest = mongoose.model('DonationRequest', donationSchema);

module.exports = DonationRequest;
