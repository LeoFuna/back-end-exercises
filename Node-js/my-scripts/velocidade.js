// 1 Vamos criar mais um script. Dessa vez, para calcular a velocidade média de um carro numa corrida
const { questionInt } = require('readline-sync');
const distancia = questionInt('Me diga a distância percorrida: ');
const tempo = questionInt('Me diga o tempo demorado: ');

const calculaVelocidadeMedia = (distancia, tempo) => distancia / tempo;
console.log(calculaVelocidadeMedia(distancia, tempo) + ' m/s');