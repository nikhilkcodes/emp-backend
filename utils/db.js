const mysql = require('mysql');
require('dotenv').config();
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT
});

con.connect(function (err) {
    if (err) {
        console.log("Connection error:", err);
    } else {
        console.log("db Connected");
    }
});

module.exports = con;
