const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const controller = require('../../controllers/userProfileController');

// 🔹 Multer Storage Config with folder creation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';

    if (file.fieldname === 'profilePhoto') {
      folder = 'uploads/profile_photos';
    } else if (file.fieldname === 'coverPhoto') {
      folder = 'uploads/cover_photos';
    } else {
      folder = 'uploads/post_images';
    }

    const fullPath = path.join(__dirname, '../../', folder);

    // ✅ Create folder if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

/* ===============================
   🔗 USER + PROFILE ROUTES
================================= */

// 👤 Basic User
router.get('/user/:id', controller.getUser);
router.put('/user/:id', controller.updateUser);

// 👥 Friends
router.put('/user/:id/friends/:friendId', controller.toggleFriend);

// 📋 Profile (Extended UserProfile model)
router.get('/user/:id/profile-data', controller.getProfile);
router.put('/user/:id/profile-data', controller.upsertProfile);

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
