//add mysql2
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        //MySQL username
        user: process.env.DB_USER,
        //MySQL Password
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
);

module.exports = db;