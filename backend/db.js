const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dashboard_app'
});

connection.connect((err) => {
    if (err) {
        console.error('Veritabanı bağlantısı hatası: ' + err.stack);
        return;
    }
    console.log('Veritabanına bağlandı');
});

module.exports = connection;
