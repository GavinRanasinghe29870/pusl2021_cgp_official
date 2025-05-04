const express = require('express');
const { protectRoute } = require('../../middleware/authMiddleware');
const Notification = require('../../models/sportPeople/Notification');
const router = express.Router();

const getUserNotifications = async (req, res) => {
    try {
        if (req.user && req.user._id) {
            const notifications = await Notification.find({ recipient: req.user._id })
                .sort({ createdAt: -1 })
                .populate('relatedUser', 'firstName username ClubName Clubusername profilePicture')
                .populate('relatedPost', 'content image');

            res.status(200).json(notifications);
        } else if (req.club && req.club._id) {
            const notifications = await Notification.find({ recipient: req.club._id })
                .sort({ createdAt: -1 })
                .populate('relatedUser', 'firstName username ClubName Clubusername profilePicture')
                .populate('relatedPost', 'content image');

            res.status(200).json(notifications);
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id;
    try {
        if (req.user && req.user._id) {
            const notification = await Notification.findByIdAndUpdate(
                { _id: notificationId, recipient: req.user._id },
                { read: true },
                { new: true }
            )

            res.json(notification);
        } else if (req.club && req.club._id) {
            const notification = await Notification.findByIdAndUpdate(
                { _id: notificationId, recipient: req.club._id },
                { read: true },
                { new: true }
            )

            res.json(notification);
        }
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;

    try {
        if (req.user && req.user._id) {
            await Notification.findByIdAndDelete({ _id: notificationId, recipient: req.user._id });
            res.status(204).send();
        } else if (req.club && req.club._id) {
            await Notification.findByIdAndDelete({ _id: notificationId, recipient: req.club._id });
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

router.get("/", protectRoute, getUserNotifications);
router.put("/:id/read", protectRoute, markNotificationAsRead);
router.delete("/:id", protectRoute, deleteNotification);

module.exports = router;