const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/cadastro-empresa', (req, res) => {
    const { nomeEmpresa, cnpj, inscricaoEstadual, email, telefone, senha, aceitoTermos } = req.body;

    // Iniciar a transação
    db.beginTransaction((err) => {
        if (err) {
            console.error('Erro ao iniciar transação:', err);
            return res.status(500).json({ message: 'Erro ao iniciar transação' });
        }

        // Inserir na tabela usuarios
        const sqlUsuarios = `
            INSERT INTO usuarios (email, senha, telefone, tipo_usuario, opt_in_tos)
            VALUES (?, ?, ?, 'Empresa', ?)
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

            // Inserir na tabela empresas
            const sqlEmpresas = `
                INSERT INTO empresas (id_empresa, nome_empresa, cnpj, inscricao_estadual)
                VALUES (?, ?, ?, ?)
            `;

            db.query(sqlEmpresas, [idUsuario, nomeEmpresa, cnpj, inscricaoEstadual], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar empresa:', err);
                    // Em caso de erro, desfaz a transação
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Erro ao cadastrar empresa' });
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

                    res.status(200).json({ message: 'Empresa cadastrada com sucesso' });
                });
            });
        });
    });
});

module.exports = router;