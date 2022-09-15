describe('Show assets end to end tests', () => {
    it('Muestra la lista de los activos fijos', () => {
      cy.visit('/activos-fijos');

      cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/fixedAssets').as('ListaActivosFijos');
      cy.wait('@ListaActivosFijos').its('response.statusCode').should('equal',200)
    });
  });
  