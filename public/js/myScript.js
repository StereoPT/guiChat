$(function() {
  var messageList = $('#messageList');

  var socket = io('http://localhost:2909');
  $('#messageForm').submit(function(e) {
    e.preventDefault();
    socket.emit('message', $('#message').val());
    $('#message').val('');
    return false;
  });

  socket.on('message', function(message) {
    displayMessage(message);
  });

  socket.on('userConnected', function(message) {
    displayMessage(message);
  });

  socket.on('userDisconnected', function(message) {
    displayMessage(message);
  });

  function displayMessage(message) {
    let messageElement = $(`<li class="collection-item">${message.text}</li>`);

    if(message.event === 'connection' || message.event === 'disconnection') {
      messageElement.css('background-color', '#c4c4c4');
    }

    messageList.append(messageElement);
  }
});
