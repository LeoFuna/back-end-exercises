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

app.post('/greetins', (req, res) => {
  const { age, name } = req.body;
  if (age <= 17 ) return res.status(401).json({ "message": "Unauthorized" });
  res.status(200).json({ "message": `Hello, ${ name }` });
})

app.put('/users/:name/:age', (req, res) => {
  const { name, age } = req.params;
  res.status(200).json({ "message": `Hello ${ name }, você tem ${ age } anos` })
})

// ------

const simpsonsUtils = require('./fs-utils');

app.get('/simpsons', (_req, res) => {
  const { getSimpsons } = simpsonsUtils;
  const simpsons = getSimpsons();
  res.status(200).json(simpsons);
})

app.get('/simpsons/:id', async (req, res) => {
  const { id } = req.params;
  const { getSimpsons } = simpsonsUtils;
  const simpsons = await getSimpsons();
  const theSimpson = simpsons.filter((simpson) => simpson.id === id);
  if (theSimpson.length < 1) return res.status(404).json({ "message": "simpson not found" })
  res.status(200).json(theSimpson[0]);
})

app.post('/simpsons', async (req, res) => {
  const { id, name } = req.body;
  const { getSimpsons, writeSimpson } = simpsonsUtils;
  const simpsons = await getSimpsons();
  const theSimpson = simpsons.filter((simpson) => Number(simpson.id) === id)
  if (theSimpson.length > 0) return res.status(409).json({ "message": "id already exists" })
  await writeSimpson([...simpsons, { id, name }])
  res.status(204).end();
})