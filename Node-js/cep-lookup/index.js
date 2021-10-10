const express = require('express');
const { getCepById, createCep, getAllCeps } = require('./Controllers/cepController');

const app = express();

app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => console.log(`Estou ouvindo a porta ${ PORT }`));

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong!' })
})

app.get('/cep/:cep', getCepById);
app.get('/cep', getAllCeps);

app.post('/cep', createCep);