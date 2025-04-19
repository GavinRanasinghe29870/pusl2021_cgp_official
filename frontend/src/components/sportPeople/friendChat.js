import React, { useState } from "react";

const FriendChat = () => {
  const [messages, setMessages] = useState([
    { from: "me", text: "Hey! 👋" },
    { from: "friend", text: "Hey! How are you?" },
  ]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { from: "me", text: input }]);
      setInput("");
    }
  };

  return (
    <div
      className={`min-h-screen flex transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-64 p-4 border-r transition-all duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Friends</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition ${
              darkMode
                ? "bg-yellow-300 text-gray-900"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        <ul className="space-y-3">
          {["Alice", "Bob", "Charlie"].map((friend, index) => (
            <li
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg shadow-sm cursor-pointer transition hover:scale-105 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse shadow" />
              <span className="font-semibold">{friend}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div
          className={`p-5 border-b transition ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
          }`}
        >
          <h3 className="text-xl font-semibold">Chat with Alice</h3>
        </div>

        {/* Messages */}
        <div
          className={`flex-1 overflow-y-auto p-6 space-y-4 transition ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl shadow transition transform ${
                  msg.from === "me"
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-purple-500 text-white"
                    : "bg-pink-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div
          className={`p-4 border-t flex items-center gap-2 transition ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className={`flex-1 p-3 rounded-2xl text-sm outline-none shadow-sm ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 placeholder-gray-600"
            }`}
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 py-2 rounded-2xl font-semibold shadow-md hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendChat;
