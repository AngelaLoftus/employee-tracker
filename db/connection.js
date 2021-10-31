const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '<3MonkeyIsland',
        database: 'company'
    },
    console.log('Connected to the company database')
);

module.exports = db;