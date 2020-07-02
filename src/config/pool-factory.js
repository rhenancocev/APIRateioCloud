// app/config/pool-factory.js 

const mysql = require('mysql');
//prd
const pool = mysql.createPool({
    connectionLimit:100,
    host     : 'mysql',
    port     : 3306,
    user     : 'rateio',
    password : 'cloud',
    database : 'rateiocloud',
    multipleStatements: true
});
/*/hml
const pool = mysql.createPool({
    connectionLimit:100,
    host     : '10.100.18.5',
    port     : 3308,
    user     : 'root',
    password : 'admin',
    database : 'rateiocloud',
    multipleStatements: true
});/*/

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