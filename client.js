const socket = io("http://localhost:3000");

socket.on("broadcast", data => {
  console.log("📩 From broadcast server:", data);
});

socket.on("connect", () => {
  console.log("✅ Connected to server");
  socket.emit("clientMessage", "hello server");
  socket.on("serverMessage", (data) => {
    console.log("📩 From server:", data);
  });
});

const socketStudent = io("http://localhost:3000/student");
socketStudent.on("connect", () => {
  console.log("✅ Connected to server student");
  socketStudent.on("messageSocketStudent", (data) => {
    console.log("📩 From student server:", data);
  });
  socketStudent.emit("clientMessage", "hello socketStudent server");
});

const socketTeacher = io("http://localhost:3000/teacher");
socketTeacher.on("connect", () => {
  console.log("✅ Connected to server teacher");
  socketTeacher.on("messageSocketTeacher", (data) => {
    console.log("📩 From teacher server:", data);
  });
  socketTeacher.emit("clientMessage", "hello socketTeacher server");
});