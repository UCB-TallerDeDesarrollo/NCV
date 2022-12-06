//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Access',"CompleteAccess")
describe('Show a fixed asset end to end tests', () => {
  it('Verifies the fields from a single fixed asset', () => {
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/fixedAssets/9',{    
      fixture: 'fixedAssets/anAsset.json'
    }).as('getAnAsset',);

    cy.visit('/activos-fijos/9');

    cy.get('div')
    cy.contains('Computadora cypress')
    cy.contains('Computadora de escritorio')
    cy.contains(2424.24)
    cy.contains('Obsoleto')
  });
});
