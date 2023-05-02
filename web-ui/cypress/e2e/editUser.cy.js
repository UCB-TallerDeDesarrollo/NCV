describe('Edit users end to end tests', () => {

    beforeEach(() => {
      const email = 'soporteNCV@gmail.com'
      const password = 'Soporte!23'
     
      sessionStorage.setItem('Access','');
      cy.login(email, password)
    });
 
 
     
     it('Verificar happy path (cambio de numero)', () => {
       const randomNumber = Math.floor(Math.random() * 100);
 
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
 
       cy.get('#cellPhone')
       .clear()
       .type(randomNumber)
 
       cy.get('button[type="input"][label="Guardar Cambios"]').click();
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
       
       cy.contains('li', 'Test User')
       .parent()
       .within(() => {
         cy.contains(randomNumber).should('be.visible');
       });
 
     })
 
     it('Verificar happy path (cambio de rol)', () => {
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
 
       cy.get('#rol').click();
       cy.contains('li', 'Equipo Tecnico').click();
 
       cy.get('button[type="input"][label="Guardar Cambios"]').click({force: true});
 
       cy.get('.MuiListItemText-primary').contains('Equipo Tecnico').click()
 
       cy.wait(10000);
 
       cy.get('ul.MuiList-root')
         .contains('Test User')
         .should('be.visible');
       /*
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
       
       cy.get('#rol').click();
 
       cy.contains('li', 'Administrador').click();
 
       cy.get('button[type="input"][label="Guardar Cambios"]').click({force: true});*/
     })
 
     it('Verificar happy path (volver al rol original)', () => {
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Equipo Tecnico').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
 
       cy.get('#rol').click();
       cy.contains('li', 'Administrador').click();
 
       cy.get('button[type="input"][label="Guardar Cambios"]').click({force: true});
 
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.wait(10000);
       
       cy.get('ul.MuiList-root')
         .contains('Test User')
         .should('be.visible');
     })
 
     it('Verificar happy path (sin cambiar ningun dato del usuario)', () => {
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
       cy.wait(10000);
 
       cy.get('button[type="input"][label="Guardar Cambios"]').click();
 
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.wait(10000);
       
       cy.get('ul.MuiList-root')
         .contains('Test User')
         .should('be.visible');
     })
 
     it('Validar mensaje de error al dejar vacio el numero', () => {
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
       cy.wait(10000);
       cy.get('#cellPhone')
       .clear()
       cy.get('button[type="input"][label="Guardar Cambios"]').click();
       cy.get('.MuiAlert-message').should('have.text', 'Todos los campos son requeridosEl celular es requerido!');
 
     })
 
     it('Validar mensaje de error al dejar vacio el correo', () => {
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
       cy.wait(10000);
       cy.get('#email')
       .clear()
       cy.get('button[type="input"][label="Guardar Cambios"]').click();
       cy.get('.MuiAlert-message').should('have.text', 'Todos los campos son requeridosEl correo es requerido!');
 
     })
 /*
     it('Validar mensaje de error al dejar vacio el nombre', () => {
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
       cy.wait(10000);
       cy.get('#firstName')
       .clear()
       cy.get('button[type="input"][label="Guardar Cambios"]').click();
       cy.get('.MuiAlert-message').should('have.text', 'Todos los campos son requeridosEl correo es requerido!');
 
     })
 
     it('Validar mensaje de error al dejar vacio el apellido', () => {
       cy.get('button').contains('Usuarios').click()
       cy.get('.MuiListItemText-primary').contains('Administrador').click()
 
       cy.contains('li', 'Test User')
       .within(() => {
         cy.get('.editar-assetState-button').click();
       })
       cy.wait(10000);
       cy.get('#lastName')
       .clear()
       cy.get('button[type="input"][label="Guardar Cambios"]').click();
       cy.get('.MuiAlert-message').should('have.text', 'Todos los campos son requeridosEl correo es requerido!');
 
     })*/
 
     
 });
 
 