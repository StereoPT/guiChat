const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

console.log("[guiChat]");

io.on('connection', function(socket) {
  broadcastConnection(socket);

  socket.on('message', function(message) {
    io.emit('message', { event: 'message', text: message });
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
  res.send('<h1>Hello World</h1>');
});

http.listen(2909, function() {
  console.log("[guiChat] Listening on Port: 2909");
});
