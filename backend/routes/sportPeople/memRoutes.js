const express = require('express');
const router = express.Router();
const Member = require('../../models/clubs/member');

// Fetch only the approved members
router.get('/members/approved', async (req, res) => {
  try {
    const approvedMembers = await Member.find({ status: 'Approved' });
    console.log("Approved Members Fetched:", approvedMembers);  // <--- Add this
    res.json(approvedMembers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
