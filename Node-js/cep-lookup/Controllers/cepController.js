const { getCep } = require("../Services/cepService");

const getCepById = async (req, res) => {
  const { cep } = req.params;
  const responseCep = await getCep(cep);
}

module.exports = {
  getCepById,
}