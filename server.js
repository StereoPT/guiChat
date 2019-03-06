const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

console.log("[guiChat]");

io.on('connection', function(socket) {
  broadcastConnection(socket);

  socket.on('message', function(message) {
    socket.broadcast.emit('message', { event: 'message', nickname: socket.nickname, text: message });
  });

  socket.on('setNickname', function(nickname) {
    socket.nickname = nickname;
  });

  socket.on('disconnect', function() {
    broadcastDisconnection(socket);
  });
});

function broadcastConnection(socket) {
  console.log("A User Connected!");
  socket.broadcast.emit('userConnected', { event: 'connection', text: 'A User Connected!' });
}

function broadcastDisconnection(socket) {
  console.log("A User Disconnected.");
  socket.broadcast.emit('userDisconnected', { event: 'disconnection', text: 'A User Disconnected!' });
};

app.get('/', function(req, res) {
  res.send('<h1>guiChat</h1>');
});

http.listen(2909, function() {
  console.log("[guiChat] Listening on Port: 2909");
});
