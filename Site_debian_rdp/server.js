const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'page')));

// Middleware para validar requisições apenas do localhost
const validateLocalhost = (req, res, next) => {
    const host = req.headers.host || '';
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1') || host.includes('[::1]');
    
    if (!isLocalhost) {
        return res.status(403).send('Acesso negado. Apenas localhost é permitido.');
    }
    
    next();
};

// Chama o validador de localhost, quando o conectar.sh e chamado
app.post('/conectar', validateLocalhost, (req, res) => {
    const scriptPath = path.join(__dirname, 'conectar.sh');

    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Erro ao executar o script');
        }

        if (stderr) {
            console.error(stderr);
        }

        res.send('Aplicação fechada');
    });
});


// Chama o validador de localhost, quando o desligar.sh e chamado
app.post('/desligar', validateLocalhost, (req, res) => {
    const scriptPath = path.join(__dirname, 'desligar.sh');

    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Erro ao executar o script');
        }

        if (stderr) {
            console.error(stderr);
        }

        res.send('Aplicação fechada');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
