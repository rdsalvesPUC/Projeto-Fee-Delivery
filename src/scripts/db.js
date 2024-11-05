const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '486250@Vancouver',
    database: 'fee_delivery'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como ID ' + connection.threadId);
});

module.exports = connection;
