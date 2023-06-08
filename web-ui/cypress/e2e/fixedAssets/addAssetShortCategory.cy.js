sessionStorage.setItem('Access', "CompleteAccess")

const search = "div[id='19']"
const newCode = "MUE"
const newCategory = "Sillas"
const summaryChar = newCode + " - " + newCategory
const pathFormShortCategory = 'https://ncv-stagging.web.app/activos-fijos/categorias'
const urlGETshortCategory = 'https://ncv-api.azurewebsites.net/api/assetCategories'
const urlPUTshortCategory = 'https://ncv-api.azurewebsites.net/api/assetCategories/'

describe(' Editar las pruebas de extremo a extremo de Categoria de Codigo Corto ', () => {
    it.only(' Verificar happy path (cambio de categoria corta) y codigo de estado ', () => {
        cy.intercept('GET', urlGETshortCategory, {
          fixture: 'fixedAssets/anAssetShortCategory.json'
        }).as('shortCategory');
        cy.intercept('PUT', urlPUTshortCategory, {
            "id": 19,
            "category": newCategory,
            "code": newCode,
            "assetTypes": [],
            "type": null
        }).as('shortCategory');

        cy.log(summaryChar);
        cy.visit(pathFormShortCategory)

        // Eliminacion de Campo \\
        cy.get(search)
                .type('{selectall}{backspace}{enter}')
        // Edicion de Campo \\
        cy.get(search).each(function ($newName) {
            cy.wrap($newName)
                //.type("${summaryChar} {enter}")
                .type('MUE - Sillas {enter}');
        })
        // Volver \\
        cy.get(search).each(function ($oldName) {
            cy.wrap($oldName)
                .type('TEST - test {enter}')
        })

        cy.wait('@shortCategory').its('response.statusCode').should('eq', 200);
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
        cy.get('.MuiAlert-message').should('have.text', 'Estado actualizado');
        cy.get("[role='alert']").should('have.length', 1);
    });

    it.skip(' Deberia mostrar un mensaje que no se puede dejar el campo de edicion vacio ', () => {
        
    });
});