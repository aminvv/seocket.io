const socket = io("http://localhost:3000", {
  query: {
    field1: "value1",
    field2: "value2",
  },transports: ['polling'],
  transportOptions: { 
    polling: {
      extraHeaders: {
        Authorization: "Bearer <token>",
      },
    },
  },
});


socket.on("connect", () => {
  console.log("✅ Connected to server");
  socket.emit("clientMessage", "hello server");
  socket.on("serverMessage", (data) => {
    console.log("📩 From server:", data);
  });
});


