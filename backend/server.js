const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { app, server } = require("./lib/socket.js");

//Load environment variables
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

app.use("/uploads/profile_photos", express.static("uploads/profile_photos"));
app.use("/uploads/cover_photos", express.static("uploads/cover_photos"));
app.use("/uploads/post_images", express.static("uploads/post_images"));

const authRoutes = require("./routes/sportPeople/authRoutes");
const userProfileRoutes = require("./routes/sportPeople/userProfileRoutes");
const productRoutes = require("./routes/sportPeople/productRoutes");
const adminRoutes = require("./routes/admin/adminRoutes.js");
const messageRoutes = require("./routes/clubs/messageRoutes.js");
const donationRoutes = require("./routes/sportPeople/donationRoutes");
const memberRoutes = require("./routes/clubs/memberRoutes");
const SingleProductRoutes = require("./routes/sportPeople/SingleProductRoutes");
const registrationApprovalRoutes = require("./routes/clubs/registrationApprovalRoutes");
const ClubAuth = require("./routes/clubs/ClubAuth.js");
const donatingRoutes = require("./routes/sportPeople/donatingRoutes"); //
const notificationRoutes = require("./routes/sportPeople/notificationRoutes.js");

const jwt = require("jsonwebtoken");

const token = jwt.sign({ userId: "12345" }, process.env.JWT_SECRET, {
  expiresIn: "1h",
});

console.log("Generated Token:", token);

app.post("/api/donation", (req, res) => {
  console.log("Received donation request:", req.body); // Log the request body
  // Process the donation data here...
  res.send("Donation received!");
});

// Serve static files (for uploaded images)
app.use("/public/uploads", express.static("uploads"));
//mount routs
app.use("/api", userProfileRoutes);

//Link Signin Authentication Routes
app.use("/api/auth", authRoutes);
// ✅ Mount Admin Auth Routes

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/req", memberRoutes);
app.use("/api/donating", donatingRoutes); //
app.use("/api/notifications", notificationRoutes);
app.use("/api/ClubAuth", ClubAuth);
app.use("/api/messages", messageRoutes);

app.use("/api/singleproduct", SingleProductRoutes);

// Serve uploaded PDFs
app.use("/uploads/pdfs", express.static("uploads/pdfs"));

// Use Registration Approval Routes
app.use("/api/registrationApproval", registrationApprovalRoutes);

// Middleware to serve product images (if using an "uploads" folder)
app.use("/uploads", express.static("uploads"));

// Fallback route for undefined API endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint not found" });
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
