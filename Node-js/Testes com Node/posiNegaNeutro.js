
function posiNegaNeutro(num) {
  switch (true) {
    case num > 0:
      return "positivo";
      break;
    case num < 0:
      return "negativo";
      break;
    default:
      return "neutro";
  }
}

module.exports = {
  posiNegaNeutro
}