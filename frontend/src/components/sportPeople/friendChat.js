import React, { useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

const FriendChat = () => {
  const [messages, setMessages] = useState([
    { from: "me", text: "Hey! 👋" },
    { from: "friend", text: "Hey! How are you?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { from: "me", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100">
      {/* Sidebar */}
      <div className="md:w-64 w-full bg-white p-4 border-b md:border-b-0 md:border-r shadow-sm">
        <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
          <BsFillChatDotsFill /> Friends
        </h2>
        <ul className="space-y-3">
          <li className="p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 cursor-pointer shadow">
            Alice
          </li>
          <li className="p-3 rounded-xl bg-white hover:bg-indigo-50 cursor-pointer shadow">
            Bob
          </li>
          <li className="p-3 rounded-xl bg-white hover:bg-indigo-50 cursor-pointer shadow">
            Charlie
          </li>
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-white p-5 border-b shadow-sm">
          <h3 className="text-xl font-semibold text-indigo-700">Chat with Alice</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                  msg.from === "me"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full transition"
          >
            <AiOutlineSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendChat;
