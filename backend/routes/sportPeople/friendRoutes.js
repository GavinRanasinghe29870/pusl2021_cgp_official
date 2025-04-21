const express = require("express");
const router = express.Router();
const User = require("../../models/sportPeople/User.js");
const FriendMessage = require("../../models/sportPeople/friendMessageModel.js");
const { protectRoute } = require("../../middleware/authMiddleware.js");
const { getReceiverSocketId, io } = require("../../lib/socket.js");

// 📌 Get all users for friend sidebar (excluding logged-in user)
const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await FriendMessage.findOne({
          $or: [
            { senderId: loggedInUserId, receiverId: user._id },
            { senderId: user._id, receiverId: loggedInUserId },
          ],
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
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Get all messages between two users
const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await FriendMessage.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📌 Send a new friend message
const sendMessages = async (req, res) => {
  try {
    const { text, receiverId } = req.body;
    const senderId = req.user._id;

    console.log("Sending message:", { senderId, receiverId, text }); // ✅ Debug line

    const newMessage = new FriendMessage({
      senderId,
      receiverId,
      text,
    });

    await newMessage.save();

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

// 📌 Routes
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:receiverId", protectRoute, getMessages); // ✅ Use receiverId as param
router.post("/send", protectRoute, sendMessages);      // ✅ No param here anymore!

module.exports = router;
