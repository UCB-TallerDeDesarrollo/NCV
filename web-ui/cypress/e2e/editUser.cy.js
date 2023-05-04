describe('Edit users end to end tests', () => {
var rol = 'Administrador'
  beforeEach(() => {
    const email = 'soporteNCV@gmail.com'
    const password = 'Soporte!23'
   
    sessionStorage.setItem('Access','');
    cy.login(email, password)
  });
  
  it('Crear usuario Test User', () => {
    cy.viewport(1200, 1200);
    const randomNumber = Math.floor(Math.random() * 100);
  
    cy.get('button').contains('Usuarios').click();
    cy.get('button').contains('Registrar Usuario').click();
    
    cy.get('#firstName', {force: true})
      .type('Test');
    
    cy.get('#lastName').type('User');   
    cy.get('#cellPhone').type(randomNumber);
    cy.get('#email').type('testexample@gmail.com');
    
    cy.get('#rol').click();
    cy.contains('li', rol).click();
    
    cy.get('button[type="input"][label="Registrar"]').click({force: true});
    cy.get('.MuiListItemText-primary').contains(rol).click()
    cy.get('ul.MuiList-root')
      .contains('Test User')
      .should('be.visible');

  });
  

   
   it('Verificar happy path (cambio de numero)', () => {
     const randomNumber = Math.floor(Math.random() * 100);

     cy.get('button').contains('Usuarios').click()
     cy.get('.MuiListItemText-primary').contains(rol).click()

     cy.contains('li', 'Test User')
     .within(() => {
       cy.get('.editar-assetState-button').click();
     })
     cy.wait(3000);

     cy.get('#cellPhone')
     .clear()
     .type(randomNumber)

     cy.get('button[type="input"][label="Guardar Cambios"]').click();
     cy.get('.MuiListItemText-primary').contains(rol).click()
     
     cy.contains('li', 'Test User')
     .parent()
     .within(() => {
       cy.contains(randomNumber).should('be.visible');
     });

   })

   it('Verificar happy path (sin cambiar ningun dato del usuario)', () => {
    cy.get('button').contains('Usuarios').click()
    cy.get('.MuiListItemText-primary').contains(rol).click()

    cy.contains('li', 'Test User')
    .within(() => {
      cy.get('.editar-assetState-button').click();
    })
    cy.wait(10000);

    cy.get('button[type="input"][label="Guardar Cambios"]').click();

    cy.get('.MuiListItemText-primary').contains(rol).click()

    cy.wait(10000);
    
    cy.get('ul.MuiList-root')
      .contains('Test User')
      .should('be.visible');
  })

  it('Verificar happy path (cambio de rol)', () => {
    cy.get('button').contains('Usuarios').click()
    cy.get('.MuiListItemText-primary').contains(rol).click()

    cy.contains('li', 'Test User')
    .within(() => {
      cy.get('.editar-assetState-button').click();
    })
    cy.wait(5000);

    cy.get('#rol').click();
    cy.contains('li', 'Equipo Tecnico').click();
    rol = 'Equipo Tecnico'
    cy.get('button[type="input"][label="Guardar Cambios"]').click({force: true});

    cy.get('.MuiListItemText-primary').contains(rol).click()

    cy.wait(10000);

    cy.get('ul.MuiList-root')
      .contains('Test User')
      .should('be.visible');
  })


  it('Eliminar Test User', () => {

    cy.get('button').contains('Usuarios').click()
    cy.get('.MuiListItemText-primary').contains(rol).click()

    cy.contains('li', 'Test User')
      .within(() => {
    cy.get('[title="Eliminar"]').click();
    });
    cy.get('button[type="input"][label="Eliminar"]').click({force: true});
    cy.wait(3000);

    cy.get('.MuiListItemText-primary').contains(rol).click({force: true});
    cy.get('ul.MuiList-root')
      .should('not.contain', 'Test User');
  })


   /*
   

   

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

   })*/

   
});

