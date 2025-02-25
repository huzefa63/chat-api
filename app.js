const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');
const env = require('dotenv');
env.config({path:'./.env'});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.URL,
    methods:['GET','POST'],
  },
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: process.env.URL }));

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