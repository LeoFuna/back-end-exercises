// 11 Crie um "jogo de adivinhação" em que a pessoa ganha se acertar qual foi o número aleatório gerado
const { questionInt, question } = require('readline-sync');


const sorteiaNumero = () => Math.floor(Math.random() * 10);
const verificaGanhador = (aposta, sorteado) => aposta === sorteado ? "VENCEDOR" : `Sorteado foi ${sorteado}, fica pra próxima...`;

function aGrandeAposta() {
  const numeroDoUsuario = questionInt("Qual a sua aposta? ");
  console.log(verificaGanhador(numeroDoUsuario, sorteiaNumero()));
  const jogarNovamente = question("Quer jogar novamente (s/n)? ");
  jogarNovamente === 's' ? aGrandeAposta() : '';
};

aGrandeAposta();
