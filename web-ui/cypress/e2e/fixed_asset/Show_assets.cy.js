describe('Show assets end to end tests', () => {
  it('Muestra la lista de los activos fijos', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/fixedAssets',{
      fixture: 'fixedAssets/listOfAssets.json'
    }).as('listOfAssets',);

    cy.visit('/activos-fijos');

    cy.get('.activos-fijos')
    .should('have.length', 5)
  });
  it('Verifica campos de un activo fijo de la lista', () => {
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
