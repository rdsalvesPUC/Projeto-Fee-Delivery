const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/cadastro-empresa', (req, res) => {
    const { nomeEmpresa, cnpj, inscricaoEstadual, email, telefone, senha, aceitoTermos } = req.body;

    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            return res.status(500).json({ message: 'Erro ao iniciar transação' });
        }

        const sqlUsuarios = `
            INSERT INTO usuarios (email, senha, telefone, tipo_usuario, opt_in_tos)
            VALUES (?, ?, ?, 'Empresa', ?)
        `;

        db.query(sqlUsuarios, [email, senha, telefone, aceitoTermos ? 1 : 0], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                return db.rollback(() => {
                    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
                });
            }

            const idUsuario = result.insertId; // ID do usuário recém-inserido

            const sqlEmpresas = `
                INSERT INTO empresas (id_empresa, nome_empresa, cnpj, inscricao_estadual)
                VALUES (?, ?, ?, ?)
            `;

            db.query(sqlEmpresas, [idUsuario, nomeEmpresa, cnpj, inscricaoEstadual], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar empresa:', err);
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Erro ao cadastrar empresa' });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        console.error('Erro ao confirmar transação:', err);
                        return db.rollback(() => {
                            res.status(500).json({ message: 'Erro ao confirmar transação' });
                        });
                    }

                    res.status(200).json({ message: 'Empresa cadastrada com sucesso' });
                });
            });
        });
    });
});

router.get('/empresas', (req, res) => {
    const sql = `
        SELECT e.nome_empresa, e.cnpj, e.inscricao_estadual, u.email, u.telefone
        FROM empresas e
        JOIN usuarios u ON e.id_empresa = u.id_usuario
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar empresas:', err);
            return res.status(500).json({ message: 'Erro ao buscar empresas' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;