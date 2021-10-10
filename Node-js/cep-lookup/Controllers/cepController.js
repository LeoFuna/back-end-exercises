const { getCep } = require("../Services/cepService");

const getCepById = async (req, res) => {
  const { cep } = req.params;
  const responseCep = await getCep(cep);
  if (responseCep.error) return res.status(responseCep.error.code).json(responseCep.error.message);
  res.status(200).json(responseCep);
}

module.exports = {
  getCepById,
}