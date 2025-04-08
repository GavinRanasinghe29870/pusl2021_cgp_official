const UserProfile = require("../models/sportPeople/UserProfile");

// Create or Update Profile
exports.upsertProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profileData = req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: profileData },
      { new: true, upsert: true }
    );
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Own Profile
exports.getOwnProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.userId });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Another User’s Profile by ID
exports.getUserProfileById = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.params.id });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// Post-related functions
// ===============================

// Add a new Post
exports.addPost = async (req, res) => {
  const userId = req.user.userId;
  const { description, image } = req.body;

  try {
    const profile = await UserProfile.findOne({ user: userId });
    const newPost = { description, image };

    profile.posts.unshift(newPost);
    await profile.save();

    res.status(201).json(profile.posts[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a Post
exports.likePost = async (req, res) => {
  const userId = req.user.userId;
  const { profileId, postId } = req.params;

  try {
    const profile = await UserProfile.findById(profileId);
    const post = profile.posts.id(postId);

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await profile.save();
    }

    res.status(200).json({ message: "Post liked!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Comment on a Post
exports.commentOnPost = async (req, res) => {
  const userId = req.user.userId;
  const { profileId, postId } = req.params;
  const { text } = req.body;

  try {
    const profile = await UserProfile.findById(profileId);
    const post = profile.posts.id(postId);

    post.comments.push({ user: userId, text });
    await profile.save();

    res.status(201).json(post.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Repost a Post
exports.repost = async (req, res) => {
  const userId = req.user.userId;
  const { profileId, postId } = req.params;

  try {
    const profile = await UserProfile.findById(profileId);
    const post = profile.posts.id(postId);

    if (!post.reposts.includes(userId)) {
      post.reposts.push(userId);
      await profile.save();
    }

    res.status(200).json({ message: "Post reposted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Post (Only Owner)
exports.deletePost = async (req, res) => {
  const userId = req.user.userId;
  const { postId } = req.params;

  try {
    const profile = await UserProfile.findOne({ user: userId });

    profile.posts = profile.posts.filter(
      (post) => post._id.toString() !== postId
    );

    await profile.save();
    res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
