const { expect } = require("chai");
const fs = require('fs');
const { escreveConteudo } = require('../escreveConteudo.js');

describe('Função que escreve conteúdo quando', () => {
  describe('recebe os dois ou mais parâmetros', () => {
    describe('sendo os 2 primeiros strings', () => {
      const resultado = escreveConteudo('arquivoNovo.txt', 'Sou a mensagem!');
      it('retorna um ok', () => {
        expect(resultado).to.be.equal('ok');
      })
      it('cria um arquivo com o conteúdo proposto', () => {
        expect(file("arquivoNovo.txt")).to.exist
      })
    })
    describe('sendo o primeiro ou segundo deles diferente de string', () => {
      it('retorna null', () => {
        const resultado = escreveConteudo('arquivoNovo.txt', 300);
        expect(resultado).to.be.null;
      })
    })
  })
  describe('recebe 1 parâmetro', () => {
    describe('diferente de string', () => {
      it('retorna null', () => {
        const resultado = escreveConteudo(500);
        expect(resultado).to.be.null;
      })
    })
    describe('sendo uma string', () => {
      const resultado = escreveConteudo('arquivoNovo.txt')
      it('retorna um ok', () => {
        expect(resultado).to.be.equal('ok');
      })
      it('cria um arquivo com conteúdo vazio', () => {
        expect(file('arquivoNovo.txt')).to.exist
      })
    })
  })
  describe('recebe nenhum parâmetro', () => {
    it('retorna null', () => {
      const resultado = escreveConteudo();
      expect(resultado).to.be.null;
    })
  })
})