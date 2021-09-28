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

function retornaPersonagens(caminho) {
  return fs.readFile(__dirname + caminho, 'utf-8')
    .then((response) => JSON.parse(response))
      .then((result) => result)
    .catch((error) => console.log(error.message))
}

function retiraPersonagem(personagensId) {
  return retornaPersonagens('/simpsons.json')
    .then(result => result.filter(personagem => !personagensId.includes(parseInt(personagem.id, 10)))) // tirado do https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array
      .then(filtered => fs.writeFile(__dirname + '/simpsons.json', ['wx'], JSON.stringify(filtered)))
    .catch(error => console.log(error.message))
}

// retiraPersonagem([2,4])

// 4 Crie uma função que leia o arquivo simpsons.json e crie um novo arquivo, chamado simpsonFamily.json , contendo as personagens com id de 1 a 4.
function criaPersonagensAteOQuarto() {
  return retornaPersonagens('/simpsons.json')
    .then(result => [result[0], result[1], result[2], result[3]])
      .then(simpsonFamily => fs.writeFile(__dirname + '/simpsonFamily.json', JSON.stringify(simpsonFamily)))
    .catch(error => console.log(error.message))
}

// criaPersonagensAteOQuarto();

// 5 Crie uma função que adicione ao arquivo simpsonFamily.json o personagem Nelson Muntz.
function adicionaPersonagem() {
  return retornaPersonagens('/simpsonFamily.json')
    .then(result => [...result, { id: "5", name: 'Nelson Muntz' }])
      .then(familyNew => fs.writeFile(__dirname + '/simpsonFamily.json', JSON.stringify(familyNew)))
    .catch(error => console.log(error.message))
}

adicionaPersonagem();
