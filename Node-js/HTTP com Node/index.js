const express = require('express');

const app = express(); // criando uma aplicação express

const bodyParser = require('body-parser'); // framework usado para "remontar" o body em json
app.use(bodyParser.json());

app.listen(3001, () => { // pedindo ao express que fique "escutando" na porta 3001
  console.log('Estou ouvindo a porta 3001!')
})

app.get('/ping', (_req, res) => {
  res.status(200).json({ "message": 'pong' })
});

app.post('/hello', (req, res) => {
  const { name } = req.body;
  res.status(200).json({ "message": `Hello, ${ name }!` })
})