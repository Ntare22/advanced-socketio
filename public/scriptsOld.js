const socket = io("http://localhost:9001");
const socket2 = io("http://localhost:9001/admin"); // the /admin namespace

  socket.on('connect', () => {
    console.log(socket.id);
  })
  
  socket.on("messageFromServer", (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit("messageToServer", {data: "Data from the Client"})
  })

  socket2.on('connect', () => {
      console.log(socket2.id);
  })

  socket2.on('welcome', (msg) => {
    console.log(msg);
  })
  
  document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', {text: newMessage})
  })

  socket.on('messageToClients', (msg) => {
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
  })

  // socket.on('ping', () => {
  //   console.log('ping was recieved from the server')
  // })
  // socket.on('pong', (latency) => {
  //   console.log(latency);
  //   console.log('Pong was sent to the server')
  // })
