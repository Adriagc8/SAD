$(function () {

    // socket.io client side connection
    const socket = io.connect();

    // obtaining DOM elements from the Chat Interface
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val(), data => {
          $chat.append(`<p class="error">${data}</p>`)
        });
        $messageBox.val('');
      });
    
    socket.on('new message', function(data) {
        $chat.append(data + '<br/>')
    });
  
})