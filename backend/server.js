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
const friendRequestRoutes = require("./routes/sportPeople/friendRequestRoutes.js");
const memberRoutes = require("./routes/clubs/memberRoutes");
const registrationApprovalRoutes = require("./routes/clubs/registrationApprovalRoutes");
const ClubAuth = require("./routes/clubs/ClubAuth.js");
const donatingRoutes = require("./routes/sportPeople/donatingRoutes");
const ClubRoutes = require("./routes/clubs/Clubs.js");
const checkoutRoute = require("./routes/sportPeople/checkoutRoute.js");
const userRoutes = require('./routes/sportPeople/userRoutes');
const registeredClubsRoutes = require('./routes/sportPeople/RegisteredClubsRoutes.js');
const sportuserRoutes = require('./routes/sportPeople/sportusersRoutes.js');



app.use("/api/club", ClubRoutes);


const jwt = require("jsonwebtoken");

const token = jwt.sign({ userId: "12345" }, process.env.JWT_SECRET, {
  expiresIn: "1h",
});

console.log("Generated Token:", token);
const salesRoutes = require('./routes/admin/salesRoute.js');

const clubRoutes = require('./routes/sportPeople/clubRoutes');
const memRoutes = require("./routes/sportPeople/memRoutes");
const adpostRoutes = require("./routes/clubs/adpostRoutes");
const myFriendsRoutes = require("./routes/sportPeople/myFriendsRoutes.js");


const friendRoutes= require("./routes/sportPeople/friendRoutes.js")
const orderRoutes = require("./routes/sportPeople/orderRoutes.js")

// const memberTestInsert = require("./routes/memberTestInsert");

//const donatingRoutes = require("./routes/sportPeople/donatingRoutes"); //



const notificationRoutes = require("./routes/sportPeople/notificationRoutes.js");

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
app.use("/api/members", memberRoutes);
app.use("/api/myfrnd", myFriendsRoutes);

app.use('/api/clubs', clubRoutes);
app.use("/api/sportPeople", memRoutes);
app.use('/api/user', userRoutes); 
app.use("/api/adposts", adpostRoutes);
app.use('/api/checkout', checkoutRoute);
app.use("/api/regclubs", registeredClubsRoutes);


app.use("/api/orders", orderRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/friendRequest", friendRequestRoutes);
app.use("/api/friendmsg",friendRoutes);
app.use("/api/sportuser", sportuserRoutes);
app.use("/api/donating", donatingRoutes); //
app.use("/api/notifications", notificationRoutes);
app.use("/api/ClubAuth", ClubAuth);
 


app.use("/api/sales", salesRoutes);
// app.use("/api", memberTestInsert);


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
