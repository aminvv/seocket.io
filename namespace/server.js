const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("./"));

const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);
  socket.on("clientMessage", data => {
    console.log("📩 From client:", data);
  });
  socket.emit("serverMessage", "hello client");
  io.emit("broadcast", "hello everyone");
});

io.of("/student").on("connection", (socket) => {
  console.log("🟢 New client connected student:", socket.id);
  socket.on("clientMessage", data => {
    console.log("📩 From client student:", data);
  });
  socket.emit("messageSocketStudent", "hello client student");
});

io.of("/teacher").on("connection", (socket) => {
  console.log("🟢 New client connected teacher:", socket.id);
  socket.on("clientMessage", data => {
    console.log("📩 From client teacher:", data);
  });
  socket.emit("messageSocketTeacher", "hello teacher");
});

server.listen(3000, () => console.log("🚀 Server running on port 3000"));