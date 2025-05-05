const express = require("express");
const router = express.Router();
const Member = require("../../models/clubs/member");
const User = require("../../models/sportPeople/User");

// Fetch member requests by recipient club (clubUserId)
router.get("/recipient/:clubUserId", async (req, res) => {
  try {
    const { clubUserId } = req.params;

    // Find all member requests where the recipient is the given club
    const members = await Member.find({ recipient: clubUserId })
      .populate("sender")  // Populate sender (User)
      .populate("recipient");  // Populate recipient (Club)
    
    if (!members.length) {
      return res.status(404).json({ message: "No member requests found" });
    }

    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching member requests:", error);
    res.status(500).json({ error: "An error occurred while fetching member requests." });
  }
});

// Update a member request status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // Fetch member and populate sender and recipient
    const member = await Member.findById(req.params.id)
      .populate("sender")
      .populate("recipient");

    if (!member) {
      return res.status(404).json({ message: "Member request not found" });
    }

    // Update the member's status
    member.status = status;
    await member.save();

    // If the status is "accepted", add the recipient (club) to the sender's registeredClubs
    if (status === "accepted") {
      const user = await User.findById(member.sender._id);

      if (user) {
        const clubId = member.recipient._id.toString();

        // Check if the club is already in the user's registeredClubs array
        if (!user.registeredClubs) {
          user.registeredClubs = [];
        }

        const alreadyExists = user.registeredClubs.some(
          (id) => id.toString() === clubId
        );

        // If the club is not in the array, add it
        if (!alreadyExists) {
          user.registeredClubs.push(clubId);
          await user.save();  // Ensure that changes are saved
        }
      }
    }

    // Fetch and return the updated member with sender and recipient populated
    const updatedMember = await Member.findById(member._id)
      .populate("sender")
      .populate("recipient");

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;