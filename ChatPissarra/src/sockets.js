module.exports = io => {

    // keep track of all lines that client sends
    let line_history = [];
  
    io.on('connection', socket => {
        console.log('Nou usuari conectat')
    });
  
  };