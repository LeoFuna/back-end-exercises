const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const users = await connection().then((db) => db.collection('users').find().toArray());
  return users;
}

const getById = async (id) => {
  const userData = await connection().then((db) => db.collection('users').findOne({ _id: new ObjectId(id) }));
  return userData;
}

const create = async (firstName, lastName, email, password) => {
  const response = await connection().then((db) => db.collection('users').insertOne({ firstName, lastName, email, password }));
  return { id: response.insertedId, firstName, lastName, email, password };
}

const deleteAll = async () => {
  const response = await connection().then((db) => db.collection('users').deleteMany());
  return response;
}

module.exports = {
  getAll,
  create,
  deleteAll,
  getById,
}