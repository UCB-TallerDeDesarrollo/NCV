// sessionStorage.setItem('Access',"CompleteAccess")

// describe('Show kids end to end tests', () => {
//   it('Shows the list of kids', () => {
//     cy.intercept('GET', process.env.REACT_APP_BACKEND_URL + '/api/kids',{
//       fixture: 'Kids/listOfKids.json'
//     }).as('listOfKids',);

//     cy.visit('/ninos');

//     cy.get('.ListElement')
//     .and('contain', 'Pedrulas')
//     .should('have.length', 5)
//   });  
// });


