sessionStorage.setItem('Role',"Soporte")

describe('Show kids end to end tests', () => {
  it('Shows the list of kids', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids',{
      fixture: 'Kids/listOfKids.json'
    }).as('listOfKids',);

    cy.visit('/ninos');

    cy.get('.ListElement')
    .and('contain', 'Pedrulas')
    .should('have.length', 5)
  });  
});

describe('Show searched kids end to end tests', () => {
  it('Shows the list of kids', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids',{
      fixture: 'Kids/listOfKids.json'
    }).as('listOfKids',);

    cy.visit('/ninos');

    cy.get('.SearchBar').type('Pe');

    cy.get('.ListElement')
    .and('contain', 'Pedrulas')
    .should('have.length', 5)
  });  
});

