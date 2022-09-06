import sumar from './sumador.js';
describe('sumador', () => {
  it('adds two numbers', () => {
    expect(sumar(4, 5)).toEqual(9);
  });
});
