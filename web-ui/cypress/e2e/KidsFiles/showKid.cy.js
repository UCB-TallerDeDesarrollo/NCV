describe('Show a kid end to end tests', () => {
    it('Shows a single kid', () => {
      cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/6',{
        fixture: 'kids/anKid.json'
      }).as('getAnKid',);
  
      cy.visit('/ninos/6');
  
      cy.get('div')
      .should('have.length', 1)
    });
    it('Verifies the fields from a single kid', () => {
      cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/6',{
        fixture: 'kids/anKid.json'
      }).as('getAnKid',);
  
      cy.visit('/ninos/6');
  
      cy.get('div')
      cy.contains('Joaquin')
      cy.contains('Hernan Gomez')
      cy.contains("8796235")
      cy.contains('Av. Cualquier cosa #11')
      cy.contains("España")
    });
  });
  