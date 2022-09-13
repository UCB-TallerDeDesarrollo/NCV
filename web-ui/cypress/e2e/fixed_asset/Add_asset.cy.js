describe('Add fixed asset end to end tests', () => {
  it('No muestra ningun resultado al iniciar en el espacio Name', () => {
    cy.visit('/');
    cy.get('#Name').should('contain', '');
  });
  it('No muestra ningun resultado al iniciar en el espacio Description', () => {
    cy.visit('/');
    cy.get('#Description').should('contain', '');
  });
  it('No muestra ningun resultado al iniciar en el espacio EntryDate', () => {
    cy.visit('/');
    cy.get('#EntryDate').should('contain', '');
  });
  it('No muestra ningun resultado al iniciar en el espacio Price', () => {
    cy.visit('/');
    cy.get('#Price').should('contain', '');
  });
  it('No muestra ningun resultado al iniciar en el espacio Features', () => {
    cy.visit('/');
    cy.get('#Features').should('contain', '');
  });
  it('No muestra ningun resultado al iniciar en el espacio Quantity', () => {
    cy.visit('/');
    cy.get('#Quantity').should('contain', '');
  });

  it('Crea un activo fijo', () => {
    cy.visit('/');
    cy.get('#Name').type('Teclado');
    cy.get('#Description').type('Es un teclado desde la prueba');
    cy.get('#EntryDate').type('2022-09-15');
    cy.get('#Price').type('500');
    cy.get('#Features').type('Marca Cypress');
    cy.get('#Quantity').type('10');


    cy.get('#submit_button').click();

    //cy.contains('5');
    cy.clock()
    cy.intercept('POST', 'https://ncv-api.herokuapp.com/api/fixedAssets').as('teclado');
    cy.wait('@teclado').its('response.statusCode').should('equal',201)
  });
});
