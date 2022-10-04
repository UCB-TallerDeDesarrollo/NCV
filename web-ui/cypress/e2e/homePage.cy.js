describe('Home Page end to end tests', () => {
  it('Busca los Botones en la Home Page', () => {
    cy.visit('/inicio-ncv');
    cy.get('button').should('have.class', 'btn-files').and('contain', 'Files');
    cy.get('button')
      .should('have.class', 'btn-activosFijos')
      .and('contain', 'Activos Fijos');
  });
});
