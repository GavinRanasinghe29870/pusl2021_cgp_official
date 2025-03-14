// routes/memberRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Member = require("../../models/clubs/member");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  },
});

const upload = multer({ storage });

// POST: Add a new member with image upload
router.post("/members", upload.single("image"), async (req, res) => {
  try {
    const { name, location, experience, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newMember = new Member({ name, location, experience, image, status });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch all members
router.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
