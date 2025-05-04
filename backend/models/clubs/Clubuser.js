const mongoose = require('mongoose');

const ClubuserSchema = new mongoose.Schema({
  ClubName: { type: String, required: true },
  Clubusername: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String },
  address: { type: String },
  sportLevel: { type: String, required: true, enum: ["SportPeople", "Admin", "Clubs"] },

  location: { type: String, default: "" },
  description: { type: String, default: "" },
  logo: { type: String, default: "" },
  photos: { type: [String], default: [] },
  boardMembers: {
    type: [
      {
        name: { type: String },
        image: { type: String }
      }
    ],
    default: []
  },
  headCoach: {
    information: { type: String, default: "" },
    image: { type: String, default: "" }
  },
  facilities: { type: [String], default: [] },
  events: { type: [String], default: [] },
  matchHistory: { type: String, default: "" },
  registrationFee: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Clubuser', ClubuserSchema);
