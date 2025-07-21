
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  let count = 0;
  setInterval(() => {
    socket.volatile.emit("clientMessageVolatile", ++count);
    console.log("🔵 Sent (volatile):", count);
  }, 1000);
});




