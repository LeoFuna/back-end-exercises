const { ObjectId } = require('mongodb');

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

const idIsNotValid = (id) => {
  if (!ObjectId.isValid(id)) return true;
  return false;
}

module.exports = {
  notExist,
  lengthIsGreaterThan,
  isTypeNotOk,
  idIsNotValid,
}