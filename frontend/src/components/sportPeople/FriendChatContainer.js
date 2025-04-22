// src/components/sportPeople/FriendChatContainer.js

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, X, Paperclip, SendHorizonal } from "lucide-react";
import { useFriendChatStore } from "../../store/useFriendChatStore";
import { useAuthStore } from '../../store/useAuthStore';
import { formatMessageTime } from '../../lib/utils';

const FriendChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    isMessagesLoading,
    setSelectedUser,
  } = useFriendChatStore();

  const { user, onlineUsers } = useAuthStore();

  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const messageEndRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      return alert('Please select an image file');
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
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

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">

      {/* Header */}
      <div className="p-2.5 lg:p-5 border-b border-base-300 shadow-md bg-primary-light">
        <div className="flex items-center gap-5">
          <button onClick={() => setSelectedUser(null)}>
            <ChevronLeft size={30} />
          </button>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="size-10 rounded-full">
                <img
                  src={selectedUser.profilePic || "/defaultProfilePic.jpg"}
                  alt={selectedUser.username}
                  className="rounded-full"
                />
              </div>
            </div>
            <div>
              <h3 className="font-medium">{selectedUser.username}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white h-screen">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-end space-x-2 ${msg.senderId === user._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div
              className={`max-w-2xl px-4 py-2 rounded-xl shadow-md ${msg.senderId === user._id
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-gray-300 text-black rounded-tl-none"
              }`}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Attachment"
                  className="max-w-[200px] rounded-md my-2"
                />
              )}

              <div className='flex justify-between items-center'>
                {msg.text && <p className="text-sm max-w-lg">{msg.text}</p>}
                <time className="mt-3 text-xs w-16 opacity-50 block text-right">
                  {formatMessageTime(msg.createdAt)}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
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
          <div className="flex-1 flex gap-2">
            <button
              type="button"
              className="btn-circle"
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
  );
};

export default FriendChatContainer;
