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
    let messageForm = $(`<li class="list-group-item"><div class="media-body"><p>${message.text}</p></div></li>`);

    if(message.event === 'connection' || message.event === 'disconnection') {
      messageForm.css('background-color', '#c4c4c4');
    }

    messageList.append(messageForm);
  }
});
