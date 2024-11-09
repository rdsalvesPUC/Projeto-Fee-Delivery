const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/cadastro-motoboy', (req, res) => {
    const { nome, sobrenome, CPF, MEI, dataNascimento, telefone, email, senha, aceitoTermos } = req.body;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            return res.status(500).json({ message: 'Erro ao iniciar transação' });
        }

        const sqlUsuarios = `
            INSERT INTO usuarios (email, senha, telefone, tipo_usuario, opt_in_tos)
            VALUES (?, ?, ?, 'Motoboy', ?)
        `;

        db.query(sqlUsuarios, [email, senha, telefone, aceitoTermos ? 1 : 0], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                return db.rollback(() => {
                    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
                });
            }

            const idUsuario = result.insertId;

            const sqlMotoboys = `
                INSERT INTO motoboys (id_motoboy, nome, sobrenome, cpf, mei, data_nascimento)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(sqlMotoboys, [idUsuario, nome, sobrenome, CPF, MEI, dataNascimento], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar motoboy:', err);
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Erro ao cadastrar motoboy' });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        console.error('Erro ao confirmar transação:', err);
                        return db.rollback(() => {
                            res.status(500).json({ message: 'Erro ao confirmar transação' });
                        });
                    }

                    res.status(200).json({ message: 'Motoboy cadastrado com sucesso' });
                });
            });
        });
    });
});

router.get('/motoboys', (req, res) => {
    const sql = `
        SELECT m.nome, m.sobrenome, m.cpf, m.mei, m.data_nascimento, u.email, u.telefone
        FROM motoboys m
        JOIN usuarios u ON m.id_motoboy = u.id_usuario
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar motoboys:', err);
            return res.status(500).json({ message: 'Erro ao buscar motoboys' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;
