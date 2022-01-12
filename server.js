const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

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
    socket.on("send-message", message=>{
        socket.broadcast.emit("receive-message",message)
    })
})

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

