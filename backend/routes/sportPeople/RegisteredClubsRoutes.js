const express = require("express");
const router = express.Router();
const User = require("../../models/sportPeople/User");


router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("registeredClubs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
