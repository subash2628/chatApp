const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const { Server } = require("socket.io");
const io = new Server(server);
const {instrument} = require("@socket.io/admin-ui");
const cors = require('cors');


app.use(express.static('public'))

app.use(cors({
    origin: ["https://admin.socket.io"]
}));

// app.get('/', (req, res) => {
    
//     res.sendFile(__dirname + '/public/index.html');
//   });

// const io = require("socket.io")(3000,{
//     cors:{
//         origin:["http://localhost:8080"],
//     },
// })


io.on("connection", socket => {
    //console.log(socket.id)
    socket.on("send-message", (message,room)=>{
        if(room === ""){
            socket.broadcast.emit("receive-message",message)
        }else{
            socket.to(room).emit("receive-message",message)
        }
    })

    socket.on("join-room",(room,cb)=>{
        socket.join(room)
        cb(`Joined ${room}`)
    })
})

instrument(io, {auth:false})

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

