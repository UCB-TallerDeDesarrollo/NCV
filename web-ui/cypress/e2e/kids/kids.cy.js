describe('Show kids end to end tests', () => {
  it('Shows the list of kids', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids',{
      fixture: 'kids/listOfKids.json'
    }).as('listOfKids',);

    cy.visit('/ninos');

    cy.get('.ninos')
    .should('have.length', 6)
  });
});