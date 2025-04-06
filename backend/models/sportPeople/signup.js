const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    sportLevel: { type: String },
    gender: { type: String },
    role: { type: String }
});

const SignupUser = mongoose.model('User', userSchema);

module.exports = SignupUser;