describe('Show assets end to end tests', () => {
  it('Muestra la lista de los activos fijos', () => {
    cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/fixedAssets/9',{
      fixture: 'fixedAssets/anAsset.json'
    }).as('getAnAsset',);

    cy.visit('/activos-fijos/9');

    cy.get('h4')
    .should('have.length', 5)
    .and('contain', 'Computadora de escritorio')
    .and('contain', 2424.24)
    .and('contain', '16 GB de Ram con targeta grafica NVIDIA')
    .and('contain', 3);
    
    cy.get('span')
    .and('contain', 'Computadora cypress');
  });
});
