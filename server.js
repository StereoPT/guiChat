const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

console.log("[guiChat]");

io.on('connection', function(socket) {
  console.log("A User Connected!");

  socket.on('message', function(message) {
    io.emit('message', message);
  });

  socket.on('disconnect', function() {
    console.log("User Disconnected.");
  });
});

app.get('/', function(req, res) {
  res.send('<h1>Hello World</h1>');
});

http.listen(2909, function() {
  console.log("[guiChat] Listening on Port: 2909");
});
