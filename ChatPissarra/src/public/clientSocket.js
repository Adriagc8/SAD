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
        state: 0,
        mode: "pencil"

    };

    // Canvas
    let canvas = document.getElementById('canvas');
    let clearButton = document.getElementById('clear-WB');
    let pencilButton = document.getElementById('pencil');
    let squareButton = document.getElementById('square');
    let circleButton = document.getElementById('circle');
    let downloadButton = document.getElementById('download');
    let imgConverted = document.getElementById('imgConverted');
    
    let context = canvas.getContext('2d');
   
        var background = new Image();
        background.src="./backWB.png";
    context.drawImage(background,0,0);   
        
    
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

    //CHAT
    nickButton.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('new user', nickName.value, data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
                $('#message').focus();
            } else {
                //   COMENTAR
                let html = `
                <div class="alert alert-danger">
                  That username already Exists.
                </div>`;
                nickError.innerHTML = html;
            }
        });
        nickname.value;


    })


    messageButton.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('send message', messageBox.value, data => {
            let html = ` <p class="error">${data}</p>`;
            chat.innerHTML += html;
        });
        messageBox.value;
    });

    //Editem la variable del chat
    socket.on('new message', function (data) {
        console.log(data);
        let html = ` <b> ${data.nick}  : </b>  ${data.msg}  <br/>`;
        chat.innerHTML += html;
    });

    socket.on('usernames', data => {

        let html = '';
        for (i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`;
        }
        users.innerHTML = html;
    });
    // Set the canvas width and height to the browser size
    canvas.width = width * 0.5779;// 11.05 / 14;
    canvas.height = height / 2;
    translateX = width / 4.75;

    downloadButton.addEventListener('click',(e)=>{
    //     var background = new Image();
    //     background.src="/backWB.png";
    // context.drawImage(background,0,0, canvas.width, canvas.height);   
        
        const a =document.createElement("a");
        document.body.appendChild(a);
        a.href= canvas.toDataURL();
        a.download="Whiteboard.png";
        a.click();
        document.body.removeChild(a);
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
        if (mouse.mode != "pencil" && mouse.state == 0) {
            mouse.posIni = { x: mouse.pos.x, y: mouse.pos.y }
            mouse.state = 1;
        }


    });

    //Quan l'usuari deixa de clicar
    canvas.addEventListener('mouseup', (e) => {
        let posFinalx = e.clientX / width;
        let posFinaly = e.clientY / height;

        if (mouse.mode != "pencil" && mouse.state == 1) {
            console.log(mouse.posIni);
            mouse.posFinal = { x: posFinalx, y: posFinaly };
            mouse.state = 2;
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
        context.moveTo(line[0].x * width - translateX, line[0].y * height);
        context.lineTo(line[1].x * width - translateX, line[1].y * height);

        context.stroke();
    });

    //Tractem les dades i dibuixem
    socket.on('draw_circle', data => {
        let circle = data.circle;
        context.beginPath();
        context.lineWidth = 2;
        console.log(circle[2]);
        context.strokeStyle = circle[2];
        let widthS = circle[1].x - circle[0].x;
        let heightS = circle[1].y - circle[0].y;
        let a = Math.pow(widthS, 2);
        let b = Math.pow(heightS, 2);
        let h = Math.sqrt((a + b))
        console.log(widthS)
        console.log(h)
        context.arc(circle[0].x * width - translateX, circle[0].y * height, h * width / 2, 0, Math.PI * 2, false);
        context.stroke();
    });

    //Tractem les dades i dibuixem
    socket.on('draw_square', data => {
        let square = data.square;
        context.lineWidth = 2;
        context.beginPath();
        console.log(square[2]);
        context.strokeStyle = square[2];
        let widthS = square[1].x - square[0].x;
        let heightS = square[1].y - square[0].y;
        context.strokeRect(square[0].x * width - translateX, square[0].y * height, widthS * width, heightS * height);
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
            if (mouse.state == 2) {
                console.log("circle")
                socket.emit('draw_circle', { circle: [mouse.posIni, mouse.posFinal, mouse.color] });
                mouse.state = 0;

            }
        } else if (mouse.mode == "square") {
            if (mouse.state == 2) {
                console.log(mouse)
                socket.emit('draw_square', { square: [mouse.posIni, mouse.posFinal, mouse.color] });
                mouse.state = 0;

            }
        }

        setTimeout(mainLoop, 25);
    }
    mainLoop();

} document.addEventListener('DOMContentLoaded', init);
