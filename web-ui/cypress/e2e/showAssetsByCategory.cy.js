sessionStorage.setItem('Access', "CompleteAccess")
const urlVisita="https://ncv-stagging.web.app/activos-fijos/tipos-por-categoria";
describe('Agregar prueba automatizada para gestionar tipo de activo fijo', () => {
    it("Deberia crear un tipo de activo fijo exitosamente", () => {
        cy.intercept('POST', "https://ncv-api.azurewebsites.net/api/assetCategories/2/assetTypes", {
            "id": 13,
            "assetCategoryId": 8,
            "assetCategoryCategory": "MA Y Ecuipos",
            "type": "Prueba2",
            "deleted": false
        }).as('crearTipos');

        cy.visit(urlVisita);

        cy.get('#category-drop').click();
        cy.contains('li', 'Muebles').click();
        cy.get('#type').type('prueba100');

        cy.get('button[type="input"][label="Crear tipo"]').click();
        cy.wait('@crearTipos').its('response.statusCode').should('eq', 200);

    });
    it("Deberia mostrar alerta al intentar crear un tipo de activo fijo con un campo vacio", () => {
        cy.get('#category-drop').click();
        cy.get('[data-value="2"]').click();
        cy.get('#type')//.type('Nuevo tipo');    
        cy.get('#submit_button').click();
        cy.get('.MuiAlert-message').should('exist')
    });
    it(' Deberia validar mensaje de error al tratar de crear un tipo sin nombre', () => {
        cy.get('#category-drop')//.click();
        cy.get('#type').type('Nuevo tipo');
        cy.get('#submit_button').click();
        cy.get('.MuiAlert-message').should('exist')
    });
    it('deberia mostrar un mensaje que el campo es requerido', () => {
        cy.get('#category-drop').click();
        cy.contains('li', 'Muebles').click();
        cy.get('#type').type('prueba100', { force: true }).clear();
        cy.get('button[type="input"][label="Crear tipo"]').click({ force: true });
        cy.get('.MuiAlert-message').should('have.text', 'El tipo es requerido!');
    });

});