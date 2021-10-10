const Cep = require('../Model/cepModel');
const { cepIsNotValid } = require('../Schemas/cepSchema');

const getCep = async (cep) => {
  if (cepIsNotValid(cep)) return { "error": { "code": 400, "message": "CEP inválido" } };
  const cepResponse = await Cep.getByCep(cep);
  if (cepResponse.length === 0) return { "error": { "code": 404, "message": "CEP não encontrado" } };
  return cepResponse;
};

const create = async (cep, logradouro, bairro, localidade, uf) => {
  const createResponse = await Cep.create(cep, logradouro, bairro, localidade, uf);
  return createResponse;
};

module.exports = {
  getCep,
  create,
}