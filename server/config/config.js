//============================
//         PUERTO
//============================
process.env.PORT = process.env.PORT || 3000

//============================
//   VENCIMIENTO DEL TOKEN
//============================

process.env.CADUCIDAD_TOKEN = '48h';

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

//============================
//      GOOGLE CLIENT ID
//============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '1033060119546-mbib0og4d6behf5mr331bb8rf4pls1ue.apps.googleusercontent.com';
