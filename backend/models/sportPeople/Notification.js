const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [
                'like', 
                'comment',
                'newFriendRequest',
                'friendRequestAccepted', 
                'clubRequestAccepted',
                'clubRequestRejected', 
                'message'
            ],
            required: true,
        },
        relatedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        relatedRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FriendRequest',
        },
        relatedClub: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Clubuser',
        },
        relatedPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);