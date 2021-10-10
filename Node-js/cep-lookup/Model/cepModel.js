const connection = require('./connection');

const getByCep = async (cep) => {
  const [cepData] = await connection.execute(
    'SELECT * FROM ceps WHERE cep=?;',
    [cep]
  );
  return cepData;
};

const getAll = async () => {
  const [ceps] = await connection.execute(
    'SELECT * FROM ceps;'
  );
  return ceps;
}

const create = async (cep, logradouro, bairro, localidade, uf) => {
  const createResponse = await connection.execute(
    'INSERT INTO ceps (cep, logradouro, bairro, localidade, uf) VALUES (?, ?, ?, ?, ?);',
    [cep, logradouro, bairro, localidade, uf]
  );
  return createResponse;
};

module.exports = {
  getByCep,
  create,
  getAll,
}