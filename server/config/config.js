//============================
//         PUERTO
//============================
process.env.PORT = process.env.PORT || 3000

//============================
//         PUERTO
//============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
}
else{
    urlDB = 'mongodb+srv://troyanito123:rJoKkCLu8LX353CD@cluster0-vwrys.mongodb.net/cafe';
}

process.env.URLDB = urlDB;