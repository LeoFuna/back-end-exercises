const { expect } = require('chai');
const { posiNegaNeutro } = require('../posiNegaNeutro');

describe("Verifica o dado informado quando", () => {
  describe("ele é um número", () => {
    describe("ele é maior do que zero", () => {
      const resultado = posiNegaNeutro(4);
      it("deve ser positivo", () => {
        expect(resultado).to.be.equal("positivo");
      })
      it("deve ser uma string", () => {
        expect(resultado).to.be.a("string");
      })
    })
    describe("ele é igual a zero", () => {
      const resultado = posiNegaNeutro(0);
      it("deve ser neutro", () => {
        expect(resultado).to.be.equal("neutro");
      });
      it("deve ser uma string", () => {
        expect(resultado).to.be.a("string");
      })
    })
    describe("ele é menor do que zero", () => {
      const resultado = posiNegaNeutro(-3);
      it("deve ser negativo", () => {
        expect(resultado).to.be.equal("negativo");
      });
      it("deve ser uma string", () => {
        expect(resultado).to.be.a("string");
      })
    })
  })
  describe("ele não é um número", () => {
    it("deve retornar null", () => {
      const resultado = posiNegaNeutro("3");
      expect(resultado).to.be.null;
    })
  })
})