// app/config/pool-factory.js 

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit:100,
    host     : 'mysql',
    port     : 3306,
    user     : 'rateio',
    password : 'cloud',
    database : 'rateiocloud'
});

console.log('pool => criado');

pool.on('release', () => console.log('pool => conexão retornada'));

process.on('SIGINT', () => 
    pool.end(err => {
        if(err) return console.log(err);
        console.log('pool => fechado');
        process.exit(0);
    })
); 

module.exports = pool;