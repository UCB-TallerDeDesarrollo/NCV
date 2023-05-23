describe('Crear categoria con codigo corto', () => {
    // const urlVisit = 'https://ncv-stagging.web.app/vista-usuarios/sebas'
    // const urlGETUsuario = 'https://ncv-api-staging.azurewebsites.net/api/auth/sebas'
    // const urlGHetAuth = 'https://ncv-api-staging.azurewebsites.net/api/auth'
    // const urlPUTUsuario = 'https://ncv-api-staging.azurewebsites.net/api/auth/sebas'  
    // it('Deberia validar la cantidad inicial de las categorias que se pueden tener en la vista de la pagina', () => {  
    //     cy.visit('/activos-fijos/categorias');        
    //     cy.get('.ListElement').contains('MAE - Maquinaria y Equipos').click()
    //     cy.get('.ListElement').contains('MUE - Muebles').click()
    //     cy.get('.ListElement').contains('JUG - Juguetes').click()
    //     cy.get('.ListElement').contains('MAT - Material Escolar').click()        
    //     cy.get('.ListElement').should('have.length', 4)
    // })
    it('Deberia crear una categoria con codigo corto Exitosamente', () => {  
        //cy.visit('/activos-fijos/categorias');        
        //cy.get('#category').type("Categoria de prueba")
        //cy.get('#code').type("CP1")
        //cy.get('#submit_button').click();
    })
    it('No deberia crear una categoria sin codigo corto', () => {  
        //cy.visit('/activos-fijos/categorias');
        //cy.get('#category').type("Categoria de prueba")
        //cy.get('#code').type("CP1")
        //cy.get('#submit_button').click();
    })
    it('No deberia crear una categoria sin el nombre de la categoria', () => {  
        //cy.visit('/activos-fijos/categorias');
        //cy.get('#category').type("Categoria de prueba")
        //cy.get('#code').type("CP1")
        //cy.get('#submit_button').click();
    })
})