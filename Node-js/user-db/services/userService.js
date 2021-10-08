const Users = require('../models/userModel');

const getAll = async () => {
  const allUsers = await Users.getAll();
  return allUsers;
}

const create = async (firstName, lastName, email, password) => {
  const error = 404;
  if(!firstName || !lastName || !email || !password) return { error, message: 'Todos os campos são obrigatórios!' };
  if(password.length < 6) return { error, message: "A senha deve ter o mínimo de 6 caracteres!" };
  if(typeof password !== 'number') return { error, message: 'A senha deve ser somente de números!' };
  const response = await Users.create(firstName, lastName, email, password);
  return response;
};

module.exports = {
  getAll,
  create,
}