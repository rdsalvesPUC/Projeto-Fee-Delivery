const db = require('./src/scripts/db');

db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
        console.error('Erro na query de teste:', error.stack);
        return;
    }
    console.log('Resultado da query de teste:', results[0].solution); 
    db.end();
});
