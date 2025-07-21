

function initializeChatBox() {
  const localstorageValue = localStorage.getItem("message")
  const message = (localstorageValue ? localstorageValue.split("#") : []).map(item => { return item })
  message.forEach(item => {
    const paragraphElement = document.createElement("p")
    paragraphElement.innerHTML = item
    const chatBox = document.querySelector(".chatBox")
    chatBox.appendChild(paragraphElement)

  })
}
initializeChatBox()
const socket = io("http://localhost:3000",);


socket.on("connect", (data) => {
  const sendBtn = document.getElementById("sendBtn")
  sendBtn.addEventListener("click", (e) => {
    const textbox = document.getElementById("text")
    const message = textbox.value
    if (!message) return alert("textbox  cannot be empty")
    socket.emit("clientMessage", message)
    textbox.value = ""


  })
});



socket.on("serverMessage", (message) => {
  const localstorageValue = localStorage.getItem("message") ? localStorage.getItem("message") + "#" + message : message
  localStorage.setItem("message", localstorageValue)
  const paragraphElement = document.createElement("p")
  paragraphElement.innerHTML = message
  const chatBox = document.querySelector(".chatBox")
  chatBox.appendChild(paragraphElement)

})



