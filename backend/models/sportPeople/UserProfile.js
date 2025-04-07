const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  city: String,
  birthday: Date,
  email: String,
  contactNo: String,
  job: String,
  coverPhoto: String,
  profilePhoto: String,
  sports: [String],
  favoriteSport: String,
  skillLevel: String,
  preferredPositions: String,
  personalRecords: String,
  highlights: String,
  shortTermGoals: String,
  longTermGoals: String,
  trainingBackground: String,
  clubsAndTeams: String,
  yearsPlaying: Number,
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", userProfileSchema);
