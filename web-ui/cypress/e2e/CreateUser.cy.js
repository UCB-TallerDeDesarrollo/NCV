describe('Create User', () => {
    const email = 'soporteNCV@gmail.com'
    const password = 'Soporte!23'
  
   
        beforeEach(() => {
            sessionStorage.setItem('Access','');
            cy.login(email, password)
          });
          
  
   it('deberia crear un Usuario Exitosamente', () => {
    // cy.get('button').contains('Usuarios').click()
    // cy.get('button').contains('Registrar Usuario').click()

    cy.visit("registrarse-ncv");

    cy.get('#firstName')
       .type('tia')
    cy.get('#lastName')
       .type('tia2')   
    cy.get('#cellPhone')
       .type('77659902')
    cy.get('#email')
       .type('tiap@gmail.com')
    cy.get('#rol').click();
       cy.contains('li', 'Equipo Tecnico').click();
       cy.get('button[type="input"][label="Registrar"]').click({force: true});
       cy.get('.MuiListItemText-primary').contains('Equipo Tecnico').click()
       cy.contains('li','tia', 'tia2')
       .within(() => {
         cy.get('.delete-button').click();
       })
       cy.get('button[type="input"][label="Eliminar"]').click({force: true});
       cy.wait(3000);
  });
  
  it('deberia mostrar un mensaje que el campo nombre es requerido', () => {
    // cy.get('button').contains('Usuarios').click()
    // cy.get('button').contains('Registrar Usuario').click()

    cy.visit("registrarse-ncv");

    cy.get('#firstName')
       .type("tia")
       .clear();
    cy.get('#lastName')
       .type('tia2')   
    cy.get('#cellPhone')
       .type('77659902')
    cy.get('#email')
       .type('tiap@gmail.com')
    cy.get('#rol').click();
       cy.contains('li', 'Equipo Tecnico').click();
       cy.get('button[type="input"][label="Registrar"]').click({force: true});
       cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!El nombre es requerido!');
  });

  it('deberia mostrar un mensaje que el campo apellido es requerido', () => {
    // cy.get('button').contains('Usuarios').click()
    // cy.get('button').contains('Registrar Usuario').click()

    cy.visit("registrarse-ncv");

    cy.get('#firstName')
       .type("tia")
    cy.get('#lastName')
       .type('tia2') 
       .clear();  
    cy.get('#cellPhone')
       .type('77659902')
    cy.get('#email')
       .type('tiap@gmail.com')
    cy.get('#rol').click();
       cy.contains('li', 'Equipo Tecnico').click();
       cy.get('button[type="input"][label="Registrar"]').click({force: true});
       cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!El apellido es requerido!');
  });
  
  it('deberia mostrar un mensaje que el campo celular es requerido', () => {
    // cy.get('button').contains('Usuarios').click()
    // cy.get('button').contains('Registrar Usuario').click()

    cy.visit("registrarse-ncv");

    cy.get('#firstName')
       .type("tia")
    cy.get('#lastName')
       .type('tia2')   
    cy.get('#cellPhone')
       .type('77659902')
       .clear();
    cy.get('#email')
       .type('tiap@gmail.com')
    cy.get('#rol').click();
       cy.contains('li', 'Equipo Tecnico').click();
       cy.get('button[type="input"][label="Registrar"]').click({force: true});
       cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!El celular es requerido!');
       //cy.wait(5000000); 
  });

  it('deberia mostrar un mensaje que el correo electronico ya fue utilizado', () => {
    // cy.get('button').contains('Usuarios').click()
    // cy.get('button').contains('Registrar Usuario').click()

    cy.visit("registrarse-ncv");

    cy.get('#firstName')
       .type("tia")
    cy.get('#lastName')
       .type('tia2')   
    cy.get('#cellPhone')
       .type('77659902')
    cy.get('#email')
       .type('sebas_ag97@hotmail.com')
    cy.get('#rol').click();
       cy.contains('li', 'Equipo Tecnico').click();
       cy.get('button[type="input"][label="Registrar"]').click({force: true});
       cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!El correo ingresado ya esta registrado!');
  });

  it('deberia mostrar un mensaje que el formato del correo electronico es incorrecto', () => {
    // cy.get('button').contains('Usuarios').click()
    // cy.get('button').contains('Registrar Usuario').click()

    cy.visit("registrarse-ncv");

    cy.get('#firstName')
       .type("tia")
    cy.get('#lastName')
       .type('tia2')   
    cy.get('#cellPhone')
       .type('77659902')
    cy.get('#email')
       .type('sebas_ag97')
    cy.get('#rol').click();
       cy.contains('li', 'Equipo Tecnico').click();
       cy.get('button[type="input"][label="Registrar"]').click({force: true});
       cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!Formato de correo incorrecto!');
       //cy.wait(5000000); 
  });

  });