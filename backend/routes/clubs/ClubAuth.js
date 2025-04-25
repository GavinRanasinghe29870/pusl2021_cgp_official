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

        if (!ClubName || !Clubusername || !password || !confirmPassword || !email || !sportLevel) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        if (!allowedRoles.includes(sportLevel)) {
            return res.status(400).json({ error: `Invalid sportLevel selected: ${sportLevel}` });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await Clubuser.findOne({
            $or: [{ Clubusername }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({ error: "User with this username or email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Club Signin Route
router.post("/Clubsignin", async (req, res) => {
    const { Clubusername, password, sportLevel } = req.body;

    try {

        if (!Clubusername || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const club = await Clubuser.findOne({ Clubusername });
        if (!club) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, club.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        if (club.sportLevel !== sportLevel) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        const token = generateToken(club._id, res);

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

const checkClubAuth = async (req, res) => {
    try {
        res.status(200).json(req.club);
    } catch (error) {
        console.log("Error in checkClubAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// CHECK LOGIN STATUS
router.get("/check", protectRoute, checkClubAuth);


module.exports = router;

