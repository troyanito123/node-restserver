const express = require('express');
const  { verficaToken } = require('../middleware/autenticacion');

let app = express();
let Producto = require('../models/producto');

// ======================
// Obtener Productos
// ======================
app.get('/productos', verficaToken, (req, res) =>{
    //trae todos los productos
    //populate: usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    
    Producto.find({disponible: true})
                    
                    .skip(desde)
                    .limit(limite)
                    .populate('usuario', 'nombre email')
                    .populate('categoria', 'descripcion')
                    .exec( (err, productos) => {

        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productos
        });

    });

});

app.get('/producto/buscar/:termino', verficaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({nombre: regex})
            .populate('categoria', 'descripcion')
            .exec((err, productos) =>{
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    productos
                });
            });
});

// ======================
// Obtener  un producto por ID
// ======================
app.get('/producto/:id', verficaToken, (req, res) =>{
    let id = req.params.id;

    Producto.findById(id)
                    .populate('usuario', 'nombre, email')
                    .populate('categoria', 'descripcion')
                    .exec((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {message: 'ID no existe'}
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});

// ======================
// CREAR UN NUEVO PRODUCTO
// ======================
app.post('/producto', verficaToken, (req, res) =>{
    //trae todos los productos
    //populate: usuario categoria
    //paginado

    let body = req.body;

    let producto =  new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save( (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    })
});

app.put('/producto/:id', verficaToken, (req, res) => {

    let id = req.params.id;

    let body = req.body;
    
    productoAct = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: body.categoria
    }

    Producto.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, productoDB) => {
        
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if( !productoDB ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el ID'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});


app.delete('/producto/:id', verficaToken, (req, res) => {
    let id = req.params.id;
    productoAct = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, productoAct, (err, productoDB) => {
        if( err ){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if( !productoDB ){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el ID'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB,
            message: 'El producto a sido eliminado'
        });
    });
});
module.exports = app;