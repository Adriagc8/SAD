module.exports = io => {

    // Conté tots els canvis realitzats anteriorment per a nous usuaris
    let line_history = [];
    let circle_history = [];
    let square_history = [];
    //Array de usuaris
    let nicknames = [];
    let colors = ['black', 'blue', 'orange', 'red', 'green', 'purple', 'yellow', 'lime', 'coral'];

    io.on('connection', socket => {
        let color = colors.shift();
        socket.color = color;
        socket.emit('color', { color: color });

        for (let i in line_history) {
            socket.emit('draw_line', { line: line_history[i] });
        }

        for (let i in circle_history) {
            socket.emit('draw_circle', { circle: circle_history[i] });
        }
        for (let i in square_history) {
            socket.emit('draw_square', { square: square_history[i] });
        }
       

        //Mirem que estigui creat l'ususari
        socket.on('new user', (data, cb) => {
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
        socket.on('send message', function (data) {
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
        });

        socket.on('disconnect', data => {
         
            if (!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            colors.push(socket.color);
            io.sockets.emit('usernames', nicknames);
        });

        socket.on('draw_line', data => {
            line_history.push(data.line);
            io.emit('draw_line', { line: data.line });
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

            line_history = [];
            circle_history = [];
            square_history = [];
            io.emit('clearAll');

        });
        


    });

};