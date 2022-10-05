//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Role',"Soporte")

/*
describe('Show kids end to end tests', () => {
    it('Shows the list of kids', () => {
      cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids',{
        fixture: 'kids/listOfKids.json'
      }).as('listOfKids',);
  
      cy.visit('/ninos');
  
      cy.get('.ninos')
      .should('have.length', 6)
    });
  });
  */