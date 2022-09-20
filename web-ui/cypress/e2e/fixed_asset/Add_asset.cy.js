describe('Add fixed asset end to end tests', () => {
  it('Crea un activo fijo', () => {
    cy.visit('/crear-activo-fijo');
    cy.get('#Name').type('Teclado');
    cy.get('#Description').type('Es un teclado desde la prueba');
    cy.get('#EntryDate').type('2022-09-15');
    cy.get('#Price').type('500');
    cy.get('#Features').type('Marca Cypress');
    cy.get('#Quantity').type('10');

    cy.get('#submit_button').click();

    cy.clock();
    cy.intercept('POST', 'https://ncv-api.herokuapp.com/api/fixedAssets').as(
      'teclado',
    );
    cy.wait('@teclado').its('response.statusCode').should('equal', 201);
  });
});
