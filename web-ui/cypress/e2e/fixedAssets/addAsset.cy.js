/*sessionStorage.setItem('Access',"CompleteAccess")

describe('Add a fixed asset end to end tests', () => {
    it('Creates a fixed asset', () => {
      cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/programHouses',{
        fixture: 'programHouses/listOfProgramHouses.json',
        statusCode: 200
      }).as('programHouses',)     
      cy.visit('/crear-activo-fijo')  
      //cy.wait('@programHouses').its('response.statusCode').should('equal', 200)
      cy.get('#Name').type('Teclado',{force: true})
      cy.get('#Description').type('Es un teclado desde la prueba',{force: true})
      cy.get('#EntryDate').type('2022-09-15',{force: true})
      cy.get('#Price').type('500',{force: true})
      cy.get('#Features').type('Marca Cypress',{force: true})
      cy.get('#Quantity').type('10',{force: true})
  
      cy.get('#submit_button').click()
  
      cy.clock()      
      cy.intercept('POST', 'https://ncv-api.azurewebsites.net/api/fixedAssets',{
        fixture: 'fixedAssets/listOfAssets.json',
        statusCode: 201
      }).as('anAssetPost',)
      cy.wait('@anAssetPost').its('response.statusCode').should('equal', 201)
    });
  });
*/