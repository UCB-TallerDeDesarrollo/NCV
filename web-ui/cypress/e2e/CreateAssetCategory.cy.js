sessionStorage.setItem('Access', "CompleteAccess")

const urlVisit = 'https://ncv-stagging.web.app/activos-fijos/categorias'
const urlResponsables = 'https://ncv-api.azurewebsites.net/api/assetResponsibles'
const urlPOST = 'https://ncv-api.azurewebsites.net/api/assetResponsibles/'

describe('Creación de categorias de activos fijos', () => {
  it('Crear un tipo de categoria de manera exitosa', () => {
  
    cy.intercept('GET', "https://ncv-api.azurewebsites.net/api/assetCategories/", [
      {
        "id": 8,
        "category": "Categoria de prueba4",
        "code":"CP4",
        "assetTypes": [],
        "type": ""
      },
      {
        "id": 8,
        "category": "Categoria de prueba4",
        "code":"CP4",
        "assetTypes": [],
        "type": ""
      }
    ]).as('getAssetCategories');

    cy.intercept('POST', "https://ncv-api.azurewebsites.net/api/assetCategories/", {
        "id": 8,
        "category": "Categoria de prueba4",
        "code":"CP4",
        "assetTypes": [],
        "type": ""
    }).as('createAssetCategory');
  
    cy.visit(urlVisit);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000); 
    cy.get('#code').type('pr2');
    cy.get('#category').type('prueba');
    cy.get('#submit_button').click();
    cy.wait('@createAssetCategory').its('response.statusCode').should('eq', 200);
  });  

  it('Error al crear tipo de categoria, campo vacío', () => {
    cy.visit(urlVisit);
    cy.get('#code').type('pr2');
    cy.get('#category').type('prueba').clear();
    cy.get('#submit_button').click();
    cy.get('.MuiAlert-message').should('have.text', 'La categoria es requerida!');
  });

});
