const Users = require('../models/userModel');

const getAll = async () => {
  const allUsers = await Users.getAll();
  return allUsers;
}

const notExist = (input) => {
  if (!input) return true;
  return false;
}

const lengthIsGreaterThan = (input, size) => {
  if (String(input).length > size) return true;
  return false;
}

const isTypeNotOk = (data, typeOk) => {
  if (typeof data !== typeOk) return true;
  return false;
}

const create = async (firstName, lastName, email, password) => {
  const error = 404;
  if(notExist(firstName) || notExist(lastName) || notExist(email) || notExist(password)) return { error, message: 'Todos os campos são obrigatórios!' };
  if(!lengthIsGreaterThan(password, 5)) return { error, message: "A senha deve ter o mínimo de 6 caracteres!" };
  if(isTypeNotOk(password, 'number')) return { error, message: 'A senha deve ser somente de números!' };
  const response = await Users.create(firstName, lastName, email, password);
  return response;
};

module.exports = {
  getAll,
  create,
}