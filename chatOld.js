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
  socket.on('newMessageToServer', (msg) => {
    // console.log(msg);
    // io.emit("messageToClients", { text: msg.text })
    io.of('/').emit("messageToClients", { text: msg.text })
  })
  // The server can still communicate across namespaces
  // but on the clientInformation, the socket needs to be in THAL namespace
  // in order to get the events
  setTimeout(() => {
    io.of('/admin').emit('welcome', 'Welcome to the admin channel, from the main channel')
  }, 2000)
})

io.of('/admin').on("connection", (socket) => {
  console.log('Someone connected to the admin namespace')
  io.of('/admin').emit('welcome', 'Welcome to the admin channel')
})
