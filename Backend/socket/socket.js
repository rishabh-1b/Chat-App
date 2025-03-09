const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
})

const users = {};

const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(users))

  socket.on("disconnect", () => {
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users))
  }
  )
})

module.exports = { app, server, io, getReceiverSocketId }