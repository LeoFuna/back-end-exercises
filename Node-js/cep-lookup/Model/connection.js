const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'velox150',
    database: 'cep_lookup' });

module.exports = connection;