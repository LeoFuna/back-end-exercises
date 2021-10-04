const express = require('express');

const app = express(); // criando uma aplicação express

app.listen(3001, () => { // pedindo ao express que fique "escutando" na porta 3001
  console.log('Estou ouvindo a porta 3001!')
})

app.get('/ping', (_req, res) => {
  res.status(200).send({ message: 'pong' })
});