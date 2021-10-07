const express = require('express');

const Author = require('./models/authorsMongo');
const Book = require('./models/book');

const app = express();

const PORT = 3000;

app.use(express.json()); // substitui o body-parser, pois o mesmo está depreciado

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

app.post('/authors', async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
  if (!Author.isValid(first_name, middle_name, last_name)) return res.status(400).json({ message: 'Dados inválidos' });
  if (middle_name === undefined) {
    await Author.create(first_name, null, last_name)
  } else {
    await Author.create(first_name, middle_name, last_name);
  }
  res.status(201).json({ message: "Autor criado com sucesso!" });
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