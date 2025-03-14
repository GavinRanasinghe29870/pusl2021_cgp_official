const express = require('express');
const cors = require('cors');
const Donation = require('../../models/sportPeople/DonationRequest');
const upload = require('../../uploads'); // Corrected path
const router = express.Router();

// Donation Request Route with Image Upload
router.post('/DonationRequest', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, address, email, phone, description } = req.body;
    const profilePic = req.file ? req.file.filename : null; // Store image filename

    // Save data to MongoDB
    const newDonation = new Donation({
      name,
      address,
      email,
      phone,
      description,
      profilePic,
    });

    await newDonation.save();
    res.status(201).json({
      message: 'Donation request submitted successfully!',
      donation: newDonation,
    });
  } catch (error) {
    console.error('Error submitting donation request:', error);
    res.status(500).json({ error: 'Server Error. Try again later.' });
  }
});

module.exports = router;
