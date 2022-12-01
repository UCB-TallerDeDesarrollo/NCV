//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Access',"CompleteAccess")

describe('Show fixed assets end to end tests', () => {
  it('Shows the list of fixed assets', () => {
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/assetCategories?showAssets=true',{    
      fixture: 'fixedAssets/assetCategories.json'
    }).as('getAssetCategories',);
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/fixedAssets',{    
      fixture: 'fixedAssets/listOfAssets.json'
    }).as('listOfAssets',);
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/programHouses',{    
      fixture: 'programHouses/listOfProgramHouses.json'
    }).as('listOfProgramHouses',);
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/assetStates',{    
      fixture: 'fixedAssets/assetStates.json'
    }).as('listOfAssetStates',);

    cy.visit('/activos-fijos');
    cy.get('.ListElement').contains('Herramientas').click()
    cy.get('.ListElement').contains('Muebles y Enseres').click()
    cy.get('.ListElement').contains('Maquinaria y Equipos').click()
    cy.get('.ListElement').contains('Vehículos').click()
    cy.get('.ListElement')
    .and('contain', 'Herramientas')  
    .and('contain', 'Muebles y Enseres')
    .and('contain', 'Maquinaria y Equipos')
    .and('contain', 'Vehículos')
    .and('contain', 'Computadora2')
    .and('contain', 'Computadora3')
    .and('contain', 'Monitor curvo')
    .and('contain', 'Computadora')
    .and('contain', 'Teclado')
    .should('have.length', 9)
  });
  it('Verifies the fields from a fixed asset category form the list', () => {
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/assetCategories?showAssets=true',{    
      fixture: 'fixedAssets/assetCategories.json'
    }).as('getAssetCategories',);
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/fixedAssets',{    
      fixture: 'fixedAssets/listOfAssets.json'
    }).as('listOfAssets',);
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/programHouses',{    
      fixture: 'programHouses/listOfProgramHouses.json'
    }).as('listOfProgramHouses',);
    cy.intercept('GET', 'https://ncv-api.azurewebsites.net/api/assetStates',{    
      fixture: 'fixedAssets/assetStates.json'
    }).as('listOfAssetStates',);

    cy.visit('/activos-fijos');

    cy.get('.ListElement')
    .and('contain', 'Herramientas')  
    .and('contain', 'Muebles y Enseres')
    .and('contain', 'Maquinaria y Equipos')
    .and('contain', 'Vehículos')
  });
});
