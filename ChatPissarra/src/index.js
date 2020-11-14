const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

// init
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// settings
app.set('port', process.env.PORT || 4000);


// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
