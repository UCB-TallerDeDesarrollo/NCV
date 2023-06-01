describe('Create User', () => {
    const email = 'soporteNCV@gmail.com'
    const password = 'Soporte123!'
  
   
        beforeEach(() => {
            sessionStorage.setItem('Access','');
            cy.login(email, password)
          });

       
  
   it('deberia crear un Usuario Exitosamente', () => {
    cy.get('button').contains('Usuarios').click()
    cy.get('button').contains('Registrar Usuario').click()

        cy.intercept('GET', "https://ncv-api.azurewebsites.net/api/auth/", [
        {
            id:1,
            firstName: "Marcelo",
            lastName: "Claure",
            cellPhone: "67835543",
            email:"marcelocl@gmail.com",
            password:"Pass!23",
            confirmPassword:"Pass!23",
            rol: "Equipo Tecnico"
        },
        {
            id:2,
            firstName: "Marcelo",
            lastName: "Claure",
            cellPhone: "67835543",
            email:"marcelocl@gmail.com",
            password:"Pass!23",
            confirmPassword:"Pass!23",
            rol: "Equipo Tecnico"
        }
      ]).as('getUsers');

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
       cy.contains('li', 'Tia').click();

      cy.intercept('POST', "https://ncv-api.azurewebsites.net/api/auth/TIA", {
            id:3,
            firstName: "Sebastian",
            lastName: "Asturizaga",
            cellPhone: "67835543",
            email:"Sebastian@gmail.com",
            password:"Pass!23",
            confirmPassword:"Pass!23",
            rol: "Tia"
      }).as('createUser');

    
    cy.get('button[type="input"][label="Registrar"]').click({force: true});
    cy.wait('@createUser').its('response.statusCode').should('eq', 200);
});

  it('deberia mostrar un mensaje que el campo nombre es requerido', () => {
    cy.get('button').contains('Usuarios').click()
    cy.get('button').contains('Registrar Usuario').click()

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
  


  });