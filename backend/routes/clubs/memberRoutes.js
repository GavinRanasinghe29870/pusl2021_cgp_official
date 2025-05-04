const express = require("express");
const router = express.Router();
const Member = require("../../models/clubs/member");
const User = require("../../models/sportPeople/User"); // Make sure the path is correct

// Get member requests by sender ID
router.get("/sender/:senderId", async (req, res) => {
  try {
    const members = await Member.find({ sender: req.params.senderId }).populate("recipient");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get member requests by recipient ID
router.get("/recipient/:recipientId", async (req, res) => {
  try {
    const members = await Member.find({ recipient: req.params.recipientId })
      .populate("sender")
      .populate("recipient");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get member requests by status
router.get("/status/:status", async (req, res) => {
  try {
    const members = await Member.find({ status: req.params.status }).populate("sender recipient");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a member request status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // Update the member status
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("sender recipient");

    if (!member) {
      return res.status(404).json({ message: "Member request not found" });
    }

    // If approved, add the club to the user's registeredClubs array
    if (status === "accepted") {
      const user = await User.findById(member.sender._id);

      if (user) {
        if (!user.registeredClubs) {
          user.registeredClubs = [];
        }

        const clubId = member.recipient._id;
        const alreadyExists = user.registeredClubs.some(
          (id) => id.toString() === clubId.toString()
        );

        if (!alreadyExists) {
          user.registeredClubs.push(clubId);
          await user.save();
        }
      }
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
