const express = require('express');

const fs = require('fs');
const path = require('path');
const { verficaTokenImg } = require('../middleware/autenticacion')

let app = express();

app.get('/imagen/:tipo/:img', verficaTokenImg, (req, res) =>{
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImgen = path.resolve( __dirname, `../../uploads/${tipo}/${img}`);

    if(fs.existsSync(pathImgen)){
        res.sendFile(pathImgen)
    }else{
        let noImagePath = path.resolve( __dirname,'../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }

});


module.exports = app;