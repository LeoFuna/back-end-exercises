const { getCep, create, getAll } = require("../Services/cepService");

const getCepByCep = async (req, res) => {
  const { cep } = req.params;
  const responseCep = await getCep(cep);
  if (responseCep.error) return res.status(responseCep.error.code).json(responseCep.error.message);
  res.status(200).json(responseCep);
}

const getAllCeps = async (_req, res) => {
  const cepsData = await getAll();
  res.status(200).json(cepsData);
}

const createCep = async (req, res) => {
  const { cep, logradouro, bairro, localidade, uf } = req.body;
  const createResponse = await create(cep, logradouro, bairro, localidade, uf);
  res.status(200).json(createResponse);
}

module.exports = {
  getCepByCep,
  createCep,
  getAllCeps,
}