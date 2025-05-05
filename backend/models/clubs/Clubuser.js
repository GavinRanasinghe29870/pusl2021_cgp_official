const mongoose = require('mongoose');

const ClubuserSchema = new mongoose.Schema({
  ClubName: { type: String, required: true },
  Clubusername: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, default: null },
  address: { type: String, default: null },
  sportLevel: { type: String, required: true, enum: ["SportPeople", "Admin", "Clubs"] },
  sportCategory: {
    type: String,
    required: true,
    enum: [
      "Cricket",
      "Badminton",
      "Volleyball",
      "Basketball",
      "Table Tennis",
      "Tennis",
      "Football",
      "Chess",
      "Netball",
      "Swimming",
    ]
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

  location: { type: String, default: null },
  description: { type: String, default: null },
  logo: { type: String, default: null },
  photos: { type: [String], default: null },
  boardMembers: {
    type: [
      {
        name: { type: String, default: null },
        image: { type: String, default: null }
      }
    ],
    default: null
  },
  headCoach: {
    information: { type: String, default: null },
    image: { type: String, default: null }
  },
  facilities: { type: [String], default: null },
  events: { type: [String], default: null },
  matchHistory: { type: String, default: null },
  registrationFee: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Clubuser', ClubuserSchema);