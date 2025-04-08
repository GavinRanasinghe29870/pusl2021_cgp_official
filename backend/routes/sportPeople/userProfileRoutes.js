const express = require("express");
const router = express.Router();
const {
  upsertProfile,
  getOwnProfile,
  getUserProfileById,
  addPost,
  likePost,
  commentOnPost,
  repost,
  deletePost,
} = require("../../controllers/userProfileController");

const { protectRoute } = require("../../middleware/authMiddleware");

// Profile routes
router.get("/me", protectRoute, getOwnProfile);
router.post("/me", protectRoute, upsertProfile);
router.get("/:id", protectRoute, getUserProfileById);

// Post routes
router.post("/posts", protectRoute, addPost);
router.put("/posts/:profileId/:postId/like", protectRoute, likePost);
router.post("/posts/:profileId/:postId/comment", protectRoute, commentOnPost);
router.put("/posts/:profileId/:postId/repost", protectRoute, repost);
router.delete("/posts/:postId", protectRoute, deletePost);

module.exports = router;
