const express = require('express');
const router = express.Router();
const Club = require('../../models/sportPeople/Club');

// GET all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find(); // Find all clubs
    res.json(clubs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
