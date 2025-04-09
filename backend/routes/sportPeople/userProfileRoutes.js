const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('../../controllers/userProfileController');
// const authMiddleware = require('../../middleware/authMiddleware'); // Enable if using auth

// 🔹 Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path =
      file.fieldname === 'profilePhoto'
        ? 'uploads/profile_photos'
        : file.fieldname === 'coverPhoto'
        ? 'uploads/cover_photos'
        : 'uploads/post_images';
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


// 👤 Basic User
router.get('/user/:id', controller.getUser);
router.put('/user/:id', controller.updateUser);

// 👥 Friends
router.put('/user/:id/friends/:friendId', controller.toggleFriend);

// 📋 Profile (Extended UserProfile model)
router.get('/user/:id/profile-data', controller.getProfile);      // GET full profile data (user + profile)
router.put('/user/:id/profile-data', controller.upsertProfile);   // PUT to create/update profile

// 📸 Uploads
router.post('/user/:id/profile-photo', upload.single('profilePhoto'), controller.uploadProfilePhoto);
router.post('/user/:id/cover-photo', upload.single('coverPhoto'), controller.uploadCoverPhoto);

// 📝 Posts
router.post('/user/:id/post', upload.single('image'), controller.createPost);
router.get('/user/:id/posts', controller.getUserPosts);
router.put('/post/:postId/like', controller.likePost);
router.put('/post/:postId/comment', controller.commentPost);
router.put('/post/:postId/repost', controller.repostPost);
router.delete('/post/:postId', controller.deletePost);

module.exports = router;
