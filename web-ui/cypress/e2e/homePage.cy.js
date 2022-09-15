describe('Home Page end to end tests', () => {
  

    it('Busca los Botones en la Home Page', () => {
      cy.visit('/home-ncv');
      cy.get('button').should('have.class', 'btn-files').and('contain','Files');
      cy.get('button').should('have.class', 'btn-activosFijos').and('contain','Activos Fijos');
    });
  

});
/**it('no muestra ningun resultado al iniciar', () => {
    cy.visit('/');
    cy.get('#mensaje-suma').should('contain', '');
  });

  it('muestra la suma de los dos numeros', () => {
    cy.visit('/');
    cy.get('#numero1').type('3');
    cy.get('#numero2').type('2');

    cy.get('#sumar-btn').click();

    //cy.contains('5');
    cy.get('#mensaje-suma').should('contain', '5');
  }); */