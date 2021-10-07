const connection = require('./connection');

const getAll = async () => {
  const [books] = await connection.execute(
    'SELECT * FROM books;'
  );
  return books;
}

module.exports = {
  getAll
};