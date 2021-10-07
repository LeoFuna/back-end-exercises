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

app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;
  const authorFromId = await Author.findAuthorById(id);
  if (!authorFromId) return res.status(404).json({ message: "Id inválido" });
  res.status(200).json(authorFromId);
});

app.get('/books', async (req, res) => {
  const { authorId } = req.query;
  if ( !authorId ) {
    const books = await Book.getAll();
    return res.status(200).json(books);
  } 
  const booksFromAuthor = await Book.getByAuthorId(authorId);
  res.status(200).json(booksFromAuthor);
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const bookFromId = await Book.getBookFromId(id);
  if (!bookFromId) return res.status(404).json({ message: "Id inválido" });
  res.status(200).json(bookFromId);
});