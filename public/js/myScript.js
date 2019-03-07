$(function() {
  var socket = io('http://localhost:2909');

  var messageList = $('#messageList');

  let nicknameModal = M.Modal.getInstance($('#nicknameModal').modal());
  nicknameModal.open();

  $('#messageForm').submit(function(e) {
    e.preventDefault();
    let message = $('#message').val();

    if(message.length != 0) {
      socket.emit('message', message);
      displayMessage({ event: 'message', nickname: socket.nickname, text: message })

      $('#message').val('');
    }

    return false;
  });

  $('#message').bind('keypress', function(e) {
    socket.emit('typing');
  });

  $('#chooseNickname').click(function() {
    let selectedNickname = $('#nickname').val();
    socket.nickname = selectedNickname;

    socket.emit('setNickname', selectedNickname);
  });

  socket.on('message', function(message) {
    displayMessage(message);
    $('#usersTyping').html('');
  });

  socket.on('typing', function(user) {
    $('#usersTyping').html(`<i>${user.nickname} is typing...</i>`);
  });

  socket.on('userConnected', function(message) {
    displayMessage(message);
  });

  socket.on('userDisconnected', function(message) {
    displayMessage(message);
  });

  function displayMessage(message) {
    let messageElement = $(`<li class="collection-item"><b>${message.nickname}</b>: ${message.text}</li>`);

    if(message.event === 'connection' || message.event === 'disconnection') {
      messageElement.css('background-color', '#c4c4c4');
    }

    messageList.append(messageElement);
  }
});
