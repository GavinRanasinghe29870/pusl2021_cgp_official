const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Member = require("../../models/clubs/member"); // Adjust if path differs

router.post("/insert-test-member", async (req, res) => {
  const { sender, recipient } = req.body;

  if (!sender || !recipient) {
    return res.status(400).json({ message: "Sender and recipient are required" });
  }

  try {
    // Convert string IDs to ObjectId
    const senderId = new mongoose.Types.ObjectId(sender);
    const recipientId = new mongoose.Types.ObjectId(recipient);

    // Check if request already exists
    const exists = await Member.findOne({ sender: senderId, recipient: recipientId });
    if (exists) {
      return res.status(409).json({ message: "Member request already exists" });
    }

    // Create new Member
    const newMember = new Member({
      sender: senderId,
      recipient: recipientId,
    });

    await newMember.save();

    res.status(201).json({ message: "Member inserted successfully", member: newMember });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
