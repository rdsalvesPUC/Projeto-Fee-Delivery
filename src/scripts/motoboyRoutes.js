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
        SELECT motoboys.id_motoboy, motoboys.nome, motoboys.sobrenome, motoboys.cpf, motoboys.mei, motoboys.data_nascimento, usuarios.email, usuarios.telefone
        FROM motoboys
        JOIN usuarios ON motoboys.id_motoboy = usuarios.id_usuario
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar motoboys:', err);
            return res.status(500).json({ message: 'Erro ao buscar motoboys' });
        }
        res.status(200).json(results);
    });
});

router.put('/motoboys/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, cpf, mei, data_nascimento, telefone, email } = req.body;

    const sql = `
        UPDATE motoboys 
        JOIN usuarios ON motoboys.id_motoboy = usuarios.id_usuario
        SET motoboys.nome = ?, motoboys.sobrenome = ?, motoboys.cpf = ?, motoboys.mei = ?, 
            motoboys.data_nascimento = ?, usuarios.telefone = ?, usuarios.email = ?
        WHERE motoboys.id_motoboy = ?
    `;
    db.query(sql, [nome, sobrenome, cpf, mei, data_nascimento, telefone, email, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar motoboy:", err);
            res.status(500).json({ error: "Erro ao atualizar motoboy" });
        } else {
            res.status(200).json({ message: "Motoboy atualizado com sucesso" });
        }
    });
});


router.delete('/motoboys/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM motoboys WHERE id_motoboy = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao deletar motoboy:", err);
            res.status(500).json({ error: "Erro ao deletar motoboy" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: "Motoboy não encontrado" });
        } else {
            res.status(200).json({ message: "Motoboy deletado com sucesso" });
        }
    });
});


module.exports = router;