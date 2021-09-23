// 1 Crie um script para calcular o Índice de Massa Corporal(IMC) de uma pessoa.
const readline = require('readline-sync');

const altura = readline.questionFloat("Qual a sua altura em metros? ");
const peso = readline.questionFloat("Qual o seu peso em kg? ");

// const altura = 1.80;
// const peso = 56;

const meuImc = (peso, altura) => peso / Math.pow(altura, 2);

console.log(`Seu IMC é: ${meuImc(peso, altura)}`);

// 2 Agora, permita que o script seja executado através do comando npm run imc
// Adicionei o comando no package.json dentro de script

// 3 Chegou a hora de tornar nosso script mais interativo! Vamos adicionar input de quem usa.

// 4 Vamos sofisticar um pouco mais nosso script. Além de imprimir o IMC na tela, imprima também em qual categoria da tabela se encaixa

const qualCategoria = (imc) => {
  switch (true) {
    case imc > 40:
      console.log('Obesidade Graus III e IV');
      break;
    case imc > 35:
      console.log('Obesidade Grau II');
      break;
    case imc > 30:
      console.log('Obesidade Grau I');
      break;
    case imc > 25:
      console.log('Sobrepeso');
      break;
    case imc > 18.5:
      console.log('Peso normal');
      break;
    default:
      console.log('Abaixo do peso');
  }
}

console.log(qualCategoria(meuImc(peso, altura)));

