const UserProfile = require("../models/sportPeople/UserProfile");
const Post = require("../models/sportPeople/Post");
const fs = require("fs");
const path = require("path");
const { io } = require("../lib/socket"); // <-- Socket import

// ========== PROFILE ==========

const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      { profilePhoto: imageUrl }
    );
    res.json({ profilePhoto: imageUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const uploadCoverPhoto = async (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      { coverPhoto: imageUrl }
    );
    res.json({ coverPhoto: imageUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ========== POSTS ==========

const createPost = async (req, res) => {
  try {
    const post = new Post({
      author: req.user._id,
      description: req.body.description,
      media: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await post.save();

    io.emit("newPost", post); // ✅ Real-time broadcast

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      post.likes.pull(userId); // Unlike
    } else {
      post.likes.push(userId); // Like
    }

    await post.save();
    io.emit("postLiked", post._id); // ✅ Real-time update

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);

    const newComment = {
      user: req.user._id,
      text,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    io.emit("postCommented", { postId: post._id, comment: newComment }); // ✅ Real-time update

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const repost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const userId = req.user._id;

    if (!post.reposts.includes(userId)) {
      post.reposts.push(userId);
      await post.save();
      io.emit("postReposted", post._id); // ✅ Real-time update
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    // Optional: delete media file from disk
    if (post.media) {
      const mediaPath = path.join(__dirname, "..", post.media);
      fs.access(mediaPath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(mediaPath, (unlinkErr) => {
            if (unlinkErr) console.error("Failed to delete media file:", unlinkErr.message);
          });
        }
      });
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  uploadCoverPhoto,
  createPost,
  getUserPosts,
  likePost,
  commentOnPost,
  repost,
  deletePost,
};
