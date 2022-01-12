const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")

const socket = io("http://localhost:3000");
socket.on("connect",()=>{
    displayMessage(`You connected with id : ${socket.id}`)
    //console.log("connected");
})

socket.on("receive-message", message=>{
    displayMessage(message,false)
})


form.addEventListener("submit", e=>{
    e.preventDefault()
    const message = messageInput.value 
    const room = roomInput.value

    if(message==="")return
    displayMessage(message,true)
    socket.emit('send-message',message)

    messageInput.value = ""
})

joinRoomButton.addEventListener("click",()=>{
    const room = roomInput.value
})

function displayMessage(message,me){
    const div = document.createElement("div")
    div.textContent = !me? '--> '+message:message
    document.getElementById("message-container").append(div)
}