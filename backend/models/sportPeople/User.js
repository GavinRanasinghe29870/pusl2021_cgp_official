const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema(
  {
    // 🔑 Basic User Info
    firstName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Email validation regex
    },
    mobile: {
      type: String,
      match: /^[0-9]{10}$/, // Validate mobile number (10 digits)
    },
    address: {
      type: String,
    },
    sportLevel: {
      type: String,
      required: true,
      enum: ['SportPeople', 'Admin', 'Clubs'], // Enforced values for sportLevel
    },
    gender: {
      type: String,
    },

    // 🖼️ Media
    profilePhoto: String,
    coverPhoto: String,
    photos: { type: [String], default: [] },
    videos: { type: [String], default: [] },

    // 🧍 Basic Personal Info
    name: String,
    contactNo: String,
    birthday: String,
    job: String,
    city: String,

    // 🏅 Sports Info
    sports: { type: [String], default: [] },
    skillLevel: String,
    positions: String,
    trainingBackground: String,
    clubsAndTeams: String,
    yearsPlaying: String,

    // 📈 Achievements
    personalRecords: String,
    recentHighlights: String,

    // 🧠 Goals
    shortTermGoals: String,
    longTermGoals: String,

    // 🏀 Other Sports
    otherSports: String,
    otherSkill: String,
    otherClubs: String,
    otherAchievements: String,

    // 👫 Friends
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
  }
);

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);