const readline = require('readline-sync');
const scriptsFeitos = ['imc', 'sorteio', 'velocidade'];

function selecionaScript() {
  const scriptEscolhido = readline.keyInSelect(scriptsFeitos, "Qual script deseja rodar?");
  switch (scriptEscolhido) {
    case 0:
      require('./imc');
      break;
    case 1:
      require('./sorteio');
      break;
    case 2:
      require('./velocidade');
      break;
    default:
      console.log('Obrigado pela presença');
  }
}

selecionaScript();