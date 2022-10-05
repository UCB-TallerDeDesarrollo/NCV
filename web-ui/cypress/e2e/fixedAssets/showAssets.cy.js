describe('Show fixed assets end to end tests', () => {
  it('Shows the list of fixed assets', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/fixedAssets',{
      fixture: 'fixedAssets/listOfAssets.json'
    }).as('listOfAssets',);

    cy.visit('/activos-fijos');

    cy.get('.ListElement')
    .and('contain', 'Descripci')
    .should('have.length', 5)
  });
  it('Verifies the fields from a fixed asset form the list', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/fixedAssets',{
      fixture: 'fixedAssets/listOfAssets.json'
    }).as('listOfAssets',);

    cy.visit('/activos-fijos');

    cy.get('p')
    .and('contain', 'Descripci')  
    .and('contain', 'Computadora de escritorio')
  });
});
