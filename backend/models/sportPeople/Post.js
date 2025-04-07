const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: String,
  media: String, // image or video URL
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
