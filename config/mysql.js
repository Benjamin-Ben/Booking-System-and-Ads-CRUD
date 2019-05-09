module.exports = (function () {
    const mysql = require('mysql');
    return () => mysql.createPool({
        'connectionLimit': 10,
        'host': process.env.DB_HOST,
        'port': process.env.DB_PORT,
        'user': process.env.DB_USER,
        'password': process.env.DB_PSWD,
        'database': process.env.DB_DTBS
    });
}());
