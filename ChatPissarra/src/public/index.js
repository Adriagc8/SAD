function init() {
    let mouse = {
      click: false,
      move: false,
      pos: { x: 0, y: 0},
      pos_prev: false
    };
  
    // Canvas
    let canvas = document.getElementById('drawing');
    let context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    
    // Set the canvas width and height to the browser size
    canvas.width = width;
    canvas.height = height;
  
    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;
        console.log(mouse);
      });
   
  }document.addEventListener('DOMContentLoaded', init);
  
  