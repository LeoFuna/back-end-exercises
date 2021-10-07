const { MongoClient, ObjectId } = require('mongodb');

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

let db = null;

const connection = () => {
    return db
    ? Promise.resolve(db) // Verificar exatamente o que seria essa parte
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((connection) => connection.db('model_example'))
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('authors').find().toArray()) //Porque o toArray?
}

const findAuthorById = async (authorId) => {
  return connection()
    .then((db) => db.collection('authors').findOne({ _id: new ObjectId(authorId) }))
    .catch(() => null);
}

const create = async (firstName, middleName, lastName) => {
  return connection()
    .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }))
    .then((result) => { id: result.insertedId, result.firstName, result.middleName, result.lastName })
}

module.exports = {
  getAll,
  findAuthorById,
  create,
}