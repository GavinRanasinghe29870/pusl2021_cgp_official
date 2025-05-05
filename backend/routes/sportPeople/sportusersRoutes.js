const express = require('express');
const router = express.Router();
const DonationRequest = require('../models/DonationRequest');

router.get('/', async (req, res) => {
  try {
    const donations = await DonationRequest.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

module.exports = router;
