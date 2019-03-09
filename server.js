const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('underscore')._;

console.log("[guiChat]");

var users = {};
var sockets = [];

io.on('connection', function(socket) {
  socket.on('message', function(message) {
    socket.broadcast.emit('message', { event: 'message', nickname: users[socket.id].nickname, text: message });
  });

  socket.on('setNickname', function(nickname) {
    let exists = false;

    _.find(users, function(key, value) {
      if(key.nickname.toLowerCase() === nickname.toLowerCase()) {
        return exists = true;
      }
    });
    if(exists) {
      console.log("That Nickname already Exists!");
    } else {
      users[socket.id] = { 'nickname': nickname };
      sockets.push(socket);
      broadcastConnection(socket, users[socket.id].nickname);
    }
  });

  socket.on('typing', function(data) {
    if(typeof users[socket.id] !== 'undefined') {
      socket.broadcast.emit('typing', { isTyping: data, nickname: users[socket.id].nickname });
    }
  });

  socket.on('disconnect', function() {
    if(typeof users[socket.id] !== 'undefined') {
      broadcastDisconnection(socket, users[socket.id].nickname);
    }
  });
});

function broadcastConnection(socket, user) {
  console.log("A User Connected!");
  socket.broadcast.emit('userConnected', { event: 'connection', nickname: user, text: 'Connected!' });
}

function broadcastDisconnection(socket, user) {
  console.log("A User Disconnected.");
  socket.broadcast.emit('userDisconnected', { event: 'disconnection', nickname: user, text: 'Disconnected!' });
};

app.get('/', function(req, res) {
  res.send('<h1>guiChat</h1>');
});

http.listen(2909, function() {
  console.log("[guiChat] Listening on Port: 2909");
});
