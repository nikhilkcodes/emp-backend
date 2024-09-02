import mysql from 'mysql'

const con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12728463",
    password: "nEYcalKx3u",
    database: "sql12728463",
    port: 3306
})

con.connect(function (err) {
    if (err) {
        console.log("Connection error:", err);
    } else {
        console.log("db Connected");
    }
})

export default con;
