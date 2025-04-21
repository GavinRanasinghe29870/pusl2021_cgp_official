const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Clubuser = require("../../models/clubs/Clubuser");
const { protectRoute } = require("../../middleware/authMiddleware.js");
const { generateToken } = require("../../lib/utils.js");

dotenv.config();


const allowedRoles = ["SportPeople", "Admin", "Clubs"];

//Club Sign-Up Route
router.post("/Clubsignup", async (req, res) => {

    console.log("Received Signup Request:", req.body);
    try {
        const { ClubName, Clubusername, password, confirmPassword, mobile, address, email, sportLevel } = req.body;

        // Check for missing required fields
        if (!ClubName || !Clubusername || !password || !confirmPassword || !email || !sportLevel) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        // Validate sportLevel
        if (!allowedRoles.includes(sportLevel)) {
            return res.status(400).json({ error: `Invalid sportLevel selected: ${sportLevel}` });
        }


        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match or are empty" });
        }


        // Check if the user already exists
        const existingUser = await Clubuser.findOne({
            $or: [{ Clubusername }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({ error: "User with this username or email already exists" })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newClubuser = new Clubuser({
            ClubName,
            Clubusername,
            password: hashedPassword,
            mobile,
            address,
            email,
            sportLevel,

        });

        await newClubuser.save();
    }

    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

//Club Signin Route
router.post("/Clubsignin", async (req, res) => {
    const { Clubusername, password, sportLevel } = req.body;

    try {
        // Validate input
        if (!Clubusername || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Find the user in the database
        const club = await Clubuser.findOne({ Clubusername });
        if (!club) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, club.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Verify sportLevel
        if (club.sportLevel !== sportLevel) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        // Generate a token
        const token = generateToken(club._id, res);

        // Respond with user data and token
        res.json({
            club: {
                _id: club._id,
                ClubName: club.ClubName,
                Clubusername: club.Clubusername,
                mobile: club.mobile,
                address: club.address,
                email: club.email,
                sportLevel: club.sportLevel,
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
        res.status(200).json(req.club);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// CHECK LOGIN STATUS
router.get("/check", protectRoute, checkAuth);


module.exports = router;

