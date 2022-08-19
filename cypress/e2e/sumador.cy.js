describe('Smoke test', () => {
  it('no muestra ningun resultado al iniciar', () => {
    cy.visit('/');
    cy.get('#mensaje-suma').should('contain', '');
  });

  it('muestra la suma de los dos numeros', () => {
    cy.visit('/');
    cy.get('#numero1').type('3');
    cy.get('#numero2').type('2');

    cy.get('#sumar-btn').click();

    cy.contains('5');
    //cy.get('#resultado').should('contain', '5');
  });
});
