const connection = require('./connection');

const getByCep = async (cep) => {
  const [cepData] = await connection.execute(
    'SELECT * FROM ceps WHERE cep=?',
    [cep]
  );
  return cepData;
};

module.exports = {
  getByCep,
}