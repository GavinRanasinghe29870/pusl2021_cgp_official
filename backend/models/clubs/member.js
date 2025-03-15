// models/Member.js
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  image: { type: String }, // Store the image path here
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
