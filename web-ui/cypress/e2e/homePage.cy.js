//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Access',"ComplitAcces")

describe('Home Page end to end tests', () => {
  it('Busca los Botones en la Home Page', () => {
    cy.visit('/inicio-ncv');
    cy.get('button').should('have.class', 'btn-files').and('contain', 'Niños');
    cy.get('button')
      .should('have.class', 'btn-activosFijos')
      .and('contain', 'Activos Fijos');
  });
});
