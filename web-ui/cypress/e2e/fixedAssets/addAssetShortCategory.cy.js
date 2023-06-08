sessionStorage.setItem('Access', "CompleteAccess")

const search1 = "div[id='19']"
const search2 = "div[id='13']"
const newCode = "MUE"
const newCategory = "Sillas"
const summaryChar = newCode + " - " + newCategory
const pathFormShortCategory = 'https://ncv-stagging.web.app/activos-fijos/categorias'
const urlGETshortCategory = 'https://ncv-api.azurewebsites.net/api/assetCategories'
const urlPUTshortCategory = 'https://ncv-api.azurewebsites.net/api/assetCategories/'

// it.only -> solo se ejecutan esta etiqueta.
// it.skip -> solo se pasan esta etiqueta.

describe(' Editar las pruebas de extremo a extremo de Categoria de Codigo Corto ', () => {
    it(' Verificar happy path (cambio de categoria corta) y codigo de estado ', () => {
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
        cy.get(search1)
                .type('{selectall}{backspace}{enter}')
        // Edicion de Campo \\
        cy.get(search1).each(function ($newName) {
            cy.wrap($newName)
                //.type("${summaryChar} {enter}")
                .type('MUE - Sillas {enter}');
        })
        // Volver \\
        cy.get(search1).each(function ($oldName) {
            cy.wrap($oldName)
                .type('TEST - test {enter}')
        })

        cy.wait('@shortCategory').its('response.statusCode').should('eq', 200);
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
        cy.get('.MuiAlert-message').should('have.text', 'Estado actualizado');
        cy.get("[role='alert']").should('have.length', 1);
    });

    it(' Deberia mostrar la misma categoria anterior si se deja vacio el campo de edicion ', () => {
        cy.visit(pathFormShortCategory)
        cy.get(search2)
            .type('{selectall}{backspace}{enter}')
        
        cy.get(search2).should('have.value', '');
        cy.get(search2).should('contain', 'MAQ - Maquinaria y Equipos');
    });
});