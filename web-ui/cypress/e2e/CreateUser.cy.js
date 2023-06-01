sessionStorage.setItem('Access', "CompleteAccess")
const email = 'soporteNCV@gmail.com'
const password = 'Soporte123!'
const urlVisit = "https://ncv-stagging.web.app/registrarse-ncv";

describe('Create User', () => {
   it('deberia crear un Usuario Exitosamente', () => {
    

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

    cy.visit(urlVisit);

    cy.get('#firstName').type('tia');
    cy.get('#lastName').type('tia2');  
    cy.get('#cellPhone').type('77659902');
    cy.get('#email').type('tiap@gmail.com');
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
    
    cy.visit(urlVisit);

    cy.get('#firstName').type("tia").clear();
    cy.get('#lastName').type('tia2');   
    cy.get('#cellPhone').type('77659902');
    cy.get('#email').type('tiap@gmail.com');
    cy.get('#rol').click();
    cy.contains('li', 'Equipo Tecnico').click();
    cy.get('button[type="input"][label="Registrar"]').click({force: true});
    cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!El nombre es requerido!');
  });
  
  it('deberia mostrar un mensaje que el campo apellido es requerido', () => {

    cy.visit(urlVisit);

    cy.get('#firstName').type("tia");
    cy.get('#lastName').type('tia2').clear();  
    cy.get('#cellPhone').type('77659902');
    cy.get('#email').type('tiap@gmail.com');
    cy.get('#rol').click();
    cy.contains('li', 'Equipo Tecnico').click();
    cy.get('button[type="input"][label="Registrar"]').click({force: true});
    cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!El apellido es requerido!');
  });

it('deberia mostrar un mensaje que el formato del correo electronico es incorrecto', () => {
    
        cy.visit(urlVisit);
    
        cy.get('#firstName').type("tia");
        cy.get('#lastName').type('tia2');   
        cy.get('#cellPhone').type('77659902');
        cy.get('#email').type('sebas_ag97');
        cy.get('#rol').click();
        cy.contains('li', 'Equipo Tecnico').click();
        cy.get('button[type="input"][label="Registrar"]').click({force: true});
        cy.get('.MuiAlert-message').should('have.text', 'Error al crear el usuario!Formato de correo incorrecto!'); 
      });

  });