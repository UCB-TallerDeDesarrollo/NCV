//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Role',"Soporte")

describe('Show delete button proofs that doesnt exist after delete action', () => {
    it('Verifies the delete button and that files are deleted', () => {
      cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/50',{
        fixture: 'fixedAssets/aBasicInfo.json'
      }).as('getBasicInfo',);
      cy.visit('/ninos/50');
      cy.scrollTo('bottom');
      cy.get('#delete_button').click();
      cy.contains('¿Seguro que desea eliminar el registro?');
      cy.get('#confirm_delete_button').click();
      cy.contains('Niños del centro');
      cy.contains('George Harrison').should('not.exist');
    });
  });