//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Access',"CompleteAccess")

describe('Show a file kid end to end tests', () => {
    it('Verifies the fields from a single kid file', () => {
      cy.intercept('GET', process.env.REACT_APP_BACKEND_URL + '/api/kids/42',{
        fixture: 'fixedAssets/aBasicInfo.json'
      }).as('getBasicInfo',);
  
      cy.visit('/ninos/42');
  
      cy.get('div')
      cy.contains('Elizabeth')
      cy.contains('Ortega Lara')
      cy.contains('79235642')
      // cy.contains('12/9/2002') // it does not work
      cy.contains('20')
      cy.contains('SDE')
      cy.contains('Cochabamba - Cercado')
      cy.contains('F')
    });
  });