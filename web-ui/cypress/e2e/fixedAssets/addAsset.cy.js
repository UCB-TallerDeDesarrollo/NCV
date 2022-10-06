sessionStorage.setItem('Role',"Soporte")

describe('Add a fixed asset end to end tests', () => {
    it('Creates a fixed asset', () => {
      cy.visit('/crear-activo-fijo');
      cy.get('#Name').type('Teclado');
      cy.get('#Description').type('Es un teclado desde la prueba');
      cy.get('#EntryDate').type('2022-09-15');
      cy.get('#Price').type('500');
      cy.get('#Features').type('Marca Cypress');
      cy.get('#Quantity').type('10');
  
      cy.get('#submit_button').click();
  
      cy.clock();
      cy.intercept('POST', 'https://ncv-api.herokuapp.com/api/fixedAssets',{
        fixture: 'fixedAssets/listOfAssets.json',
        statusCode: 201
      }).as('anAssetPost',);
      cy.wait('@anAssetPost').its('response.statusCode').should('equal', 201);
    });
  });
