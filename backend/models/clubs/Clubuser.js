const mongoose = require('mongoose');

const ClubuserSchema = new mongoose.Schema({
    ClubName: { type: String, required: true },
    Clubusername: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String },
    address: { type: String },
    sportLevel: { type: String, required: true, enum: ["SportPeople", "Admin", "Clubs"] },
   
});

module.exports = mongoose.model('Clubuser', ClubuserSchema);