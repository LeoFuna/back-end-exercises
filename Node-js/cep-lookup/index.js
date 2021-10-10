const express = require('express');
const { getCepById } = require('./Controllers/cepController');

const app = express();

const PORT = 3001;

app.listen(PORT, () => console.log(`Estou ouvindo a porta ${ PORT }`));

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong!' })
})

app.get('/cep/:cep', getCepById);