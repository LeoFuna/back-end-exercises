const cepIsNotValid = (cep) => {
  if (/\d{5}-?\d{3}/.test(cep)) return false;
  return true;
}

module.exports = {
  cepIsNotValid,
}