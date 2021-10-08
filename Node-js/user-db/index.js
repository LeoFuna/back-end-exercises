const express = require('express');
const { create, getAll } = require('./services/userService');

const app = express();

app.use(express.json());

const PORT = 3000

app.listen(PORT, () => console.log(`Ouvindo a porta ${ PORT }`));

app.get('/users', async (_req, res) => {
  const response = await getAll();
  res.status(200).json(response);
})

app.post('/users', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const response = await create(firstName, lastName, email, password);
  if(response.message) return res.status(response.error).json(response.message);
  res.status(200).json(response);
});
