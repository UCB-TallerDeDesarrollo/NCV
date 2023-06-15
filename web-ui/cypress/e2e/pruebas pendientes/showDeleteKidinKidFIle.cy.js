//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
// sessionStorage.setItem('Access',"CompleteAccess")

// describe('Show delete button proofs that doesnt exist after delete action', () => {
//     it('Verifies the delete button and that files are deleted', () => {
//       cy.intercept('GET', 'https://ncv-api-dev.azurewebsites.net/api/kids/42',{
//         fixture: 'fixedAssets/aBasicInfo.json'
//       }).as('getBasicInfo',);
//       cy.visit('/ninos/42');
//       cy.scrollTo('bottom');
//       cy.get('#delete_button').click();
//       cy.contains('¿Desea eliminar todos los datos de Elizabeth Ortega Lara?');
//       cy.get('#confirm_delete_button').click();
//       cy.visit('/ninos');
//       cy.contains('Niños del centro');
//       cy.contains('Elizabeth Ortega Lara').should('not.exist');
//     });
//   });