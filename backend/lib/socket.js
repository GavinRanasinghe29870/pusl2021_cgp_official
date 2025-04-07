const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create express app instance
const app = express();
const server = http.createServer(app);

// Create socket.io server with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
});

// Used to store online Users
const userSocketMap = {};

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // ========== Real-time interactions ==========
  socket.on("join", (userId) => {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on("likePost", (postId) => {
    io.emit("postLiked", postId);
  });

  socket.on("commentPost", ({ postId, comment }) => {
    io.emit("postCommented", { postId, comment });
  });

  socket.on("repost", (postId) => {
    io.emit("postReposted", postId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
    for (const [userId, id] of Object.entries(userSocketMap)) {
      if (id === socket.id) {
        delete userSocketMap[userId];
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
