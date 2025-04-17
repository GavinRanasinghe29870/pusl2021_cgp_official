const express = require('express');
const cors = require('cors');
const DonatingRequest = require('../../models/sportPeople/DonatingRequest'); // <-- Correct model name
const upload = require('../../uploads');
const router = express.Router();

// Donation Request Route with Image Upload
router.post('/DonatingRequest', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, address, email, phone, description } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    // Save data to MongoDB using the correct model
    const newDonating = new DonatingRequest({
      name,
      address,
      email,
      phone,
      description,
      profilePic,
    });

    await newDonating.save();
    res.status(201).json({
      message: 'Donating request submitted successfully!',
      donatings: newDonating,
    });
  } catch (error) {
    console.error('Error submitting donating request:', error);
    res.status(500).json({ error: 'Server Error. Try again later.' });
  }
});

// Get all donation requests
router.get('/donatings', async (req, res) => {
  try {
    const donating = await DonatingRequest.find().sort({ createdAt: -1 });
    res.status(200).json(donating);
  } catch (error) {
    console.error('Error fetching donating requests:', error);
    res.status(500).json({ error: 'Server Error. Try again later.' });
  }
});

// Get a single donation request by ID
router.get('/donatings/:id', async (req, res) => {
  try {
    const donating = await DonatingRequest.findById(req.params.id);
    if (!donating) {
      return res.status(404).json({ message: 'Donating request not found' });
    }
    res.status(200).json(donating);
  } catch (error) {
    console.error('Error fetching donating request:', error);
    res.status(500).json({ error: 'Server Error. Try again later.' });
  }
});

module.exports = router;
