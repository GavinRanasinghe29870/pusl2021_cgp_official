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
  uploadedBy: {
    type: String,
    ref: 'Clubuser',
    required: true
  }
});

module.exports = mongoose.model("RegistrationApproval", registrationApprovalSchema);
