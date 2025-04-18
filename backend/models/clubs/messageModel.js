const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            enum: ['User', 'Clubuser'],
            reqired: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            enum: ['User', 'Clubuser'],
            reqired: true,
        },
        text: {
            type : String,
        },
        image: {
            type : String,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);