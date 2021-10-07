const connection = require('./connection');

const getAll = async () => {
  const [books] = await connection.execute( // desestruturação para pegar somente o primeiro item do array, pois é o que de fato interessa da resposta
    'SELECT * FROM books;'
  );
  return books;
}

const getBookFromId = async (bookId) => {
  const [book] = await connection.execute(
    'SELECT * FROM books WHERE id=?;',
    [bookId]
  );
  if (book.length === 0) return null;
  return book;
};

const getByAuthorId = async (authorId) => {
  const [booksFromAuthor] = await connection.execute(
    'SELECT * FROM books WHERE author_id=?;',
    [authorId]
  );
  return booksFromAuthor;
};

module.exports = {
  getAll,
  getByAuthorId,
  getBookFromId,
};