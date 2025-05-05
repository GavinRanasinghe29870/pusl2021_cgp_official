const express = require("express");
const router = express.Router();
const upload = require("../../uploadpdf");
const RegistrationApproval = require("../../models/clubs/RegistrationApproval");
const Clubuser = require("../../models/clubs/Clubuser");
const mongoose = require("mongoose");

// Upload a PDF file
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log("File upload request received.");
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { uploadedBy, clubId } = req.body; // Get username and clubId from form data
    
    if (!uploadedBy || !clubId) {
      return res.status(400).json({ message: "Username and club ID are required" });
    }

    // Validate that the club exists in the database
    const userExists = await Clubuser.findById(clubId);
    if (!userExists) {
      return res.status(404).json({ message: "Club not found. Please login again." });
    }

    // Also verify the username matches the club ID
    if (userExists.Clubusername !== uploadedBy) {
      return res.status(400).json({ message: "Username and club ID do not match" });
    }

    const newFile = new RegistrationApproval({
      fileName: req.file.filename,
      filePath: req.file.path,
      clubId: clubId, // Save the club ID
      uploadedBy: uploadedBy, // Save the username
      status: "pending" // Default status
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
      uploadedBy: file.uploadedBy,
      clubId: file.clubId,
      status: file.status || "pending",
      remarks: file.remarks || ""
    }));

    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error("Error fetching uploaded files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get uploaded PDFs by club ID
router.get("/files/club/:clubId", async (req, res) => {
  try {
    const clubId = req.params.clubId;
    
    // Validate clubId format
    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return res.status(400).json({ message: "Invalid club ID format" });
    }
    
    // Find files uploaded by this specific club using the ID
    const files = await RegistrationApproval.find({ clubId: clubId });
    
    // Construct file URLs
    const formattedFiles = files.map((file) => ({
      _id: file._id,
      fileName: file.fileName,
      fileUrl: `http://localhost:5000/uploads/pdfs/${file.fileName}`,
      uploadedAt: file.uploadedAt,
      uploadedBy: file.uploadedBy,
      clubId: file.clubId,
      status: file.status || "pending",
      remarks: file.remarks || ""
    }));

    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error("Error fetching club's uploaded files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Keep the username route for backward compatibility
router.get("/files/:username", async (req, res) => {
  try {
    const username = req.params.username;
    
    // Find files uploaded by this specific username
    const files = await RegistrationApproval.find({ uploadedBy: username });
    
    // Construct file URLs
    const formattedFiles = files.map((file) => ({
      _id: file._id,
      fileName: file.fileName,
      fileUrl: `http://localhost:5000/uploads/pdfs/${file.fileName}`,
      uploadedAt: file.uploadedAt,
      uploadedBy: file.uploadedBy,
      clubId: file.clubId,
      status: file.status || "pending",
      remarks: file.remarks || ""
    }));

    res.status(200).json(formattedFiles);
  } catch (error) {
    console.error("Error fetching user's uploaded files:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a file
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

// Update document status (for admin use)
// Update document status (for admin use)
router.put("/status/:id", async (req, res) => {
  try {
    const { status, remarks } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'pending', 'accepted', or 'rejected'" });
    }

    // First update the registration approval status
    const updatedFile = await RegistrationApproval.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    // Then update the corresponding club's status
    await Clubuser.findByIdAndUpdate(
      updatedFile.clubId,
      { status: status },
      { new: true }
    );

    res.status(200).json({
      message: "Status updated successfully",
      file: {
        _id: updatedFile._id,
        fileName: updatedFile.fileName,
        status: updatedFile.status,
        remarks: updatedFile.remarks,
      },
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;