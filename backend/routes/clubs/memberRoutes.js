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


// Approve Member
router.post("/members/:id/approve", async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" }, // Update status to Approved
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject Member
router.post("/members/:id/reject", async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" }, // Update status to Rejected
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Move member back to Pending
router.post("/members/:id/pending", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });

    member.status = "Pending"; // Change status back to Pending
    await member.save();
    res.status(200).json({ message: "Member moved to pending", member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
