const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/vagas/iniciar', (req, res) => {
    const { id_empresa, tipo_vaga } = req.body;

    const sql = `
		INSERT INTO vagas (id_empresa, tipo_vaga, status_publicacao, titulo, descricao, endereco)
		VALUES (?, ?, 'rascunho', '', '', '')
	`;

    db.query(sql, [id_empresa, tipo_vaga], (err, result) => {
        if (err) {
            console.error('Erro ao criar rascunho de vaga:', err);
            res.status(500).json({ message: 'Erro ao iniciar rascunho da vaga' });
        } else {
            res.status(201).json({ message: 'Rascunho iniciado com sucesso', id_vaga: result.insertId });
        }
    });
});

router.put('/vagas/:id_vaga/descricao', (req, res) => {
    const { id_vaga } = req.params;
    const { titulo, descricao, endereco, numero, data_inicio, data_fim, horario_inicio, horario_fim } = req.body;

    const sql = `
        UPDATE vagas
        SET titulo = ?, descricao = ?, endereco = ?, numero = ?, data_inicio = ?, data_fim = ?, horario_inicio = ?, horario_fim = ?
        WHERE id_vaga = ?
    `;

    db.query(sql, [titulo, descricao, endereco, numero, data_inicio, data_fim, horario_inicio, horario_fim, id_vaga], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o rascunho da vaga:', err);
            res.status(500).json({ message: 'Erro ao atualizar o rascunho da vaga' });
        } else {
            res.status(200).json({ message: 'Rascunho atualizado com sucesso' });
        }
    });
});

router.put('/vagas/:id_vaga/requisitos', (req, res) => {
    const { id_vaga } = req.params;
    const { requisito_ear, requisito_mei, forma_pagamento, valor } = req.body;

    const sql = `
        UPDATE vagas
        SET requisito_ear = ?, requisito_mei = ?, forma_pagamento = ?, valor = ?
        WHERE id_vaga = ?
    `;

    db.query(sql, [requisito_ear, requisito_mei, forma_pagamento, valor, id_vaga], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar os requisitos da vaga:', err);
            res.status(500).json({ message: 'Erro ao atualizar os requisitos da vaga' });
        } else {
            res.status(200).json({ message: 'Requisitos da vaga atualizados com sucesso' });
        }
    });
});


router.put('/vagas/:id', (req, res) => {
    const id_vaga = req.params.id;
    const { tipo_vaga, titulo, descricao, endereco, numero, data_inicio, data_fim, horario_inicio, horario_fim, requisito_ear, requisito_mei, forma_pagamento, valor, status_publicacao } = req.body;

    const sql = `
        UPDATE vagas
        SET tipo_vaga = ?, titulo = ?, descricao = ?, endereco = ?, numero = ?, data_inicio = ?, data_fim = ?, horario_inicio = ?, horario_fim = ?, requisito_ear = ?, requisito_mei = ?, forma_pagamento = ?, valor = ?, status_publicacao = ?
        WHERE id_vaga = ?
    `;

    db.query(sql, [tipo_vaga, titulo, descricao, endereco, numero, data_inicio, data_fim, horario_inicio, horario_fim, requisito_ear, requisito_mei, forma_pagamento, valor, status_publicacao, id_vaga], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar vaga:', err);
            res.status(500).json({ message: 'Erro ao atualizar vaga' });
        } else {
            res.status(200).json({ message: 'Vaga atualizada com sucesso' });
        }
    });
});

router.get('/vagas/:id', (req, res) => {
    const id_vaga = req.params.id;

    const sql = 'SELECT * FROM vagas WHERE id_vaga = ?';

    db.query(sql, [id_vaga], (err, result) => {
        if (err) {
            console.error('Erro ao buscar vaga:', err);
            res.status(500).json({ message: 'Erro ao buscar vaga' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Vaga não encontrada' });
        } else {
            res.status(200).json(result[0]);
        }
    });
});

router.delete('/vagas/:id', (req, res) => {
    const id_vaga = req.params.id;

    const sql = 'DELETE FROM vagas WHERE id_vaga = ?';

    db.query(sql, [id_vaga], (err, result) => {
        if (err) {
            console.error('Erro ao deletar vaga:', err);
            res.status(500).json({ message: 'Erro ao deletar vaga' });
        } else {
            res.status(200).json({ message: 'Vaga deletada com sucesso' });
        }
    });
});

module.exports = router;
