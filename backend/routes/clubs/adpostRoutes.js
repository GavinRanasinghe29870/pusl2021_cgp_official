const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AdPosting = require('../../models/clubs/adposting');

// Define the path for uploaded images
const uploadDir = path.join(__dirname, "../frontend/public/uploads/post_images");

// Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads folder created:', uploadDir);
} else {
  console.log('Uploads folder already exists:', uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Saving to:', uploadDir);
    cb(null, uploadDir); // Save under the post_images folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    console.log('Saving file:', uniqueSuffix);
    cb(null, uniqueSuffix); // Save with a unique filename
  },
});

// Multer upload configuration
const upload = multer({ storage });

// POST route to create an advertisement
router.post("/", upload.single("image"), async (req, res) => {
  console.log("✅ POST /adpost route hit");

  try {
    const { title, email, content } = req.body;
    const image = req.file ? req.file.filename : null;

    console.log("📦 Form Data Received:");
    console.log("Title:", title);
    console.log("Email:", email);
    console.log("Content:", content);
    console.log("File:", req.file ? req.file.filename : "No image uploaded");

    // Validation (optional)
    if (!title || !email || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new ad document
    const newAd = new AdPosting({
      title,
      email,
      content,
      image,
    });

    // Save to MongoDB
    const savedAd = await newAd.save();
    console.log("✅ Ad saved to database:", savedAd);

    // Respond to client
    res.status(201).json({ message: "Ad posted successfully", ad: savedAd });
  } catch (error) {
    console.error("❌ Error posting ad:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET route to fetch all advertisements
router.get("/all", async (req, res) => {
  try {
    const ads = await AdPosting.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ads" });
  }
});

module.exports = router;
