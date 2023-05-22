sessionStorage.setItem('Access', "CompleteAccess")

describe('Edit users end to end tests', () => {
  const urlVisit = '/vista-usuarios/0ea593a1-53a5-4850-8bb8-7ba34dc1d712'
  const urlGETUsuario = 'https://ncv-api-staging.azurewebsites.net/api/auth/0ea593a1-53a5-4850-8bb8-7ba34dc1d712'
  const urlGHetAuth = 'https://ncv-api-staging.azurewebsites.net/api/auth'
  const urlPUTUsuario = 'https://ncv-api-staging.azurewebsites.net/api/auth/0ea593a1-53a5-4850-8bb8-7ba34dc1d712'
  it('Verificar happy path (cambio de numero)', () => {
    const randomNumber = Math.floor(Math.random() * 100);

    cy.intercept('GET', urlGETUsuario, {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', urlPUTUsuario, {
      "email": "testUser@gmail.com",
      "cellPhone": randomNumber,
      "firstName": "User",
      "lastName": "Test",
      "role": "Administrador",
      "rol": "Administrador"
    }).as('getBasicInfo',);

    cy.intercept('GET', urlGHetAuth, [
      {
        "email": "testUser@gmail.com",
        "firstName": "User",
        "lastName": "Test",
        "cellPhone": randomNumber,
        "nameRole": "Administrador",
        "id": "Sebas"
      }
    ]).as('getBasicInfo',);
    cy.visit(urlVisit);
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
    cy.intercept('GET', urlGETUsuario, {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', urlPUTUsuario, {
      "email": "testUser@gmail.com",
      "cellPhone": "7777777",
      "firstName": "User",
      "lastName": "Test",
      "role": "Administrador",
      "rol": "Administrador"
    }).as('getBasicInfo',);

    cy.intercept('GET', urlGHetAuth, [
      {
        "email": "testUser@gmail.com",
        "firstName": "User",
        "lastName": "Test",
        "cellPhone": "7777777",
        "nameRole": "Soporte",
        "id": "Sebas"
      }
    ]).as('getBasicInfo',);
    cy.visit(urlVisit);
    cy.get('#rol').click();
    cy.contains('li', 'Equipo Tecnico').click();
    cy.get('button[type="input"][label="Guardar Cambios"]').click({ force: true });
    cy.get('.MuiListItemText-primary').contains('Soporte').click()
    cy.get('ul.MuiList-root')
      .contains('User Test')
      .should('be.visible');
  });

  it('Verificar happy path (sin cambiar nada)', () => {
    cy.intercept('GET', urlGETUsuario, {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', urlPUTUsuario, {
      "email": "testUser@gmail.com",
      "cellPhone": "7777777",
      "firstName": "User",
      "lastName": "Test",
      "role": "Administrador",
      "rol": "Administrador"
    }).as('getBasicInfo',);

    cy.intercept('GET', urlGHetAuth, [
      {
        "email": "testUser@gmail.com",
        "firstName": "User",
        "lastName": "Test",
        "cellPhone": "7777777",
        "nameRole": "Administrador",
        "id": "Sebas"
      }
    ]).as('getBasicInfo',);
    cy.visit(urlVisit);
    cy.get('button[type="input"][label="Guardar Cambios"]').click({ force: true });
    cy.get('.MuiListItemText-primary').contains('Administrador').click()
    cy.get('ul.MuiList-root')
      .contains('User Test')
      .should('be.visible');
  });

  it('Verificar error campos vacios', () => {
    cy.intercept('GET', urlGETUsuario, {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', 'https://ncv-api-staging.azurewebsites.net/api/0ea593a1-53a5-4850-8bb8-7ba34dc1d712', {
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
    cy.visit(urlVisit);
    cy.get('#cellPhone').clear()
    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#email').clear()
    cy.get('button[type="input"][label="Guardar Cambios"]').click();
    cy.get('.MuiAlert-message').should('have.text', 'Todos los campos son requeridosEl nombre es requerido!El apellido es requerido!El celular es requerido!El correo es requerido!');
  });
});
