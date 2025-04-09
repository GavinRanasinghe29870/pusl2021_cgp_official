// models/sportPeople/UserProfile.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: String,
  image: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // 🖼️ Media
  profilePhoto: String,
  coverPhoto: String,
  photos: [String],
  videos: [String],

  // 🧍 Basic Personal Info
  name: String,
  email: String,
  contactNo: String,
  birthday: String,
  gender: String,
  job: String,
  city: String,

  // 🏅 Sports Info
  sports: [String],
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
  otherAchievements: String,

  // 📬 Posts
  posts: [postSchema],
});

module.exports = mongoose.model("UserProfile", profileSchema);
