const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'recipientModel'
        },
        recipientModel: {
            type: String,
            required: true,
            enum: ['User', 'Clubuser']
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
            refPath: 'relatedUserModel',
        },
        relatedUserModel: {
            type: String,
            enum: ['User', 'Clubuser']
        },
        relatedRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FriendRequest',
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