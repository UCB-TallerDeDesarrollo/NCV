describe('Show fixed assets end to end tests', () => {
  it('Shows the list of fixed assets', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/fixedAssets',{
      fixture: 'fixedAssets/listOfAssets.json'
    }).as('listOfAssets',);

    cy.visit('/activos-fijos');

    cy.get('.activos-fijos')
    .should('have.length', 5)
  });
  it('Verifies the fields from a fixed asset form the list', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/fixedAssets',{
      fixture: 'fixedAssets/listOfAssets.json'
    }).as('listOfAssets',);

    cy.visit('/activos-fijos');

    cy.get('#lista-activos-fijos')
    .should('have.length', 1)
    .and('contain', 'Computadora2')
    .and('contain', 'Computadora de escritorio')
    .and('contain', "2022-10-16")
    .and('contain', 100.58);
  });
});
