const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/sportPeople/User");
const { protectRoute } = require("../../middleware/authMiddleware.js");
const { generateToken } = require("../../lib/utils.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// SIGN UP - SportPeople
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("sportLevel")
      .equals("SportPeople")
      .withMessage("Invalid role! Only SportPeople can sign up"),
  ],
  async (req, res) => {
    const {
      firstName,
      age,
      username,
      email,
      password,
      sportLevel,
      mobile,
      address,
      gender,
    } = req.body;

    // Input Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    console.log("Signup Request:", { username, sportLevel });

    if (sportLevel !== "SportPeople") {
      return res
        .status(403)
        .json({ success: false, error: "Unauthorized role!" });
    }

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, error: "Username already exists!" });
      }

      const newUser = new User({
        firstName,
        age,
        username,
        email,
        password,
        sportLevel,
        mobile,
        address,
        gender,
      });

      await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "User registered successfully!" });
    } catch (err) {
      console.error("Signup Error:", err);
      res
        .status(500)
        .json({ success: false, error: "Failed to register user." });
    }
  }
);

// POST /api/auth/signin
router.post("/signin", async (req, res) => {
  const { username, password, sportLevel } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Verify if sportLevel matches the user's level
    if (user.sportLevel !== sportLevel) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const token = generateToken(user._id, res);

    console.log("Login Successful:", {
      user: {
        _id: user._id,
        firstName: user.firstName,
        age: user.age,
        username: user.username,
        mobile: user.mobile,
        address: user.address,
        email: user.email,
        sportLevel: user.sportLevel,
        gender: user.gender,
        profilePhoto: user.profilePhoto,
      },
      token,
    });

    res.json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        age: user.age,
        username: user.username,
        mobile: user.mobile,
        address: user.address,
        email: user.email,
        sportLevel: user.sportLevel,
        gender: user.gender,
        profilePhoto: user.profilePhoto,
      },
      token,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// CHECK LOGIN STATUS
router.get("/check", protectRoute, checkAuth);

module.exports = router;
