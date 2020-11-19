module.exports = io => {

    // Conté tots els canvis realitzats anteriorment per a nous usuaris
    let line_history = [];
    let circle_history=[];
    let square_history=[];
    //Array de usuaris
    let nicknames = [];
    let colors=['blue','orange','red','green'];
    let ocupeColors=[];
    
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
        // let color=colors.pop();
        // console.log(color)
        // console.log(colors)
        // ocupeColors.push(color);
        // console.log(ocupeColors)
        // socket.emit('color',{color:color});
        socket.on('draw_line', data => {
            line_history.push(data.line);
            io.emit('draw_line', { line: data.line });
            //console.log(data.line)
        });

        socket.on('draw_circle', data => {
            circle_history.push(data.circle);
            io.emit('draw_circle', { circle: data.circle });
            
        });

        //Mirem que estigui creat l'ususari
        socket.on('new user', (data, cb) => {
            console.log(data)

            if (nicknames.indexOf(data) != -1) {
              cb(false);
            } else {
              cb(true);
              socket.nickname = data;
              nicknames.push(socket.nickname);
              io.sockets.emit('usernames', nicknames);           
            }
         });

        //Cada cop que rep un missatge el reenvia a tots els clients
        socket.on('send message', function(data){
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
        });

        socket.on('disconnect', data => {

            if(!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            io.sockets.emit('usernames', nicknames);
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