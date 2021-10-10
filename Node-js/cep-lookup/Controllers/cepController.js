const { getCep, create } = require("../Services/cepService");

const getCepById = async (req, res) => {
  const { cep } = req.params;
  const responseCep = await getCep(cep);
  if (responseCep.error) return res.status(responseCep.error.code).json(responseCep.error.message);
  res.status(200).json(responseCep);
}

const createCep = async (req, res) => {
  const { cep, logradouro, bairro, localidade, uf } = req.body;
  const createResponse = await create(cep, logradouro, bairro, localidade, uf);
  res.status(200).json(createResponse);
}

module.exports = {
  getCepById,
  createCep,
}