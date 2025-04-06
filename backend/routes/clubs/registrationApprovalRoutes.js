const express = require("express");
const router = express.Router();
const upload = require("../../uploadpdf");
const RegistrationApproval = require("../../models/clubs/RegistrationApproval");
const Clubuser = require("../../models/clubs/Clubuser");

// Upload a PDF file
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log("File upload request received.");
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedBy = req.body.uploadedBy; // Get username from form data
    
    if (!uploadedBy) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Validate that the username exists in the database
    const userExists = await Clubuser.findOne({ Clubusername: uploadedBy });
    if (!userExists) {
      return res.status(404).json({ message: "Club username not found. Please enter a valid username." });
    }

    const newFile = new RegistrationApproval({
      fileName: req.file.filename,
      filePath: req.file.path,
      uploadedBy: uploadedBy // Save the username
    });

    await newFile.save();
    console.log("File uploaded successfully:", newFile);

    res.status(201).json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all uploaded PDFs with file URL
router.get("/files", async (req, res) => {
  try {
    const files = await RegistrationApproval.find();
    
    // Construct file URLs
    const formattedFiles = files.map((file) => ({
      _id: file._id,
      fileName: file.fileName,
      fileUrl: `http://localhost:5000/uploads/pdfs/${file.fileName}`,
      uploadedAt: file.uploadedAt,
      uploadedBy: file.uploadedBy
    }));

    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error("Error fetching uploaded files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// NEW ENDPOINT: Get uploaded PDFs by username
router.get("/files/:username", async (req, res) => {
  try {
    const username = req.params.username;
    
    // Find files uploaded by this specific user
    const files = await RegistrationApproval.find({ uploadedBy: username });
    
    // Construct file URLs
    const formattedFiles = files.map((file) => ({
      _id: file._id,
      fileName: file.fileName,
      fileUrl: `http://localhost:5000/uploads/pdfs/${file.fileName}`,
      uploadedAt: file.uploadedAt,
      uploadedBy: file.uploadedBy
    }));

    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error("Error fetching user's uploaded files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  console.log("DELETE request received for ID:", req.params.id);
  try {
    const file = await RegistrationApproval.findById(req.params.id);
    if (!file) {
      console.log("File not found");
      return res.status(404).json({ message: "File not found" });
    }

    // Delete file from server storage
    const fs = require("fs"); // Ensure this is at the top of the file
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    // Delete from database
    await RegistrationApproval.findByIdAndDelete(req.params.id);

    console.log("File deleted successfully");
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;