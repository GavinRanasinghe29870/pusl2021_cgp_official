const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  uploadCoverPhoto,
  createPost,
  getUserPosts,
  likePost,
  commentOnPost,
  repost,
  deletePost
} = require("../../controllers/sportPeople/profileController"); // ✅ fixed path

const { protect } = require("../../middleware/authMiddleware");
const multer = require("multer");

// Setup multer for media uploads (profile, cover, posts)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Profile routes
router.get("/:userId", protect, getProfile);
router.put("/:userId", protect, updateProfile);

// Upload profile/cover photos
router.post("/upload/profile", protect, upload.single("image"), uploadProfilePhoto);
router.post("/upload/cover", protect, upload.single("image"), uploadCoverPhoto);

// Posts routes
router.post("/posts", protect, upload.single("media"), createPost);
router.get("/posts/:userId", protect, getUserPosts);
router.patch("/posts/like/:postId", protect, likePost);
router.patch("/posts/comment/:postId", protect, commentOnPost);
router.patch("/posts/repost/:postId", protect, repost);
router.delete("/posts/:postId", protect, deletePost);

module.exports = router;
