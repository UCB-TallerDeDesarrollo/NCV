sessionStorage.setItem('Access', "CompleteAccess")

const urlVisit = 'https://ncv-stagging.web.app/activos-fijos/categorias'
const urlResponsables = 'https://ncv-api.azurewebsites.net/api/assetResponsibles'
const urlPOST = 'https://ncv-api.azurewebsites.net/api/assetResponsibles/'

describe('Deberia eliminar una categoria sin ningun problema', () => {
  it('Crear un tipo de categoria de manera exitosa', () => {
  
    cy.intercept('GET', "https://ncv-api.azurewebsites.net/api/assetCategories", [
      {
        "id": 8,
        "category": "Cat prueba4",
        "code":"CP4",
        "assetTypes": [],
        "type": ""
      },
      {
        "id": 9,
        "category": "Cat prueba5",
        "code":"CP5",
        "assetTypes": [],
        "type": ""
      },
      {
        "id": 10,
        "category": "Cat prueba6",
        "code":"CP6",
        "assetTypes": [],
        "type": ""
      }
    ]).as('getAssetCategories');

    cy.intercept('DELETE', "https://ncv-api.azurewebsites.net/api/assetCategories/8", {
    }).as('deleteAssetCategory');
  
    cy.visit(urlVisit);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    //cy.wait(20000); 
      cy.get('div.MuiButtonBase-root') // Selecciona el div externo por su clase o cualquier otro selector válido
      .within(() => {
        cy.contains('CP4 - Cat prueba4')
        cy.get("button.MuiButtonBase-root").first().click()
      });
      cy.get("#confirm_delete_button").click()
      cy.wait('@deleteAssetCategory').its('response.statusCode').should('eq', 200);
      cy.get("div.MuiAlert-message").should("contain","Registro Eliminado")
    
  });  

  

});
