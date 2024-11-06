const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/cadastro-motoboy', (req, res) => {
    const { nome, sobrenome, CPF, MEI, dataNascimento, telefone, email, senha, aceitoTermos } = req.body;

    // Iniciar a transação
    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            return res.status(500).json({ message: 'Erro ao iniciar transação' });
        }

        // Inserir na tabela usuarios
        const sqlUsuarios = `
            INSERT INTO usuarios (email, senha, telefone, tipo_usuario, opt_in_tos)
            VALUES (?, ?, ?, 'Motoboy', ?)
        `;

        db.query(sqlUsuarios, [email, senha, telefone, aceitoTermos ? 1 : 0], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                // Em caso de erro, desfaz a transação
                return db.rollback(() => {
                    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
                });
            }

            const idUsuario = result.insertId; // ID do usuário recém-inserido

            // Inserir na tabela motoboys
            const sqlMotoboys = `
                INSERT INTO motoboys (id_motoboy, nome, sobrenome, cpf, mei, data_nascimento)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(sqlMotoboys, [idUsuario, nome, sobrenome, CPF, MEI, dataNascimento], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar motoboy:', err);
                    // Em caso de erro, desfaz a transação
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Erro ao cadastrar motoboy' });
                    });
                }

                // Se tudo deu certo, finaliza a transação
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

module.exports = router;
