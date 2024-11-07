const express = require('express');
const router = express.Router();
const db = require('./db');

function isValidCPF(cpf) {
    return /^\d{11}$/.test(cpf); 
}

function isValidCNPJ(cnpj) {
    return /^\d{14}$/.test(cnpj); 
}

router.post('/login', (req, res) => {
    const { identificador, senha } = req.body;

    // Verifica o login de administrador especial
    if (identificador === 'admin' && senha === 'admin') {
        const sessionData = {
            userId: 'admin',
            email: 'admin@system.com',
            userType: 'admin',
        };
        return res.status(200).json({ message: 'Login de admin bem-sucedido', session: sessionData });
    }

    // Lógica de validação para CPF ou CNPJ
    let table, column;

    if (isValidCPF(identificador)) {
        table = 'motoboys';
        column = 'cpf';
    } else if (isValidCNPJ(identificador)) {
        table = 'empresas';
        column = 'cnpj';
    } else {
        return res.status(400).json({ message: 'CPF ou CNPJ inválido' });
    }

    const sql = `
        SELECT u.id_usuario, u.email, u.tipo_usuario
        FROM usuarios u
        INNER JOIN ${table} t ON u.id_usuario = t.id_${table === 'motoboys' ? 'motoboy' : 'empresa'}
        WHERE t.${column} = ? AND u.senha = ?
    `;

    db.query(sql, [identificador, senha], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ message: 'Erro ao processar login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'CPF/CNPJ ou senha inválidos' });
        }

        const sessionData = {
            userId: results[0].id_usuario,
            email: results[0].email,
            userType: results[0].tipo_usuario,
        };

        res.status(200).json({ message: 'Login bem-sucedido', session: sessionData });
    });
});

module.exports = router;