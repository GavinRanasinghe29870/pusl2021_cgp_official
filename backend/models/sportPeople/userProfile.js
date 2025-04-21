// models/sportPeople/UserProfile.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 🖼️ Media
  profilePhoto: String,
  coverPhoto: String,
  photos: { type: [String], default: [] },
  videos: { type: [String], default: [] },

  // 🧍 Basic Personal Info
  name: String,
  email: String,
  contactNo: String,
  birthday: String,
  gender: String,
  job: String,
  city: String,

  // 🏅 Sports Info
  sports: { type: [String], default: [] },
  skillLevel: String,
  positions: String,
  trainingBackground: String,
  clubsAndTeams: String,
  yearsPlaying: String,

  // 📈 Achievements
  personalRecords: String,
  recentHighlights: String,

  // 🧠 Goals
  shortTermGoals: String,
  longTermGoals: String,

  // 🏀 Other Sports
  otherSports: String,
  otherSkill: String,
  otherClubs: String,
  otherAchievements: String
},
{
  timestamps: true // ✅ Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model("UserProfile", profileSchema);
