const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9001);
const io = new socketio(expressServer, {
  path: '/socket.io',
  serveClient: true
});

io.on("connection", (socket) => {
  socket.emit("messageFromServer", {data: "welcome to the socketio server"});
  socket.on("messageToServer", (dataFromClient) => {
    console.log(dataFromClient);
  })
  socket.join('level1')
  io.of('/').to('level1').emit('joined', `${socket.id} says I have joined the level 1 room!`)
})

io.of('/admin').on("connection", (socket) => {
  console.log('Someone connected to the admin namespace')
  io.of('/admin').emit('welcome', 'Welcome to the admin channel')
})
