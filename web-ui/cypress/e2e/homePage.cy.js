describe('Home Page end to end tests', () => {

  beforeEach(() => {
    const email = 'soprteNCV@gmail.com'
    const password = 'Soporte!23'
    
    sessionStorage.setItem('Access','');
    cy.login(email, password)
  });

  it('Busca los Botones en la Home Page', () => {
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

  it('Confirmar el acceso a la vista de usuarios', () => {
    cy.get('.btn-users').click();
    cy.url().should('include', 'vista-usuarios');
  });

  // it('Confirmar el acceso a la vista de niños', () => {
  //   cy.get('.btn-files').click();
  //   cy.url().should('include', 'ninos');
  // });

  it('Confirmar el acceso a la vista de activos fijos', () => {
    cy.get('.btn-activosFijos').click();
    cy.url().should('include', 'activos-fijos');
  });

  it('Confirmar que se puede salir de la sesion actual', () => {
    cy.get('.btn-exit').click();
    cy.url().should('include', '/');
  });
});
