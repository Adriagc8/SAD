function init() {
    //creem un objecte mouse on definim les principals movilitats del usuari
    let mouse = {
        click: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: false
    };

    // Canvas
    let canvas = document.getElementById('drawing');
    let context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Socket IO
    let socket = io();
    // Set the canvas width and height to the browser size
    canvas.width = width;
    canvas.height = height;

    //Quan l'usuari clica 
    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;

    });

    //Quan l'usuari deixa de clicar
    canvas.addEventListener('mouseup', (e) => {
        mouse.click = false;

    });
    //Quan l'usuari mou el mouse
    canvas.addEventListener('mousemove', e => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;

    });


} document.addEventListener('DOMContentLoaded', init);
