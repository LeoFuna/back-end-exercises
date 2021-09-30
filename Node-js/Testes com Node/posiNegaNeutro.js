
function posiNegaNeutro(num) {
  switch (true) {
    case num > 0 && typeof num === 'number':
      return "positivo";
      break;
    case num < 0 && typeof num === 'number':
      return "negativo";
      break;
    case num === 0:
      return "neutro";
      break;
    default:
      return null;
  }
}

module.exports = {
  posiNegaNeutro
}