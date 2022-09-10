describe('Smoke test', () => {
  it('muestra la pagina principal', () => {
    cy.visit('/');
    cy.contains('Niños con Valor org');
  });
});
