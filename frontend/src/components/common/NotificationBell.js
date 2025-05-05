import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Eye, Trash2, ThumbsUp, MessageCircleMore, MessageSquare, UserCheck, UserPlus, X, Check } from 'lucide-react';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { IoNotifications } from "react-icons/io5";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const notificationDropdownRef = useRef(null);

    const backendURL = 'http://localhost:5000';

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${backendURL}/api/notifications`);
            const notifications = response.data.map((notif) => ({
                ...notif,
                relatedRequestId: notif.relatedRequest?._id || notif.relatedRequest,
            }));
            const unreadCount = notifications.filter((notif) => !notif.read).length || 0;
            setNotifications(notifications);
            setUnreadNotificationCount(unreadCount);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await axios.put(`${backendURL}/api/notifications/${id}/read`);
            setNotifications((prev) =>
                prev.map((notif) => (notif._id === id ? { ...notif, read: true } : notif))
            );
            setUnreadNotificationCount((prev) => prev - 1);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            await axios.delete(`${backendURL}/api/notifications/${id}`);
            setNotifications((prev) => prev.filter((notif) => notif._id !== id));
            setUnreadNotificationCount((prev) => prev - 1);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const handleAcceptFriendRequest = async (requestId) => {
        try {
            const res = await axios.post(`${backendURL}/api/friendRequest/accept/${requestId}`, {}, { withCredentials: true });
            alert(res.data.message || "Friend request accepted!");
            fetchNotifications();
        } catch (error) {
            console.error("Error accepting friend request:", error);
            alert(error.response?.data?.message || "Error accepting friend request");
        }
    };

    const handleRejectFriendRequest = async (requestId) => {
        try {
            const res = await axios.post(`${backendURL}/api/friendRequest/reject/${requestId}`, {}, { withCredentials: true });
            alert(res.data.message || "Friend request rejected!");
            fetchNotifications();
        } catch (error) {
            console.error("Error rejecting friend request:", error);
            alert(error.response?.data?.message || "Error rejecting friend request");
        }
    };

    const renderNotificationIcon = (type) => {
        switch (type) {
            case "like":
                return <ThumbsUp size={20} className='text-rose-700' />;
            case "comment":
                return <MessageCircleMore size={20} className='text-green-500' />;
            case "message":
                return <MessageSquare size={20} className='text-primary' />;
            case "newFriendRequest":
                return <UserPlus size={20} className='text-primary' />;
            case "friendRequestAccepted":
                return <UserCheck size={20} className='text-primary' />;
            default:
                return null;
        }
    };

    const renderNotificationContent = (notification) => {
        switch (notification.type) {
            case "like":
                return (
                    <span className={`${!notification.read ? "text-gray-900" : "text-gray-400"}`}>
                        <Link to={`/profile/${notification.relatedUser._id}`} className='font-bold'>
                            {notification.relatedUser.firstName}
                        </Link>{" "}
                        liked your post
                    </span>
                );
            case "comment":
                return (
                    <span className={`${!notification.read ? "text-gray-900" : "text-gray-400"}`}>
                        <Link to={`/profile/${notification.relatedUser._id}`} className='font-bold'>
                            {notification.relatedUser.firstName}
                        </Link>{" "}
                        commented on your post
                    </span>
                );
            case "message":
                return (
                    <span className={`${!notification.read ? "text-gray-900" : "text-gray-400"}`}>
                        <Link to={`/profile/${notification.relatedUser._id}`} className='font-bold'>
                            {notification.relatedUser.firstName || notification.relatedUser.ClubName}
                        </Link>{" "}
                        sent you a message
                    </span>
                );
            case "newFriendRequest":
                return (
                    <span className={`${!notification.read ? "text-gray-900" : "text-gray-400"}`}>
                        <Link to={`/profile/${notification.relatedUser._id}`} className='font-bold'>
                            {notification.relatedUser.firstName}
                        </Link>{" "}
                        sent you a friend request
                    </span>
                );
            case "friendRequestAccepted":
                return (
                    <span className={`${!notification.read ? "text-gray-900" : "text-gray-400"}`}>
                        <Link to={`/profile/${notification.relatedUser._id}`} className='font-bold'>
                            {notification.relatedUser.firstName}
                        </Link>{" "}
                        accepted your friend request
                    </span>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(event.target)
            ) {
                setNotificationDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative'>
            <button
                className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            >
                <IoNotifications className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                {unreadNotificationCount > 0 && (
                    <span
                        className='absolute top-1 right-1 bg-red-600 text-white text-xs 
                        rounded-full size-3 md:size-4 flex items-center justify-center'
                    >
                        {unreadNotificationCount}
                    </span>
                )}
            </button>
            {notificationDropdownOpen && (
                <div
                    className='absolute right-0 mt-3 bg-white shadow-lg rounded-b-xl w-60 lg:w-96'
                    ref={notificationDropdownRef}
                >
                    <div className='flex flex-col items-start gap-3 px-4 py-3 text-sm text-gray-700 font-semibold'>
                        <h1 className='text-xl font-bold'>Notifications</h1>
                        {isLoading ? (
                            <p>Loading notifications...</p>
                        ) : (
                            notifications && notifications.length > 0 ? (
                                <ul>
                                    {notifications.map((notification) => (
                                        <li
                                            key={notification._id}
                                            className="rounded-lg p-2 transition-all hover:bg-gray-100"
                                        >
                                            <div className='flex items-center justify-between w-80'>
                                                <div className='relative flex items-center space-x-4'>
                                                    <Link to={`/profile/${notification.relatedUser._id}`}>
                                                        <img
                                                            src={notification.relatedUser.profilePicture || "/defaultProfilePic.jpg"}
                                                            className='w-12 h-12 rounded-full object-cover'
                                                        />
                                                    </Link>

                                                    <div className='flex flex-col justify-center'>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='absolute bottom-0 left-0 p-1 bg-gray-100 rounded-full'>
                                                                {renderNotificationIcon(notification.type)}
                                                            </div>
                                                            <p className='text-xs'>{renderNotificationContent(notification)}</p>
                                                        </div>
                                                        <p className={`text-xs mt-1 ${!notification.read ? "text-gray-900" : "text-gray-400"}`}>
                                                            {(() => {
                                                                const now = new Date();
                                                                const createdAt = new Date(notification.createdAt);
                                                                const days = differenceInDays(now, createdAt);
                                                                if (days > 0) return `${days}d ago`;
                                                                const hours = differenceInHours(now, createdAt);
                                                                if (hours > 0) return `${hours}h ago`;
                                                                const minutes = differenceInMinutes(now, createdAt);
                                                                return `${minutes}m ago`;
                                                            })()}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='flex gap-2'>
                                                    {notification.type === "newFriendRequest" && (
                                                        <>
                                                            <button
                                                                onClick={() => handleAcceptFriendRequest(notification.relatedRequestId)}
                                                                className='p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors'
                                                                aria-label='Accept friend request'
                                                            >
                                                                <Check size={24} className='text-green-600' />
                                                            </button>
                                                            <button
                                                                onClick={() => handleRejectFriendRequest(notification.relatedRequestId)}
                                                                className='p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
                                                                aria-label='Reject friend request'
                                                            >
                                                                <X size={24} className='text-red-600' />
                                                            </button>
                                                        </>
                                                    )}
                                                    {notification.type !== "newFriendRequest" && (
                                                        <>
                                                            {!notification.read && (
                                                                <button
                                                                    onClick={() => markAsRead(notification._id)}
                                                                    className='p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'
                                                                    aria-label='Mark as read'
                                                                >
                                                                    <Eye size={16} />
                                                                </button>
                                                            )}

                                                            <button
                                                                onClick={() => deleteNotification(notification._id)}
                                                                className='p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
                                                                aria-label='Delete notification'
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>You have no notifications...</p>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;