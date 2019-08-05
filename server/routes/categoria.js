const express = require('express');
let { verficaToken, verificaAdmin_Role }  = require('../middleware/autenticacion');
const _ = require('underscore');

let app = express();

let Categoria = require('../models/categoria');

//============================
//MOSTRAR TODAS LAS CATEGORIAS
//============================
app.get('/categoria', verficaToken, (req, res) =>{

    Categoria.find({}).sort('descripcion')
                        .populate('usuario', 'nombre email')
                        .exec( (err, categorias) => {
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categorias
        });
    });
});

//============================
//MOSTRAR UNA  LAS CATEGORIAS
//============================
app.get('/categoria/:id', verficaToken ,(req, res) =>{
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) =>{
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if( !categoriaDB ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//============================
//CREAR NUEVA CATEGORIA
//============================
app.post('/categoria', verficaToken ,(req, res) =>{
    //regresa la nueva categoria
    // req.usuario._id
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if( !categoriaDB ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});
//============================
//ACTUAILIZAR UNA CATEGORIAS
//============================
app.put('/categoria/:id', verficaToken ,(req, res) =>{
//actualizar la descripcion de la categoria
    let id = req.params.id;
    let body = req.body;


    Categoria.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, categoriaDB) => {
        
        if( err ){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//============================
//MOSTRAR TODAS LAS CATEGORIAS
//============================
app.delete('/categoria/:id', [verficaToken, verificaAdmin_Role], (req, res) =>{
    //solo un administrador puede borrar categorias
    //Categoria.findAndRemove
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) =>{
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if( !categoriaDB ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });
    });

});

module.exports = app;
