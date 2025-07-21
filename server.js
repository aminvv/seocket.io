const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("./"));

const server = http.createServer(app);
const socketIO = require("socket.io");

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});


io.use((socket,next)=>{
  const token ="any token "
  if(!token){
    const error=new Error("authorize")                          //middleware
    error.data={content:"any error"}
    next(error)
  }
})






io.on("connection", (socket) => {
  console.log("✅ New client connected");

  socket.on("clientMessageVolatile", (data) => {
    // console.log("📥 Received (volatile):", data);
  });

  socket.join("nodejs")
  socket.join(["java","php"])
  socket.leave("php")
  console.log(socket.rooms);


  io.to("nodejs").emit(" send  message just  nodejs  room")



  socket.compress(false).emit()   //  خود سوکت کامپرس میکنه مسیج هارو  اگه نخواستین 

  socket.broadcast.emit("event", "message")  // به همه جز خودش

  socket.on("disconnect",data=>{})           // زمانی که اتصال کامل قطع شده==دلیل
  socket.on("disconnecting",reason=>{})                                                    // زمانی که در حال قطع شدنه==دلیل



});

server.listen(3000, () => console.log("🚀 Server running on port 3000"));
