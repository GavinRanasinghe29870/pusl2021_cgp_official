const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SigninUser = require('../../models/sportPeople/signin') //Imports the User model
const SignupUser = require('../../models/sportPeople/signup');
const router = express.Router()

//User Sign-Up Route
router.post("/signup", async (req, res) => {
  try {
      const { firstName, age, username, password, mobile, address, email, sportLevel, gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = new SignupUser({ firstName, age, username, password: hashedPassword, mobile, address, email, sportLevel, gender });
      await newUser.save();

      res.json({ message: "User registered successfully!" });
  } catch (error) {
      res.status(500).json({ error: "Error registering user" });
  }
});

//User Sign-In Route
router.post('/signin', async (req, res) => {
  const { username, password, role } = req.body;

  try {
      const user = await SignupUser.findOne({ username, role });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return res.status(401).json({ message: 'Invalid Password' });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, message: 'Sign in successful' });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  } 
})

/* router.post('/google', async (req, res) => { 
    // Implement Google OAuth logic
   });

router.post('/facebook', async (req, res) => {
    // Implement Facebook OAuth logic
  });

router.post('/linkedin', async (req, res) => {
    // Implement LinkedIn OAuth logic
  }); */
module.exports = router 

