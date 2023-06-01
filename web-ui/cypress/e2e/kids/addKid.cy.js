sessionStorage.setItem('Access', "CompleteAccess")

describe('Crear las pruebas de extremo a extremo de Ninos', () => {
  const dato = {
    firstName: "Senior",
    lastName: "X",
    ci: "12345678",
    birthDate: "2023-06-01",
    programHouse: "CRH",
    birthPlace: "Cochabamba",
    gender: "M"
  }

  const pathFormNino = 'https://ncv-stagging.web.app/registrar-nino'
  const urlGETnino = 'https://ncv-api.azurewebsites.net/api/kids'
  const urlPOSTnino = 'https://ncv-api.azurewebsites.net/api/kids/'

  it('Verificar happy path y codigo de estado', () => {

    cy.intercept('GET', urlGETnino, {
      fixture: 'Kids/anKid.json'
    }).as('kids');
    cy.intercept('POST', urlPOSTnino, {
        "id": 100,
        "firstName": "Senior",
        "lastName": "X",
        "ci": "12345678",
        "birthDate": "2023-06-01",
        "programHouse": "CRH",
        "birthPlace": "Cochabamba",
        "gender": "M"
    }).as('kids');

    cy.visit(pathFormNino );

    cy.get('#firstName').type(dato.firstName, {force: true})
    cy.get('#lastName').type(dato.lastName, {force: true})
    cy.get('#ci').type(dato.ci, {force: true})
    cy.get('#birthDate').type(dato.birthDate, {force: true})
    cy.get('#programHouse').click({force: true})
    cy.get("li[role='option']").each(function ($ele) {
      if ($ele.text() === dato.programHouse) {
        $ele.wrap($ele).click()
      }
    })
    cy.get('#birthPlace').type(dato.birthPlace, {force: true})
    cy.get('#gender').click({force: true})
    cy.get("li[role='option']").each(function ($ele) {
      if ($ele.text() === dato.gender) {
        $ele.wrap($ele).click()
      }
    })

    cy.get('button[type="input"][label="Registrar"]').click()
    cy.wait('@kids').its('response.statusCode').should('eq', 200);
    cy.get('.MuiAlert-message').should('have.text', 'Archivo de niño creado exitosamente');
  });
});