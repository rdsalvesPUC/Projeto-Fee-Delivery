const express = require('express');
const path = require('path');
const cors = require('cors');
const empresaRoutes = require('./src/scripts/empresaRoutes');
const motoboyRoutes = require('./src/scripts/motoboyRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', empresaRoutes);
app.use('/api', motoboyRoutes);

// Configurar o Express para servir arquivos estáticos
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
