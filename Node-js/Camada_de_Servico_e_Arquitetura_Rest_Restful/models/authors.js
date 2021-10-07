const connection = require('./connection');

// Cria uma string com o nome completo do autor

const getNewAuthor = (authorData) => {
const { id, firstName, middleName, lastName } = authorData;

const fullName = [firstName, middleName, lastName]
    .filter((name) => name)
    .join(' ');

return {
    id,
    firstName,
    middleName,
    lastName,
    name: fullName,
};
};

// Converte o nome dos campos de snake_case para camelCase

const serialize = (authorData) => ({
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name});

// Busca todos os autores do banco.

const getAll = async () => {
    const [authors] = await connection.execute(
        'SELECT id, first_name, middle_name, last_name FROM model_example.authors;',
    );
    return authors.map(serialize).map(getNewAuthor);
};

const findAuthorById = async (authorId) => {
  const [authorData] = await connection.execute(
    'SELECT id, first_name, middle_name, last_name FROM authors WHERE id=?;',
    [authorId]
  );

  if (authorData.length === 0) return null;
  
  const { id, firstName, middleName, lastName } = serialize(authorData[0]);
  return getNewAuthor({
    id,
    firstName,
    middleName,
    lastName,
  });
};

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  return true;
}

const create = async (firstName, middleName, lastName) => {
  await connection.execute(
    'INSERT INTO authors (first_name, middle_name, last_name) VALUES (?, ?, ?);',
    [firstName, middleName, lastName]
  )
};

module.exports = {
    getAll,
    findAuthorById,
    create,
    isValid,
};
