describe('Login', () => {
  it('muestra la pagina de LogIn', () => {
    cy.visit('/');
    cy.contains('Ingresa con tu cuenta');
  });
});
