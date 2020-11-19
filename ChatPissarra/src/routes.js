const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res)=>{
    let p= path.join(__dirname, 'public/form.html')

   res.sendFile(p);

});

router.get('/whiteboard/chat', (req,res)=>{

    let p= path.join(__dirname, 'public/index.html')

   res.sendFile(p);

});

module.exports = router;