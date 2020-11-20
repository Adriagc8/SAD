$(function () {

    // socket.io client side connection
    const socket = io.connect();

    //Agafem les constants del chat
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //Constants dels usuaris
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');
    const $users = $('#usernames');

    //creació de usuaris
    $nickForm.submit(e => {
      e.preventDefault();
      socket.emit('new user', $nickname.val(), data => {
        if(data) {
          $('#nickWrap').hide();
          $('#contentWrap').show();
          $('#message').focus();
        } else {
          $nickError.html(`
            <div class="alert alert-danger">
              That username already Exists.
            </div>`);
        }
      });
      $nickname.val('');
     
    });
    $messageForm.submit( e => {
      e.preventDefault();
      socket.emit('send message', $messageBox.val(), data => {
        $chat.append(`<p class="error">${data}</p>`)
      });
      $messageBox.val('');
    });
    socket.on('clearAll', data => {
        $chat.clear();
    });
    
    //Editem la variable del chat
    socket.on('new message', function(data) {
      $chat.append('<b>' +data.nick + ': </b>' + data.msg + '<br/>');
    });

    socket.on('usernames', data => {
      console.log(data)
      let html = '';
      for(i = 0; i < data.length; i++) {
        html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`; 
      }
      $users.html(html);
    });

})