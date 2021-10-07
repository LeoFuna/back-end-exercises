const express = require('express');

const Author = require('./models/authors');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Ouvindo a porta 3000')
});

app.get('/authors', async (req, res) => {
  const authors = await Author.getAll();
  res.status(200).json(authors);
});