const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(express.static("build"));

app.get('/get-profile', function (req, res) {
  res.json(User);
})

var User = [];
var dataMes = [];

io.on('connection', (socket) => {
  socket.on('create-name', (data) => {
    if (User.filter((user) => { return user.name === data }).length === 0) {
      User.push({ name: data, id: socket.id });
      socket.emit('successful-name-creation', User.find((user) => { return user.id === socket.id }));
      io.sockets.emit('user-online', User);
      console.log(dataMes);
    } else {
      socket.emit('namesake');
    }
  })

  socket.on('client-send-data', (data) => {
    dataMes.push({
      ...data,
      cookie: Math.random()
    })
    io.sockets.emit('server-send-data', data);
  })

  socket.on('login', (user) => {
    User.push(user);
    io.sockets.emit('user-online', User);
    io.sockets.emit('get-mess', dataMes);
  });

  socket.on('disconnect', () => {
    // User = User.filter((item) => { return item.id !== socket.id })
    io.sockets.emit('user-online', User);
  });
});

server.listen(port, () => {
  console.log('listening on *:5000');
});