// Realize o download deste arquivo e salve-o como simpsons.json . Utilize o arquivo baixado para realizar os requisitos abaixo.
// Você pode utilizar then e catch , async/await ou uma mistura dos dois para escrever seu código. Procure não utilizar callbacks.
// 1 Crie uma função que leia todos os dados do arquivo e imprima cada personagem no formato id - Nome . Por exemplo: 1 - Homer Simpson .
const fs = require('fs').promises;

function imprimePersonagens() {
  fs.readFile(__dirname + '/simpsons.json', 'utf-8') // __dirname para reconhecer o caminho do diretório, senao ele nao encontra
    .then((response) => JSON.parse(response))
    .then((result) => result.map((personagem) => console.log(`${ personagem.id } - ${ personagem.name }`)))
    .catch((error) => console.log(error.message))
}

// imprimePersonagens();

// 2 Crie uma função que receba o id de uma personagem como parâmetro e retorne uma Promise que é resolvida com os dados da personagem que possui o id informado. 
// Caso não haja uma personagem com o id informado, rejeite a Promise com o motivo "id não encontrado".

function detalhaPersonagem(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/simpsons.json', 'utf-8')
      .then((response) => JSON.parse(response))
        .then((result) => result.filter((personagem) => personagem.id == id))
          .then((filtered) => filtered.length === 1 ? resolve(filtered) : reject(new Error('id não encontrado')))
      .catch((error) => reject(error))
  });
}

// 3 Crie uma função que altere o arquivo simpsons.json retirando os personagens com id 10 e 6.
// 4 Crie uma função que leia o arquivo simpsons.json e crie um novo arquivo, chamado simpsonFamily.json , contendo as personagens com id de 1 a 4.
// 5 Crie uma função que adicione ao arquivo simpsonFamily.json o personagem Nelson Muntz .
// 6 Crie uma função que substitua o personagem Nelson Muntz pela personagem Maggie Simpson no arquivo simpsonFamily.json .