const { create, getAll, deleteAll, getById } = require('../services/userService');

const getAllUsers = async (_req, res) => {
  const response = await getAll();
  res.status(200).json(response);
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  const response = await getById(id);
  if (response.message) return res.status(response.error).json(response.message);
  res.status(200).json(response);
}

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const response = await create(firstName, lastName, email, password);
  if(response.message) return res.status(response.error).json(response.message);
  res.status(200).json(response);
}

const deleteAllUsers = async (_req, res) => {
  const response = await deleteAll();
  res.status(200).json(response);
}

module.exports = {
  getAllUsers,
  createUser,
  deleteAllUsers,
  getUserById,
}