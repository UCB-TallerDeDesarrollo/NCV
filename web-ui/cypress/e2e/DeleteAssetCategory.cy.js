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

  it('no deberia borrar una categoria que tenga activos fijos', () => {

    cy.intercept('GET', "https://ncv-api.azurewebsites.net/api/assetCategories", [
        {
            "id": 1,
            "category": "Juguetes",
            "code": "JUG",
            "assetTypes": [
                {
                    "id": 2,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "Laptop",
                    "deleted": false
                },
                {
                    "id": 4,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "Television",
                    "deleted": false
                },
                {
                    "id": 1,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "COLUMPIO",
                    "deleted": false
                },
                {
                    "id": 143,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "12",
                    "deleted": true
                },
                {
                    "id": 3,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "Computadora",
                    "deleted": false
                },
                {
                    "id": 142,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "pr",
                    "deleted": true
                },
                {
                    "id": 155,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "ij",
                    "deleted": true
                },
                {
                    "id": 161,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "1234",
                    "deleted": false
                },
                {
                    "id": 223,
                    "assetCategoryId": 1,
                    "assetCategoryCategory": "Juguetes",
                    "type": "Senor X",
                    "deleted": true
                }
            ],
            "type": null
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

      cy.visit(urlVisit);
      cy.get('div.MuiButtonBase-root') // Selecciona el div externo por su clase o cualquier otro selector válido
      .within(() => {
        cy.contains('JUG - Juguetes')
        cy.get("button.MuiButtonBase-root").first().click()
      });
      cy.get("#confirm_delete_button").click()
      cy.get("div.MuiAlert-message").should("contain","El estado no puede ser eliminado porque existen activos fijos asociados a el")

  });

});
