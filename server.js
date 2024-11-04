const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.json());

// Configurar o Express para servir arquivos estáticos de diferentes diretórios
app.use(express.static(path.join(__dirname, 'src/pages')));
app.use('/components', express.static(path.join(__dirname, 'src/components')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));
app.use('/styles', express.static(path.join(__dirname, 'src/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'src/scripts')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});