const express = require('express');
const router = express.Router();
const User = require('../../models/sportPeople/User.js');
const Message = require('../../models/clubs/messageModel.js');
const { protectRoute } = require('../../middleware/authMiddleware.js');
const { getReceiverSocketId, io } = require('../../lib/socket.js');

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Fetch all users except the logged-in user
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // Fetch the last message for each user
        const usersWithLastMessage = await Promise.all(
            users.map(async (user) => {
                const lastMessage = await Message.findOne({
                    $or: [
                        { senderId: loggedInUserId, receiverId: user._id },
                        { senderId: user._id, receiverId: loggedInUserId }
                    ]
                })
                    .sort({ createdAt: -1 }) // Sort by most recent message
                    .select("text createdAt"); // Select only the fields you need

                return {
                    ...user.toObject(),
                    lastMessage: lastMessage || null, // Include the last message or null if no messages exist
                };
            })
        );

        res.status(200).json(usersWithLastMessage);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendMessages = async (req, res) => {
    try {
        const { text, receiverId } = req.body;
        const senderId = req.user._id;

        const newMessage = new Message({
            senderId,
            receiverId,
            text
        });

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessages);

module.exports = router;