const connection = require('./connection');

const getAll = async () => {
  const [books] = await connection.execute( // desestruturação para pegar somente o primeiro item do array, pois é o que de fato interessa da resposta
    'SELECT * FROM books;'
  );
  return books;
}

module.exports = {
  getAll
};