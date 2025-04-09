require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin/Admin");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const adminInsert = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists. Skipping insertion.");
      return;
    }

    const hashedPassword = await bcrypt.hash("1234", 10);
    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
      sportLevel: "Admin",
    });

    await admin.save();
    console.log("✅ Admin inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting admin:", err);
  } finally {
    mongoose.connection.close();
  }
};

adminInsert();
