const Users = require('../models/userModel');
const { notExist, lengthIsGreaterThan, isTypeNotOk, idIsNotValid, notHasSomethingToUpdate } = require('../schemas/usersSchemas');

const getAll = async () => {
  const allUsers = await Users.getAll();
  return allUsers;
}

const getById = async (id) => {
  if (idIsNotValid(id)) return { error: 404, message: 'O ID informado é inválido' };
  const userData = await Users.getById(id);
  return userData;
};

const create = async (firstName, lastName, email, password) => {
  const error = 404;
  if(notExist(firstName) || notExist(lastName) || notExist(email) || notExist(password)) return { error, message: 'Todos os campos são obrigatórios!' };
  if(!lengthIsGreaterThan(password, 5)) return { error, message: "A senha deve ter o mínimo de 6 caracteres!" };
  if(isTypeNotOk(password, 'number')) return { error, message: 'A senha deve ser somente de números!' };
  const response = await Users.create(firstName, lastName, email, password);
  return response;
};

const update = async (id, firstName, lastName, email, password) => {
  if (idIsNotValid(id)) return { error: 404, message: 'O ID informado é inválido' };
  if (notHasSomethingToUpdate(firstName, lastName, email, password)) return { error: 404, message: 'É necessário informar algo para ser atualizado.' };
  let updateParams = {};
  if(firstName) updateParams = {...updateParams, firstName};
  if(lastName) updateParams = {...updateParams, lastName};
  if(email) updateParams = {...updateParams, email};
  if(password) updateParams = {...updateParams, password};
  const updateResponse = await Users.update(id, updateParams);
  return updateResponse;
}

const deleteAll = async () => {
  const response = await Users.deleteAll();
  return response;
}

module.exports = {
  getAll,
  create,
  deleteAll,
  getById,
  update,
}