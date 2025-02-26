const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://chat-app-53.vercel.app',
    methods:['GET','POST'],
  },
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin:'https://chat-app-53.vercel.app' }));

io.on('connection',(socket)=>{
    socket.on('newMessage',(message)=>{
      console.log(message);
        io.emit("newMessage", message);
    })
})

server.listen(4000,()=>{
    console.log('listening');
})

module.exports = io;
