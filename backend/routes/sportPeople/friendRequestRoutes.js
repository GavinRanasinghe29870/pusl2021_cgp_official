const express = require('express');
const { protectRoute } = require('../../middleware/authMiddleware');
const User = require('../../models/sportPeople/User');
const FriendRequest = require('../../models/sportPeople/friendRequest');
const Notification = require('../../models/sportPeople/Notification');
const router = express.Router();

const sendFriendRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const senderId = req.user._id;

        if (senderId.toString() === userId) {
            return res.status(400).json({ message: "You can't send a request to yourself" });
        }

        if (req.user.friends.includes(userId)) {
            return res.status(400).json({ message: "You are already connected" });
        }

        const existingRequest = await FriendRequest.findOne({
            sender: senderId,
            recipient: userId,
            status: "pending",
        });

        if (existingRequest) {
            return res.status(400).json({ message: "A connection request already exists" });
        }

        const newRequest = new FriendRequest({
            sender: senderId,
            recipient: userId,
        });

        await newRequest.save();

        const notification = new Notification({
            recipient: userId,
            type: "newFriendRequest",
            relatedUser: senderId,
            relatedRequest: newRequest._id,
        });
        
        await notification.save();

        res.status(201).json({ message: "Connection request sent successfully" });
    } catch (error) {
        console.error("Error in sendFriendRequest:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user._id;

        const request = await FriendRequest.findById(requestId)
            .populate("sender", "firstName username")
            .populate("recipient", "firstName username");

        if (!request) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (request.recipient._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to accept this request" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ message: "This request has already been processed" });
        }

        request.status = "accepted";
        await request.save();

        await User.findByIdAndUpdate(request.sender._id, { $addToSet: { friends: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { friends: request.sender._id } });

        const notification = new Notification({
            recipient: request.sender._id,
            type: "friendRequestAccepted",
            relatedUser: userId,
            relatedRequest: request._id,
        });

        await notification.save();

        res.json({ message: "Connection accepted successfully" });
    } catch (error) {
        console.error("Error in acceptFriendRequest:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const rejectFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user._id;

        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (request.recipient.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to reject this request" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ message: "This request has already been processed" });
        }

        request.status = "rejected";
        await request.save();

        res.json({ message: "Connection request rejected" });
    } catch (error) {
        console.error("Error in rejectFriendRequest:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        const requests = await FriendRequest.find({ recipient: userId, status: "pending" }).populate(
            "sender",
            "firstName username profilePicture friends"
        );

        res.json(requests);
    } catch (error) {
        console.error("Error in getFriendRequests:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getUserFriends = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate(
            "friends",
            "firstName username profilePicture friends"
        );

        res.json(user.friends);
    } catch (error) {
        console.error("Error in getUserFriends:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const removeFriend = async (req, res) => {
    try {
        const myId = req.user._id;
        const { userId } = req.params;

        await User.findByIdAndUpdate(myId, { $pull: { friends: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { friends: myId } });

        res.json({ message: "Friend removed successfully" });
    } catch (error) {
        console.error("Error in removeFriend:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getFriendStatus = async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        const currentUserId = req.user._id;

        if (req.user.friends.includes(targetUserId)) {
            return res.json({ status: "connected" });
        }

        const pendingRequest = await FriendRequest.findOne({
            $or: [
                { sender: currentUserId, recipient: targetUserId },
                { sender: targetUserId, recipient: currentUserId },
            ],
            status: "pending",
        });

        if (pendingRequest) {
            if (pendingRequest.sender.toString() === currentUserId.toString()) {
                return res.json({ status: "pending" });
            } else {
                return res.json({ status: "received", requestId: pendingRequest._id });
            }
        }

        res.json({ status: "not_connected" });
    } catch (error) {
        console.error("Error in getFriendStatus:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Route Definitions
router.post('/send/:userId', protectRoute, sendFriendRequest);
router.post('/accept/:requestId', protectRoute, acceptFriendRequest);
router.post('/reject/:requestId', protectRoute, rejectFriendRequest);
router.get('/requests', protectRoute, getFriendRequests);
router.get('/friends', protectRoute, getUserFriends);
router.delete('/remove/:userId', protectRoute, removeFriend);
router.get('/status/:userId', protectRoute, getFriendStatus);

module.exports = router;