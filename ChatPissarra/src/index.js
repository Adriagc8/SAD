const express = require('express');
const socketIO = require('socket.io');

// init
const app = express();


// settings
app.set('port', process.env.PORT || 3000);


// erver
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
