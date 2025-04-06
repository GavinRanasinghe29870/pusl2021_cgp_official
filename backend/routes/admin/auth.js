const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/admin/Admin'); // Ensure the correct import
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, password, sportLevel } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword, sportLevel });
    await newAdmin.save();
    
    return res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

//Signin Route
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username only
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'User not found' });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id}, // Include sportLevel in token payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return token & sportLevel in response
    return res.json({ token, sportLevel: admin.sportLevel });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
