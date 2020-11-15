function init() {
    //creem un objecte mouse on definim les principals movilitats del usuari
    let mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        posFinal: false,
        pos_prev: false,
        circle:false,
        square:false,
        mode:"pencil"
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
    


    // Socket IO
    let socket = io();
    // Set the canvas width and height to the browser size
    canvas.width = width *2/3;
    canvas.height = height *2/3;
    
      
    clearButton.addEventListener('click', (e)=>{
        console.log('clear')
        socket.emit('clearAll');
    })

    pencilButton.addEventListener('click', (e)=>{
        console.log('mode circle');
        mouse.mode="pencil";
    })

    squareButton.addEventListener('click', (e)=>{
        console.log('mode square');
       mouse.mode="square";
    })

    circleButton.addEventListener('click', (e)=>{
        console.log('mode circle');
        mouse.mode="circle";
    })


    socket.on('clearAll', data => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });


    //Quan l'usuari clica 
    canvas.addEventListener('mousedown', (e) => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.click = true;
        mouse.circle=true;
        console.log(mouse)

    });

    //Quan l'usuari deixa de clicar
    canvas.addEventListener('mouseup', (e) => {
        let posFinalx = e.clientX;// /width;
        let posFinaly = e.clientY; //height;
        mouse.posFinal = { x: posFinalx, y: posFinaly };
        console.log('mouseUP')
        console.log(mouse)
        mouse.click = false;
        mouse.circle=false;
        mouse.square=true;


    });
    //Quan l'usuari mou el mouse
    canvas.addEventListener('mousemove', e => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
        

    });

    //Tractem les dades i dibuixem
    socket.on('draw_line', data => {
        let line = data.line;
        context.beginPath();
        context.lineWidth = 2;
       context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height);
        context.stroke();
    });

    //Funció principal recursiva
  function mainLoop() {
      if(mouse.mode=="pencil"){
        if(mouse.click && mouse.move && mouse.pos_prev) {
            socket.emit('draw_line', { line: [mouse.pos, mouse.pos_prev] });
            mouse.move = false;
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
      }else if(mouse.mode=="circle"){
        if(mouse.circle){
            console.log("circle")
           // socket.emit('draw_circle', { line: [mouse.pos, mouse.pos_prev] });
            context.beginPath();
            context.arc(mouse.pos.x* width,mouse.pos.y*height,30,0, Math.PI*2, false);
            context.stroke();
        }
      }else if(mouse.mode=="square"){
        if(mouse.square){
            if(mouse.square){
                console.log("square")
                context.beginPath();
                let widthS=mouse.posFinal.x-mouse.pos.x;
                let heightS=mouse.posFinal.y-mouse.pos.y;
                console.log(widthS)
                console.log(heightS)
               // context.strokeRect(mouse.pos.x* width,mouse.pos.y*height,widthS, heightS);
                context.strokeRect(mouse.pos.x* width,mouse.pos.y*height,50, 50);
                context.stroke();
                mouse.square=false;
            }
        }
      }
      
        setTimeout(mainLoop, 25);
      }
    mainLoop();

   /* function circle(){
        //mouse.pos.x = e.clientX / width;
        
        if(mouse.circle){
            console.log("circle")
            context.beginPath();
            context.arc(mouse.pos.x* width,mouse.pos.y*height,30,0, Math.PI*2, false);
            context.stroke();
        }
        setTimeout(circle, 25);
    }
    circle();*/
   /* function square(){
        //mouse.pos.x = e.clientX / width;
        
        if(mouse.square){
            console.log("square")
            context.beginPath();
            let widthS=mouse.posFinal.x-mouse.pos.x;
            let heightS=mouse.posFinal.y-mouse.pos.y;
            console.log(widthS)
            console.log(heightS)
            context.strokeRect(mouse.pos.x* width,mouse.pos.y*height,widthS, heightS);
            context.stroke();
            mouse.square=false;
        }
        setTimeout(square, 25);
    }
    square();*/
} document.addEventListener('DOMContentLoaded', init);
