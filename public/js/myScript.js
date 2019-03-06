$(function() {
  var socket = io('http://localhost:2909');
  
  var messageList = $('#messageList');

  let nicknameModal = M.Modal.getInstance($('#nicknameModal').modal());
  nicknameModal.open();

  $('#messageForm').submit(function(e) {
    e.preventDefault();
    let message = $('#message').val();

    socket.emit('message', message);
    displayMessage({ event: 'message', nickname: socket.nickname, text: message })

    $('#message').val('');
    return false;
  });

  $('#chooseNickname').click(function() {
    let selectedNickname = $('#nickname').val();
    socket.emit('setNickname', selectedNickname);
    socket.nickname = selectedNickname;
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
    let messageElement = $(`<li class="collection-item">${message.nickname}: ${message.text}</li>`);;

    if(message.event === 'connection' || message.event === 'disconnection') {
      messageElement = $(`<li class="collection-item">${message.text}</li>`);
      messageElement.css('background-color', '#c4c4c4');
    }

    messageList.append(messageElement);
  }
});
