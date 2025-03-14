const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../../models/sportPeople/User")//Imports the User model
const router = express.Router()

const allowedRoles = ["SportPeople", "Admin", "Clubs"];

//User Sign-Up Route
router.post("/signup", async (req, res) => {

    console.log("Received Signup Request:", req.body);
  try {
    const { firstName, age, username, password, confirmPassword, mobile, address, email, sportLevel, gender } = req.body;

    // Check for missing required fields
    if (!firstName || !age || !username || !password || !confirmPassword || !email || !sportLevel) {
        return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Validate sportLevel
    if (!sportLevel || !allowedRoles.includes(sportLevel)) {
        console.error("Invalid sportLevel:", sportLevel);
        return res.status(400).json({ error: `Invalid sportLevel selected: ${sportLevel}` });
    }
    

    // Check if passwords match
    if (!password || !confirmPassword || password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match or are empty" });
    }
    

    // Check if the user already exists
    console.log("Checking database for existing username or email...");
    const existingUser = await User.findOne({ 
        $or: [{ username  }, { email }] });

        console.log("Existing User Found:", existingUser);

        if(existingUser){
            return res.status(409).json({error: "User with this username or email already exists"})
        }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
        firstName,
        age,
        username,
        password: hashedPassword,
        mobile,
        address,
        email,
        sportLevel,  // Save the selected role
        gender
    });

    // Save user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
} catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
}
});

//User Sign-In Route
router.post('/signin', async (req, res) => {
    console.log("Received Sign-In Request:", req.body);
  const { username, password, sportLevel } = req.body;

  try {
      const user = await User.findOne({ username, sportLevel });
      if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        { 
            return res.status(401).json({ error: 'Invalid Password' });
        }

      const token = jwt.sign({ id: user._id, sportLevel: user.sportLevel }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, message: 'Sign in successful' });
  } catch (error) {
    console.error("Sign-in Error:", error);
    res.status(500).json({ error: "Server error" });  } 
})


module.exports = router;

