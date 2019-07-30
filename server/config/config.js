//============================
//         PUERTO
//============================
process.env.PORT = process.env.PORT || 3000

//============================
//   VENCIMIENTO DEL TOKEN
//============================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//============================
//    SEED DE AUTENTICACION
//============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//============================
//         BASE DE DATOS
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
}
else{
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;
