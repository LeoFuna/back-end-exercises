const { cepIsNotValid } = require('../Schemas/cepSchema');

const getCep = async (cep) => {
  if (cepIsNotValid(cep)) return { "error": { "code": "invalidData", "message": "CEP inválido" } };
};

module.exports = {
  getCep,
}