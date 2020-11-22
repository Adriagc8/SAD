function init() {
    //creem un objecte mouse on definim les principals movilitats del usuari
    // window.location.href="http://localhost:4000/whiteboard/chat";
    let mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        posFinal: false,
        posIni: false,
        pos_prev: false,
        square: 0,
        mode: "pencil"

    };

    // Canvas
    let canvas = document.getElementById('canvas');
    let clearButton = document.getElementById('clear-WB');
    let pencilButton = document.getElementById('pencil');
    let squareButton = document.getElementById('square');
    let circleButton = document.getElementById('circle');
    let context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    //Chat

    let messageButton = document.getElementById('message-form');
    let messageBox = document.getElementById('message');
    let chat = document.getElementById('chat');
    let nickButton = document.getElementById('nickForm');
    let nickName = document.getElementById('nickname')
    let nickError = document.getElementById('nickError')
    let users = document.getElementById('usernames')


    // Socket IO
    let socket = io();
    // Set the canvas width and height to the browser size
    canvas.width = width * 11.05 / 14;
    canvas.height = height / 2;


    nickButton.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('new user', nickName.value, data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
                $('#message').focus();
            } else {
                //   COMENTAR
                nickError.html(`
              <div class="alert alert-danger">
                That username already Exists.
              </div>`);
            }
        });
        nickname.value;


    })


    messageButton.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('send message', messageBox.value, data => {
            let error = document.createElement('p')
            error.className = "error";
            chat.appendChild(error);
            chat.appendChild(document.createTextNode(data));
            chat.appendChild(document.createElement('p'));
        });
        messageBox.value;
    });

    //Editem la variable del chat
    socket.on('new message', function (data) {
        console.log(data);
        chat.appendChild(document.createElement('b'));
        chat.appendChild(document.createTextNode(data.nick + ': '));
        chat.appendChild(document.createElement('b'));
        chat.appendChild(document.createTextNode(data.msg));
        chat.appendChild(document.createElement('br'));

    });

    socket.on('usernames', data => {
        //   COMENTAR
        console.log(data)
        let html = '';
        for (i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`;
        }
        users.html(html);
    });


    clearButton.addEventListener('click', (e) => {
        console.log('clear')
        socket.emit('clearAll');
    })

    pencilButton.addEventListener('click', (e) => {
        console.log('mode circle');
        mouse.mode = "pencil";
    })

    squareButton.addEventListener('click', (e) => {
        console.log('mode square');
        mouse.mode = "square";
    })

    circleButton.addEventListener('click', (e) => {
        console.log('mode circle');
        mouse.mode = "circle";
    })


    socket.on('clearAll', data => {
        // chat.clear();
        context.clearRect(0, 0, canvas.width, canvas.height);
    });


    //Quan l'usuari clica 
    canvas.addEventListener('mousedown', (e) => {
        
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.click = true;
        console.log(mouse)
        if (mode = "square" && mouse.square == 0) {
            mouse.posIni = {x:mouse.pos.x, y:mouse.pos.y}
            console.log(mouse.posIni);
            mouse.square = 1;
        }


    });

    //Quan l'usuari deixa de clicar
    canvas.addEventListener('mouseup', (e) => {
        let posFinalx = e.clientX / width;
        let posFinaly = e.clientY / height;

        if (mode = "square" && mouse.square == 1) {
            console.log(mouse.posIni);
            mouse.posFinal = { x: posFinalx, y: posFinaly };
            mouse.square = 2;
        }

        console.log('mouseUP')
        console.log(mouse)
        mouse.click = false;


    });
    //Quan l'usuari mou el mouse
    canvas.addEventListener('mousemove', e => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
    });

    socket.on('color', data => {
        let color = data.color;
        mouse.color = color;
    })

    //Tractem les dades i dibuixem
    socket.on('draw_line', data => {
        let line = data.line;
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = line[2];
        console.log(line)
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        context.stroke();
    });

    //Tractem les dades i dibuixem
    socket.on('draw_circle', data => {
        let circle = data.circle;
        console.log(circle);
        context.lineWidth = 2;
        context.strokeStyle = circle[1];
        context.beginPath();
        context.arc(circle[0].x * width, circle[0].y * height, 30, 0, Math.PI * 2, false);
        context.stroke();
    });

    //Tractem les dades i dibuixem
    socket.on('draw_square', data => {
        let square = data.square;
        context.lineWidth = 2;
        context.beginPath();
        context.strokeStyle = square[1];
        let widthS = square[1].x - square[0].x;
        let heightS = square[1].y - square[0].y;
        context.strokeRect(square[0].x * width, square[0].y * height,widthS*width, heightS*height);
        context.stroke();
    });

    //Funció principal recursiva
    function mainLoop() {
        if (mouse.mode == "pencil") {
            if (mouse.click && mouse.move && mouse.pos_prev) {
                socket.emit('draw_line', { line: [mouse.pos, mouse.pos_prev, mouse.color] });
                mouse.move = false;
            }
            mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        } else if (mouse.mode == "circle") {
            if (mouse.click) {
                console.log("circle")
                socket.emit('draw_circle', { circle: [mouse.pos, mouse.color] });

            }
        } else if (mouse.mode == "square") {
            if (mouse.square == 2) {
                console.log(mouse)
                socket.emit('draw_square', { square: [mouse.posIni, mouse.posFinal, mouse.color] });
                mouse.square = 0;

            }
        }

        setTimeout(mainLoop, 25);
    }
    mainLoop();

} document.addEventListener('DOMContentLoaded', init);
