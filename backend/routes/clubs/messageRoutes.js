const express = require('express');
const router = express.Router();
const User = require('../../models/sportPeople/User.js');
const Message = require('../../models/clubs/messageModel.js');

router.get('/users', async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/send/:id', async (req, res) => {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const newMessage = new Message({
            senderId,
            receiverId,
            text
        });

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;