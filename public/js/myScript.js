$(function() {
  var socket = io('http://localhost:2909');

  var typing = false;
  var typingTimeout = undefined;

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

  $('#message').keypress(function(e) {
    if(e.which != 13) {
      if(typing == false) {
        typing = true;
        socket.emit('typing', true);
      } else {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(typingTimeoutFunction, 5000);
      }
    }
  });

  $('#chooseNickname').click(function() {
    let selectedNickname = $('#nickname').val();
    socket.nickname = selectedNickname;

    socket.emit('setNickname', selectedNickname);
  });

  socket.on('message', function(message) {
    displayMessage(message);
    $(`#${message.nickname}`).remove();
  });

  socket.on('typing', function(data) {
    if(data.isTyping) {
      if($(`#${data.nickname}`).length == 0) {
        $('#usersTyping').append(`<span id="${data.nickname}" class="left new badge"data-badge-caption="">${data.nickname} is typing...</span>`);
        typingTimeout = setTimeout(typingTimeoutFunction, 5000);
      }
    } else {
      $(`#${data.nickname}`).remove();
    }
  });

  socket.on('onlineUsers', function(users) {
    displayOnlineUsers(users);
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

  function displayOnlineUsers(users) {
    let usersList = $('#onlineUsers');
    usersList.empty();
    usersList.append(`<li class="collection-item"><b>Users Online:</b> <span class="badge">${users.count}</span></li>`);
    $.each(users.users, function(i, user) {
      usersList.append(`<li class="collection-item">${user.nickname}</li>`)
    });
  }

  function typingTimeoutFunction() {
    typing = false;
    socket.emit('typing', false);
  }
});
