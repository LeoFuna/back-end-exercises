const express = require('express');

const Author = require('./models/authors');
const Book = require('./models/book');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Ouvindo a porta 3000')
});

app.get('/authors', async (_req, res) => {
  const authors = await Author.getAll();
  res.status(200).json(authors);
});

app.get('/books', async (_req, res) => {
  const books = await Book.getAll();
  res.status(200).json(books);
});