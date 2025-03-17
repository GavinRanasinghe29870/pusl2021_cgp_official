const express = require('express');
const router = express.Router();
const User = require('../../models/sportPeople/User.js');
const Message = require('../../models/clubs/messageModel.js');
const { protectRoute } = require('../../middleware/authMiddleware.js');
const { getReceiverSocketId, io } = require('../../lib/socket.js');

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Find users that the logged-in user has chatted with
        const chattedUsers = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { senderId: loggedInUserId },
                        { receiverId: loggedInUserId }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    userIds: {
                        $addToSet: {
                            $cond: [
                                { $eq: ["$senderId", loggedInUserId] },
                                "$receiverId",
                                "$senderId"
                            ]
                        }
                    }
                }
            }
        ]);

        const userIds = chattedUsers.length > 0 ? chattedUsers[0].userIds : [];

        const filteredUsers = await User.find({ _id: { $in: userIds } }).select('-password');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
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