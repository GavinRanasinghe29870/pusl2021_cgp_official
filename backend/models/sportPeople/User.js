const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String },
    address: { type: String },
    sportLevel: { type: String, required: true, enum: ["SportPeople", "Admin", "Clubs"] },
    gender: { type: String }
});

module.exports = mongoose.model('User', userSchema);
