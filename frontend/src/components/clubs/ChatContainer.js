import React from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, X, Paperclip, SendHorizonal } from "lucide-react";
import { useAuthStore } from '../../store/useAuthStore';
import { useClubAuthStore } from '../../store/useClubAuthStore';
import { formatMessageTime } from '../../lib/utils';
import EmojiPicker from './EmojiPicker';
import { format, isToday, isYesterday } from 'date-fns';

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    const { setSelectedUser, sendMessages } = useChatStore();
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { user } = useAuthStore();
    const { club } = useClubAuthStore();

    const messageEndRef = useRef(null);
    const { onlineUsers: authOnlineUsers } = useAuthStore();
    const { onlineUsers: clubOnlineUsers } = useClubAuthStore();
    const backendURL = 'http://localhost:5000';

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            return alert('Please select an image file');
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessages({
                text: text.trim(),
                image: imagePreview,
            });

            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const groupMessagesByDate = (messages) => {
        return messages.reduce((groups, message) => {
            const messageDate = new Date(message.createdAt);
            const dateKey = isToday(messageDate)
                ? "Today"
                : isYesterday(messageDate)
                    ? "Yesterday"
                    : format(messageDate, "M/d/yyyy");

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(message);
            return groups;
        }, {});
    };

    const groupedMessages = groupMessagesByDate(messages);

    const handleEmojiSelect = (emoji) => {
        setText((prevText) => prevText + emoji.native);
    };

    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages();
        return () => unsubscribeFromMessages();

    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className='flex flex-1 items-center justify-center'>
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                </div>
            </div>
        );
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>

            {/* Chat Header */}
            <div className="p-2.5 lg:p-3 border-b border-base-300 shadow-md bg-primary-light">
                <div className="flex items-center gap-5">
                    {/* Close button */}
                    <button onClick={() => setSelectedUser(null)}>
                        <ChevronLeft size={30} />
                    </button>
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="avatar">
                            <div className="size-10 rounded-full relative">
                                <img
                                    src={selectedUser.profilePhoto ? `${backendURL}${selectedUser.profilePhoto}` : '/defaultProfilePic.jpg'}
                                    className='rounded-full'
                                    alt={selectedUser.firstName || selectedUser.ClubName || "User profile"}
                                />
                            </div>
                        </div>

                        {/* User info */}
                        <div>
                            <h3 className="font-medium">{selectedUser.firstName || selectedUser.ClubName}</h3>
                            <p className="text-sm text-base-content/70">
                                {(authOnlineUsers && authOnlineUsers.includes(selectedUser._id)) ||
                                    (clubOnlineUsers && clubOnlineUsers.includes(selectedUser._id))
                                    ? "Online"
                                    : "Offline"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white h-screen">
                {Object.entries(groupedMessages).map(([date, messages]) => (
                    <div key={date}>
                        {/* Date Header */}
                        <div className="flex justify-center items-center my-10">
                            <div className="text-center text-xs bg-primary rounded-md py-1 px-3">
                                {date}
                            </div>
                        </div>

                        {/* Messages for this date */}
                        {messages.map((message) => {
                            const isSender = user ? message.senderId === user._id : message.senderId === club._id;
                            return (
                                <div
                                    key={message._id}
                                    className={`flex items-end py-1 md:px-3 ${isSender ? "justify-end" : "justify-start"}`}
                                    ref={messageEndRef}
                                >
                                    {/* Chat Bubble */}
                                    <div
                                        className={`max-w-2xl px-4 py-2 rounded-xl shadow-md ${isSender
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-gray-300 text-black rounded-tl-none"
                                            }`}
                                    >
                                        {/* Image (if any) */}
                                        {message.image && (
                                            <img
                                                src={message.image}
                                                alt="Attachment"
                                                className="max-w-[200px] rounded-md my-2"
                                            />
                                        )}

                                        <div className='flex justify-between items-center'>
                                            {/* Message Text */}
                                            {message.text && <p className="text-sm max-w-lg">{message.text}</p>}

                                            {/* Time */}
                                            <time className="mt-3 text-xs w-16 opacity-50 block text-right">
                                                {formatMessageTime(message.createdAt)}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className='p-4 w-full bg-primary-light rounded-lg'>
                {imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center"
                                type="button"
                            >
                                <X className="size-3" />
                            </button>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <div className="flex-1 flex gap-4">
                        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                        <button
                            type="button"
                            className={`flex btn-circle`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            className="w-full input outline-none input-bordered rounded-lg input-sm sm:input-md bg-primary-light"
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-sm btn-circle"
                        disabled={!text.trim() && !imagePreview}
                    >
                        <SendHorizonal size={25} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatContainer;