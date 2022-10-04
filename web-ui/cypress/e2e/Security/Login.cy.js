/// <reference types="cypress" />

describe('Login', () => {
  it('muestra la pagina de LogIn', () => {
    cy.visit('/');
    cy.contains('Ingresa con tu cuenta');
  });
});

const validUser = {
  email: 'soprteNCV@gmail.com',
  password: 'Soporte!23',
};

describe('Login', () => {
  it('Login succesfull for a superuser ', () => {
    cy.visit('/');

    cy.get('#input-text-email').type(validUser.email);
    cy.get('#input-text-password').type(validUser.password);
    cy.get('.btn').click();
    cy.get('.btn-files').should('be.visible');
    cy.get('.btn-activosFijos').should('be.visible');
    cy.get(':nth-child(2) > .MuiButtonBase-root').should('be.visible');
  });
});

describe('Login', () => {
  it('Login fails for a wrong email', () => {
    cy.visit('/');

    cy.get('#input-text-email').type('soporte@gmail.com');
    cy.get('#input-text-password').type(validUser.password);
    cy.get('.btn').click();
    cy.contains('Usuario y/o Contraseña no validos');
  });
});

describe('Login', () => {
  it('Login fails for a wrong password', () => {
    cy.visit('/');

    cy.get('#input-text-email').type(validUser.email);
    cy.get('#input-text-password').type('12345678');
    cy.get('.btn').click();
    cy.contains('Usuario y/o Contraseña no validos');
  });
});

// Here will be tested the login with different roles admin/tia

// Here will be "Salir" (logout test)
