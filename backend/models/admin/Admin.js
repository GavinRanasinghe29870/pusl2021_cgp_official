const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sportLevel: { type: String, enum: ['Sport People','Admin','Clubs'], required: true}
});

module.exports = mongoose.model('Admin', AdminSchema);

