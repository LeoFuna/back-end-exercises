const getAllUsers = (_req, res) => {
  return res.status(200).json({ message: 'Todos usuários foram impressos' })
};

module.exports = { getAllUsers }