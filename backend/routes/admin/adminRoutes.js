const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin/Admin");

const router = express.Router();

// POST /api/admin/signin
router.post("/signin", async (req, res) => {
  try {
    const { username, password, sportLevel } = req.body;

    if (!username || !password || !sportLevel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (admin.sportLevel !== sportLevel)
      return res.status(403).json({ message: "Access denied for this role" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.sportLevel },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: admin._id,
        username: admin.username,
        role: admin.sportLevel,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
