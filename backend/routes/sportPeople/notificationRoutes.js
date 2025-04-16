const express = require('express');
const { protectRoute } = require('../../middleware/authMiddleware');
const Notification = require('../../models/sportPeople/Notification');
const router = express.Router();

const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 })
        .populate('relatedUser', 'firstName username profilePicture')
        .populate('relatedPost', 'content image')

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id;
    try {
        const notification = await Notification.findByIdAndUpdate(
            {_id: notificationId, recipient: req.user._id},
            { read: true },
            { new: true }
        )

        res.json(notification);

    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteNotification = async (req, res) => {
	const notificationId = req.params.id;

	try {
		await Notification.findOneAndDelete({
			_id: notificationId,
			recipient: req.user._id,
		});

		res.json({ message: "Notification deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

router.get("/", protectRoute, getUserNotifications);
router.put("/:id/read", protectRoute, markNotificationAsRead);
router.delete("/:id", protectRoute, deleteNotification);

module.exports = router;