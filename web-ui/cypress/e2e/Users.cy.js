describe('Login', () => {
    const email = 'soporteNCV@gmail.com'
    const password = 'Soporte!23'
  
     beforeEach(() => {
     cy.visit('/');
     
   });
  
  
   // Rol de Admin
// asturizaga99@gmail.com
// 9#Dc7^Ja
// Rol de Tia
// danocito.lol@gmail.com
// 8^Eg9&Hj
// Rol de Tecnico
// tecncv@gmail.com
// Tecnico!23
  
it('Deberia mostrar solo los botones a los que tiene acceso el usuario ADMINISTRADOR', () => {

  cy.get('#input-text-email').type("asturizaga99@gmail.com");
  cy.get('#input-text-password').type("9#Dc7^Ja");
    
     
  cy.get('#input-button-login').click();
      
  //cy.url().should('include', 'inicio-ncv');
  cy.visit('/inicio-ncv');

  cy.get('button')
      .should('have.class', 'btn-files')
      .and('contain', 'Niños');
  cy.get('button')
      .should('have.class', 'btn-activosFijos')
      .and('contain', 'Activos Fijos');
  cy.get('button')
      .should('have.class', 'btn-users')
      .and('contain', 'Usuarios');
  cy.get('button')
      .should('have.class', 'btn-exit')
      .and('contain', 'Salir');
});  

it('Deberia mostrar solo los botones a los que tiene acceso el usuario TIA', () => {

      cy.get('#input-text-email').type("danocito.lol@gmail.com");
      cy.get('#input-text-password').type("8^Eg9&Hj");
        
         
      cy.get('#input-button-login').click();
          
      //cy.url().should('include', 'inicio-ncv');
      cy.visit('/inicio-ncv');
  
      cy.get('button')
          .should('have.class', 'btn-files')
          .and('contain', 'Niños');

      cy.get('button')
          .should('have.class', 'btn-perfil')
          .and('contain', 'Perfil');

      cy.get('button')
          .should('have.class', 'btn-exit')
          .and('contain', 'Salir');
});    

  it('Deberia mostrar solo los botones a los que tiene acceso el usuario TECNICO', () => {

      cy.get('#input-text-email').type("sebas_ag97@hotmail.com");
      cy.get('#input-text-password').type("9#Dc7^Ja");
             
      cy.get('#input-button-login').click();
              
      //cy.url().should('include', 'inicio-ncv');
      cy.visit('/inicio-ncv');
      
      cy.get('button')
        .should('have.class', 'btn-files')
        .and('contain', 'Niños');
  
      cy.get('button')
        .should('have.class', 'btn-perfil')
        .and('contain', 'Perfil');
  
      cy.get('button')
      .should('have.class', 'btn-exit')
      .and('contain', 'Salir');
  });

  it('Deberia mostrar solo los botones a los que tiene acceso el usuario SOPORTE', () => {

      cy.get('#input-text-email').type(email);
      cy.get('#input-text-password').type(password);
             
      cy.get('#input-button-login').click();
              
      //cy.url().should('include', 'inicio-ncv');
      cy.visit('/inicio-ncv');
      
      cy.get('button')
          .should('have.class', 'btn-files')
          .and('contain', 'Niños');
      cy.get('button')
          .should('have.class', 'btn-activosFijos')
          .and('contain', 'Activos Fijos');
      cy.get('button')
          .should('have.class', 'btn-users')
          .and('contain', 'Usuarios');
      cy.get('button')
          .should('have.class', 'btn-exit')
          .and('contain', 'Salir');
  
      cy.get('button')
          .should('have.class', 'btn-perfil')
          .and('contain', 'Perfil');
  });
  
  
  
  });