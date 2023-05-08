sessionStorage.setItem('Access', "CompleteAccess")

describe('Edit users end to end tests', () => {
  it('Verificar happy path (cambio de numero)', () => {
    const randomNumber = Math.floor(Math.random() * 100);

    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/auth/Sebas', {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', 'https://ncv-api-staging.azurewebsites.net/api/auth/Sebas', {
      "email": "testUser@gmail.com",
      "cellPhone": randomNumber,
      "firstName": "User",
      "lastName": "Test",
      "role": "Administrador",
      "rol": "Administrador"
    }).as('getBasicInfo',);

    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/auth', [
      {
        "email": "testUser@gmail.com",
        "firstName": "User",
        "lastName": "Test",
        "cellPhone": randomNumber,
        "nameRole": "Administrador",
        "id": "Sebas"
      }
    ]).as('getBasicInfo',);
    cy.visit('/vista-usuarios/Sebas');
    cy.get('#cellPhone')
      .clear()
      .type(randomNumber)
    cy.get('button[type="input"][label="Guardar Cambios"]').click();
    cy.get('.MuiListItemText-primary').contains('Administrador').click()
    cy.get('ul.MuiList-root')
      .contains(randomNumber)
      .should('be.visible');
  });

  it('Verificar happy path (cambio de rol)', () => {
    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/auth/Sebas', {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', 'https://ncv-api-staging.azurewebsites.net/api/auth/Sebas', {
      "email": "testUser@gmail.com",
      "cellPhone": "7777777",
      "firstName": "User",
      "lastName": "Test",
      "role": "Administrador",
      "rol": "Administrador"
    }).as('getBasicInfo',);

    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/auth', [
      {
        "email": "testUser@gmail.com",
        "firstName": "User",
        "lastName": "Test",
        "cellPhone": "7777777",
        "nameRole": "Soporte",
        "id": "Sebas"
      }
    ]).as('getBasicInfo',);
    cy.visit('/vista-usuarios/Sebas');
    cy.get('#rol').click();
    cy.contains('li', 'Equipo Tecnico').click();
    cy.get('button[type="input"][label="Guardar Cambios"]').click({ force: true });
    cy.get('.MuiListItemText-primary').contains('Soporte').click()
    cy.get('ul.MuiList-root')
      .contains('User Test')
      .should('be.visible');
  });

  it('Verificar happy path (sin cambiar nada)', () => {
    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/auth/Sebas', {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', 'https://ncv-api-staging.azurewebsites.net/api/auth/Sebas', {
      "email": "testUser@gmail.com",
      "cellPhone": "7777777",
      "firstName": "User",
      "lastName": "Test",
      "role": "Administrador",
      "rol": "Administrador"
    }).as('getBasicInfo',);

    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/auth', [
      {
        "email": "testUser@gmail.com",
        "firstName": "User",
        "lastName": "Test",
        "cellPhone": "7777777",
        "nameRole": "Administrador",
        "id": "Sebas"
      }
    ]).as('getBasicInfo',);
    cy.visit('/vista-usuarios/Sebas');
    cy.get('button[type="input"][label="Guardar Cambios"]').click({ force: true });
    cy.get('.MuiListItemText-primary').contains('Administrador').click()
    cy.get('ul.MuiList-root')
      .contains('User Test')
      .should('be.visible');
  });

  it('Verificar error campos vacios', () => {
    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/auth/Sebas', {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', 'https://ncv-api-staging.azurewebsites.net/api/Sebas', {
      "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
      "title": "One or more validation errors occurred.",
      "status": 400,
      "traceId": "00-f6c73416d294ae9e9159f6e0b69768e8-27022178a7dc3d7f-00",
      "errors": {
        "Email": [
          "The Email field is not a valid e-mail address."
        ],
        "CellPhone": [
          "The CellPhone field is not a valid phone number."
        ]
      }
    }).as('getBasicInfo',);
    cy.visit('/vista-usuarios/Sebas');
    cy.get('#cellPhone').clear()
    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#email').clear()
    cy.get('button[type="input"][label="Guardar Cambios"]').click();
    cy.get('.MuiAlert-message').should('have.text', 'Todos los campos son requeridosEl nombre es requerido!El apellido es requerido!El celular es requerido!El correo es requerido!');
  });
});

