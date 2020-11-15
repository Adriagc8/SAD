module.exports = io => {

    // Conté tots els canvis realitzats anteriorment per a nous usuaris
    let line_history = [];
    let circle_history=[];
    let square_history=[];
  
    io.on('connection', socket => {

        for (let i in line_history) {
            socket.emit('draw_line', {line: line_history[i]});
        }

        for (let i in circle_history){
            socket.emit('draw_circle', {circle: circle_history[i]});
        }
        for (let i in square_history){
            socket.emit('draw_square', {square: square_history[i]});
        }
        socket.on('draw_line', data => {
            line_history.push(data.line);
            io.emit('draw_line', { line: data.line });
            //console.log(data.line)
        });

        socket.on('draw_circle', data => {
            circle_history.push(data.circle);
            io.emit('draw_circle', { circle: data.circle });
            
        });
        socket.on('draw_square', data => {
            square_history.push(data.square);
            io.emit('draw_square', { square: data.square });
            
        });
        socket.on('clearAll', data => {
          
            line_history=[];
            circle_history=[];
            square_history=[];
            io.emit('clearAll');
            //console.log(data.line)
        });


    });
  
  };