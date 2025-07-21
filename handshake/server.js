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
  console.log("🟢  show query" );
  console.log(socket.handshake.query)
  console.log("🟢  show header" );
  console.log(socket.handshake.headers['authorization'])//چون کلابنت از طریق مرورگر اجرا مبشه این اجازرو مرورگر نمیده  بهتره از کويری استفاده کرده
  console.log("🟢 New client connected:", socket.id);
  socket.on("clientMessage", data => {
    console.log("📩 From client:", data);
  });
  socket.emit("serverMessage", "hello client");
  io.emit("broadcast", "hello everyone");
});




server.listen(3000, () => console.log("🚀 Server running on port 3000"));