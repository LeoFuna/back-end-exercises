const connection = require('./connection');

const getAll = async () => {
  const users = await connection().then((db) => db.collection('users').find().toArray());
  return users;
}

const create = async (firstName, lastName, email, password) => {
  const response = await connection().then((db) => db.collection('users').insertOne({ firstName, lastName, email, password }));
  return { id: response.insertedId, firstName, lastName, email, password };
}

module.exports = {
  getAll,
  create,
}