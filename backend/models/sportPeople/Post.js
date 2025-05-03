const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // ✅ Allows population of user data like name, profilePhoto
  },
  description: String,
  image: String,
  likes: [String],
  reposts: [String],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true }); // ✅ Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Post', PostSchema);
