//Es necesario para las pruebas e2e instanciar esta variable debido que si no lo hacen se redirige a la vista por defecto que es el login
sessionStorage.setItem('Role',"Soporte")

describe('Login', () => {
  it('muestra la pagina de LogIn', () => {
    cy.visit('/');
    cy.contains('Ingresa con tu cuenta');
  });
});
