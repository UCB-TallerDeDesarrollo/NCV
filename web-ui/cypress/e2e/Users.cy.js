// describe('Home Page end to end tests', () => {
    
//   beforeEach(() => {
//     const email = 'soprteNCV@gmail.com'
//     const password = 'Soporte!23'

//     sessionStorage.setItem('Access','');
//     cy.login(email, password);

//     cy.get('.btn-users').click();
//     cy.url().should('include', 'vista-usuarios');
//   });

//   it('Se muestran la vista de usuarios', () => {
//     cy.get('#btn-register-user').should('contain', 'Registrar Usuario');

//     cy.get('ul').should('to.exist');
//   });

//   it('Se redirije a la vista de registro de usuario', () => {
//     cy.get('#btn-register-user').click({force: true});

//     cy.url().should('include', 'registrarse-ncv');
//   });
// });