const mysql  = require('mysql2');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '17052011',
    database : 'automobile'
});

module.exports = pool;