describe('Login', () => {
    const email = 'soporteNCV@gmail.com'
    const password = 'Soporte!23'
  
     beforeEach(() => {
     cy.visit('/');
     
   });
  
   it('muestra la pagina de LogIn', () => {
         cy.contains('Ingresa con tu cuenta');
  });
  
   it('bloquea rutas protegidas', () => {
  
     cy.visit('/inicio-ncv');
  
    
    cy.url().should('include', '/');
  
   })
  
   it('Deberia iniciar sesion con la cuenta y contraseña correctos', () => {
    
    cy.clock()
    cy.get('#input-text-email').type(email);
    cy.get('#input-text-password').type(password);
  
    cy.tick(10000)
    cy.get('#input-button-login').click();
  
    cy.url().should('include', 'inicio-ncv');
  });
  
  it('Deberia mostrar un mensaje de error al intentar ingresar con la contraseña incorrecta', () => {
  cy.get('#input-text-email').type(email);
  cy.get('#input-text-password').type("1234");
  
  cy.get('#input-button-login').click();
  
  
  cy.get('#alert-bad-user').children()
  .should('contain', 'Usuario y/o contraseña no validos')
  .and('be.visible')
  })
  
  it('Deberia mostrar un mensaje de error al intentar ingresar con el email incorrecto', () => {
    cy.get('#input-text-email').type("soporte");
   cy.get('#input-text-password').type(password);
  
   cy.get('#input-button-login').click();
  
  
    cy.get('#alert-bad-user').children()
      .should('contain', 'Usuario y/o contraseña no validos')
      .and('be.visible')
   }) 
  
  });