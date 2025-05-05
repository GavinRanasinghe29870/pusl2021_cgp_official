const mongoose = require("mongoose");

const registrationApprovalSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  // Store both club ID and username
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubuser',
    required: true
  },
  uploadedBy: {
    type: String,
    ref: 'Clubuser',
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  remarks: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("RegistrationApproval", registrationApprovalSchema);