const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("./")); // فایل‌های استاتیک از پوشه جاری

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
});

server.listen(3000, () => console.log("🚀 Server running on port 3000"));
