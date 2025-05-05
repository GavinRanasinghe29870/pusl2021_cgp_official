const express = require('express');
const router = express.Router();
const User = require('../../models/sportPeople/User.js');
const Clubuser = require('../../models/clubs/Clubuser.js');
const Message = require('../../models/clubs/messageModel.js');
const { protectRoute } = require('../../middleware/authMiddleware.js');
const { getReceiverSocketId, io } = require('../../lib/socket.js');
const Notification = require('../../models/sportPeople/Notification.js');

const getUsersForSidebar = async (req, res) => {
    try {
        if (req.user) {
            const loggedInUserId = req.user._id;

            const loggedInUser = await User.findById(loggedInUserId)
                .populate('friends', '-password')
                .populate('registeredClubs', '-password');

            const friends = loggedInUser.friends;
            const registeredClubs = loggedInUser.registeredClubs;

            const users = await User.find({ _id: { $in: friends } }).select("-password");
            const Clubusers = await Clubuser.find({ _id: { $in: registeredClubs } }).select("-password");

            const allUsers = [...users, ...Clubusers];

            const usersWithLastMessage = await Promise.all(
                allUsers.map(async (user) => {
                    const lastMessage = await Message.findOne({
                        $or: [
                            { senderId: loggedInUserId, receiverId: user._id },
                            { senderId: user._id, receiverId: loggedInUserId }
                        ]
                    })
                        .sort({ createdAt: -1 })
                        .select("text createdAt");

                    return {
                        ...user.toObject(),
                        lastMessage: lastMessage || null,
                    };
                })
            );

            res.status(200).json(usersWithLastMessage);
        } else if (req.club) {
            const loggedInUserId = req.club._id;

            const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

            const usersWithLastMessage = await Promise.all(
                allUsers.map(async (user) => {
                    const lastMessage = await Message.findOne({
                        $or: [
                            { senderId: loggedInUserId, receiverId: user._id },
                            { senderId: user._id, receiverId: loggedInUserId }
                        ]
                    })
                        .sort({ createdAt: -1 })
                        .select("text createdAt");

                    return {
                        ...user.toObject(),
                        lastMessage: lastMessage || null,
                    };
                })
            );

            res.status(200).json(usersWithLastMessage);
        }
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        if (req.user) {
            const { id: userToChatId } = req.params;
            const myId = req.user._id;

            await Message.updateMany(
                {
                    senderId: userToChatId,
                    receiverId: myId,
                    read: false
                },
                { $set: { read: true } }
            );

            const messages = await Message.find({
                $or: [
                    { senderId: myId, receiverId: userToChatId },
                    { senderId: userToChatId, receiverId: myId }
                ]
            });

            res.status(200).json(messages);
        } else if (req.club) {
            const { id: userToChatId } = req.params;
            const myId = req.club._id;

            await Message.updateMany(
                {
                    senderId: userToChatId,
                    receiverId: myId,
                    read: false
                },
                { $set: { read: true } }
            );

            const messages = await Message.find({
                $or: [
                    { senderId: myId, receiverId: userToChatId },
                    { senderId: userToChatId, receiverId: myId }
                ]
            });

            res.status(200).json(messages);
        }
    } catch (error) {
        console.log("Error in getMessages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendMessages = async (req, res) => {
    try {
        if (req.user) {
            const { text, receiverId } = req.body;
            const senderId = req.user._id;

            const newMessage = new Message({
                senderId,
                receiverId,
                text
            });

            await newMessage.save();

            if (senderId === req.user._id) {
                const newNotification = new Notification({
                    recipient: receiverId,
                    recipientModel: "User", 
                    type: "message", 
                    relatedUser: senderId,
                    relatedUserModel: "User",
                });
    
                await newNotification.save();
            } else if (senderId === req.club._id) {
                const newNotification = new Notification({
                    recipient: receiverId,
                    recipientModel: "User", 
                    type: "message", 
                    relatedUser: senderId,
                    relatedUserModel: "Clubuser",
                });
    
                await newNotification.save();
            }

            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }

            res.status(200).json(newMessage);
        } else if (req.club) {
            const { text, receiverId } = req.body;
            const senderId = req.club._id;

            const newMessage = new Message({
                senderId,
                receiverId,
                text
            });

            await newMessage.save();

            const newNotification = new Notification({
                recipient: receiverId,
                recipientModel: "Clubuser", 
                type: "message", 
                relatedUser: senderId,
                relatedUserModel: "User",
            });

            await newNotification.save();

            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }

            res.status(200).json(newMessage);
        }
    } catch (error) {
        console.log("Error in sendMessages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const { id: otherUserId } = req.params;
        const myId = req.user?._id || req.club?._id;

        const count = await Message.countDocuments({
            senderId: otherUserId,
            receiverId: myId,
            read: false
        });

        res.status(200).json(count);
    } catch (error) {
        console.log("Error in getUnreadCount:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

router.get('/unread-count/:id', protectRoute, getUnreadCount);
router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessages);

module.exports = router;