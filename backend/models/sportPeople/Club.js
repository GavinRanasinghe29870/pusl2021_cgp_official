const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  ClubName: { type: String, required: true },
  Clubusername: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String },
  address: { type: String },
  sportLevel: { type: String },
  logo: { type: String }, // Optional if you want to add club logo later
});

module.exports = mongoose.model('Club', clubSchema);
