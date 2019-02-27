$(function() {
  var socket = io('http://localhost:2909');
  $('#messageForm').submit(function(e) {
    e.preventDefault();
    socket.emit('message', $('#message').val());
    $('#message').val('');
    return false;
  });

  socket.on('message', function(message) {
    let li = $('<li class="list-group-item"><div class="media-body"><p>');
    $('#messages').append(li.text(message));
  });
});
