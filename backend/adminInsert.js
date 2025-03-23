require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/admin/Admin");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Insert Admin Data
const adminInsert = async () => {
    try {
        const admin = new Admin({
            username: "admin",
            password: "1234",
            sportLevel: "Admin"
        });
        await admin.save();
        console.log(" Admin inserted successfully!");
    } catch (err) {
        console.error("Error inserting admin:", err);
    } finally {
        mongoose.connection.close(); // Close DB connection
    }
};

adminInsert();
