describe('Smoke test', () => {
  it('muestra la pagina de login', () => {
    cy.visit('/')
    cy.contains('Ingresa con tu cuenta')
  })
})
