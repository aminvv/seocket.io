const socket = io("http://localhost:3000");

socket.on("connect", () => {
    console.log("✅ Connected to server");

    socket.emit("clientMessage", "hello server");

    socket.on("serverMessage", (data) => {
        console.log("📩 From server:", data);
    });
});
