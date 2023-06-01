const urlVisit = 'https://ncv-stagging.web.app/activos-fijos/responsables'
const urlResponsables = 'https://ncv-api.azurewebsites.net/api/assetResponsibles'
const urlPOST = 'https://ncv-api.azurewebsites.net/api/assetResponsibles/'

describe('Creación de Responsable de Activos Fijos', () => {
  it('Crea un nuevo responsable y verifica codigo 200 de post', () => {
  
    cy.intercept('GET', urlResponsables, [
      {
        id: 1,
        name: 'Responsable 1',
        fixedAssets: []
      },
      {
        id: 2,
        name: 'Responsable 2',
        fixedAssets: []
      }
    ]).as('getResponsibles');

    cy.intercept('POST', urlPOST, {
      "id": 28,
      "name": "Test User 2",
      "fixedAssets": []
    }).as('createResponsible');
  
    cy.visit(urlVisit);
    cy.get('#name').should('exist').type('Test User 2');
    cy.get('#name').type('Test User 2');
    
    // Hacer clic en el botón para crear el responsable
    cy.get('#submit_button').click();
  
    // Verificar que la respuesta del POST tiene el código de respuesta 200
    cy.wait('@createResponsible').its('response.statusCode').should('eq', 200);
  });
  
  
  




  

  it('Error al eliminar Responsable, campo vacío', () => {
    // Visitar la página
    cy.visit(urlVisit);
  
    // Mockear la respuesta del GET inicial a la lista de responsables
    cy.intercept('GET', urlResponsables, [
      {
        id: 1,
        name: 'Responsable 1',
        fixedAssets: []
      },
      {
        id: 2,
        name: 'Responsable 2',
        fixedAssets: []
      }
    ]).as('getResponsibles');
  
    cy.get('#submit_button').click();
  
    // Verificar que el elemento con el mensaje de error existe
    cy.get('.MuiAlert-message.css-1xsto0d').should('exist');
    cy.get('.MuiAlert-message.css-1xsto0d').should('contain', 'El Responsable es requerido!');
  });
  
  
});
