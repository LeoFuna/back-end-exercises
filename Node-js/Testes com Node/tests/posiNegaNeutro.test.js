const { expect } = require('chai');

describe("Verifica o número informado quando", () => {
  describe("ele é maior do que zero", () => {
    it("deve ser positivo", () => {
      const resultado = posiNegaNeutro(4);
      expect(resultado).to.be.equal("positivo");
    })
  })
  describe("ele é igual a zero", () => {
    it("deve ser neutro", () => {
      const resultado = posiNegaNeutro(0);
      expect(resultado).to.be.equal("neutro");
    })
  })
  describe("ele é menor do que zero", () => {
    it("deve ser negativo", () => {
      const resultado = posiNegaNeutro(-3);
      expect(resultado).to.be.equal("negativo");
    })
  })
})