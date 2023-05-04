sessionStorage.setItem('Access',"CompleteAccess")

describe('Add a fixed asset end to end tests', () => {
    it('Creates a fixed asset', () => {
      cy.intercept('GET', process.env.REACT_APP_BACKEND_URL + '/api/programHouses',{
        fixture: 'programHouses/listOfProgramHouses.json',
        statusCode: 200
      }).as('programHouses',)

      cy.visit('/crear-activo-fijo')  
      //cy.wait('@programHouses').its('response.statusCode').should('equal', 200)
      cy.get('#Name').type('Principito',{force: true})

      //cy.get('#category-drop').select([1])
      //cy.get('#category-drop').select("data-value=1")
      //cy.get('#category-drop').type('Maquinaria y Equipos',{force: true})
      cy.get('.MuiListItemText-primary').contains('Maquinaria y Equipos').click()

      cy.get('#type-drop').type('Libro',{force: true})
      cy.get('#Price').type(50,{force: true})
      cy.get('#programa-drop').type('CRE',{force: true})
      cy.get('#estado-drop').type('En uso',{force: true})
      cy.get('#responsable-drop').type('Andres Peredo',{force: true})
      cy.get('#Location').type('Cochabamba',{force: true})
      cy.get('#Code').type('F-CRE-MAQ-0913',{force: true})
  
      cy.get('#submit_button').click()
      cy.clock()
      
      /*
      cy.intercept('POST', process.env.REACT_APP_BACKEND_URL + '/api/fixedAssets',{
        fixture: 'fixedAssets/listOfAssets.json',
        statusCode: 201
      }).as('anAssetPost',)
      cy.wait('@anAssetPost').its('response.statusCode').should('equal', 201)
      */

    });
  });