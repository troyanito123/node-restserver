// =====================
//    Verificar token
// =====================

const jwt = require('jsonwebtoken');

let verficaToken = (req, res, next) =>{
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

}

// =====================
//    Verificar token img
// =====================
let verficaTokenImg = (req, res, next) =>{
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
}
// =====================
//    Verifica AdminRole
// =====================
let verificaAdmin_Role = (req, res, next) =>{
    
    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
}


module.exports = {
    verficaToken,
    verificaAdmin_Role,
    verficaTokenImg
}