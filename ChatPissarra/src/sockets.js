module.exports = io => {

    // Conté tots els canvis realitzats anteriorment per a nous usuaris
    let line_history = [];
  
    io.on('connection', socket => {
        console.log('Nou usuari conectat');

        socket.on('draw_line', data => {
            line_history.push(data.line);
            io.emit('draw_line', data );
        });
    });
  
  };