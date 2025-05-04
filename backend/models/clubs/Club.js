const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  clubName: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  photos: [{ type: String }],
  boardMembers: [{ name: String, image: String }],
  headCoach: { 
    information: String // Replace all fields with a single "information" field
  },
  facilities: { type: String },
  events: [{ type: String }],
  matchHistory: { type: String },
  registrationFee: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Club', ClubSchema);
