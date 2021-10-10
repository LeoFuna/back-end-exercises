const { getByCep } = require('../Model/cepModel');
const { cepIsNotValid } = require('../Schemas/cepSchema');

const getCep = async (cep) => {
  if (cepIsNotValid(cep)) return { "error": { "code": 400, "message": "CEP inválido" } };
  const cepResponse = await getByCep(cep);
  return cepResponse;
};

module.exports = {
  getCep,
}