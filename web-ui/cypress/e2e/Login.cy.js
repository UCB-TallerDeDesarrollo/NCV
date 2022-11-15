describe('Login', () => {
  const email = 'soprteNCV@gmail.com'
  const password = 'Soporte!23'

  beforeEach(() => {
    cy.visit('/');
    sessionStorage.setItem('Access','')
  });

  it('muestra la pagina de LogIn', () => {
    cy.contains('Ingresa con tu cuenta');
  });

  it('bloquea rutas protegidas', () => {
    // cy.pause();
    cy.visit('/inicio-ncv');
    cy.contains('Ingresa con tu cuenta');
  })

  it('Se intenta logear con la una contraseña erronea', () => {
    // cy.pause();
    cy.get('#input-text-email').type(email);
    cy.get('#input-text-password').type("1234");

    cy.get('#input-button-login').click();

    cy.clock();

    cy.get('#alert-bad-user').children()
      .should('contain', 'Usuario y/o contraseña no validos')
      .and('be.visible')
  })

  it('Se intenta logear con la un email erroneo', () => {
    // cy.pause();
    cy.get('#input-text-email').type("soporte");
    cy.get('#input-text-password').type(password);

    cy.get('#input-button-login').click();

    cy.clock();

    cy.get('#alert-bad-user').children()
      .should('contain', 'Usuario y/o contraseña no validos')
      .and('be.visible')
  })

  it('Se intenta logear con la cuenta principal de soporte', () => {
    
    cy.get('#input-text-email').type(email);
    cy.get('#input-text-password').type(password);

    cy.get('#input-button-login').click();

    cy.clock();

    cy.url().should('include', 'inicio-ncv');
  });
});
