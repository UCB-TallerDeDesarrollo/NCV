sessionStorage.setItem('Access', "CompleteAccess")
//test2e2
describe('Edit users end to end tests', () => {
  const urlVisit = 'https://ncv-stagging.web.app/vista-usuarios/sebas'
  const urlGETUsuario = 'https://ncv-api.azurewebsites.net/api/auth/sebas'
  const urlGHetAuth = 'https://ncv-api.azurewebsites.net/api/auth'
  const urlPUTUsuario = 'https://ncv-api.azurewebsites.net/api/auth/sebas'
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
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
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
    }).as('getBasicInfo');
    cy.intercept('PUT', urlPUTUsuario, {
      "email": "testUser@gmail.com",
      "cellPhone": "7777777",
      "firstName": "User",
      "lastName": "Test",
      "role": "Administrador",
      "rol": "Administrador"
    }).as('getBasicInfo');
  
    cy.intercept('GET', urlGHetAuth, [
      {
        "email": "testUser@gmail.com",
        "firstName": "User",
        "lastName": "Test",
        "cellPhone": "7777777",
        "nameRole": "Administrador",
        "id": "Sebas"
      }
    ]).as('getBasicInfo');
  
    cy.visit(urlVisit);
    
    // Esperar a que los datos se carguen antes de hacer clic en el botón
    cy.wait('@getBasicInfo');
  
    cy.get('button[type="input"][label="Guardar Cambios"]').click();
  
    cy.get('.MuiListItemText-primary').contains('Administrador').click();
  
    cy.get('ul.MuiList-root')
      .contains('User Test')
      .should('be.visible');
  });
  

  it('Verificar error campos vacios', () => {
    cy.intercept('GET', urlGETUsuario, {
      fixture: 'Users/testUser.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', 'https://ncv-api-staging.azurewebsites.net/api/sebas', {
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