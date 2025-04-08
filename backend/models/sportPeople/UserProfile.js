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
  coverPhoto: String,
  profilePhoto: String,
  city: String,
  sports: [String],
  skillLevel: String,
  positions: String,
  personalRecords: String,
  recentHighlights: String,
  shortTermGoals: String,
  longTermGoals: String,
  trainingBackground: String,
  clubsAndTeams: String,
  yearsPlaying: String,
  otherSports: String,
  birthday: String,
  job: String,

  photos: [String],
  videos: [String],
  posts: [postSchema],
});

module.exports = mongoose.model("UserProfile", profileSchema);
