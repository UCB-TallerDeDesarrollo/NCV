//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Role',"Soporte")

describe('Show delete button and message end to end', () => {
    it('Verifies the delete button and message in kids files', () => {
      cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/42',{
        fixture: 'fixedAssets/aBasicInfo.json'
      }).as('getBasicInfo',);
  
      cy.visit('/ninos/42');
      
      cy.scrollTo('bottom');
      cy.get('#delete_button').click();
      cy.contains('¿Seguro que desea eliminar el registro?');
      cy.get('#confirm_delete_button').click();
      cy.contains('Registro Eliminado')
      cy.get('#return_button').click();
      cy.contains('Niños del centro');
    });
  });