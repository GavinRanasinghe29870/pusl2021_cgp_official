const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/sportPeople/User"); 

router.get("/myfriends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("friends");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove a friend
router.delete("/remove/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    console.log("Deleting friend...");
    console.log("User ID:", userId);
    console.log("Friend ID:", friendId);

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(400).json({ message: "Invalid user or friend ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Remove friend ID from user's friends array
    user.friends = user.friends.filter(
      (fid) => fid.toString() !== friendId
    );

    await user.save();

    console.log("Friend removed successfully.");
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ message: "Failed to remove friend", error: error.message });
  }
});


module.exports = router;
