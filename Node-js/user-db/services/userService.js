const Users = require('../models/userModel');
const { notExist, lengthIsGreaterThan, isTypeNotOk } = require('../schemas/usersSchemas');

const getAll = async () => {
  const allUsers = await Users.getAll();
  return allUsers;
}

const create = async (firstName, lastName, email, password) => {
  const error = 404;
  if(notExist(firstName) || notExist(lastName) || notExist(email) || notExist(password)) return { error, message: 'Todos os campos são obrigatórios!' };
  if(!lengthIsGreaterThan(password, 5)) return { error, message: "A senha deve ter o mínimo de 6 caracteres!" };
  if(isTypeNotOk(password, 'number')) return { error, message: 'A senha deve ser somente de números!' };
  const response = await Users.create(firstName, lastName, email, password);
  return response;
};

const deleteAll = async () => {
  const response = await Users.deleteAll();
  return response;
}

module.exports = {
  getAll,
  create,
  deleteAll,
}