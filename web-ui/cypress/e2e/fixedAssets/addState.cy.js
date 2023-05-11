/// <reference types="Cypress" />

sessionStorage.setItem('Access',"CompleteAccess")

describe(' AGREGAR PRUEBAS DE EXTREMO A EXTREMO A ESTADO ', () => {
    it(' Deberia crear un estado exitosamente! (HAPPY PATH) ', () => {
      cy.visit('/activos-fijos/estados')
      cy.get('#state').type('Semi-Nuevo',{force: true})
      cy.get('#submit_button').click()
    });

    it(' Deberia mostrar un mensaje que el campo Estado es requerido! ', () => {
        cy.visit('/activos-fijos/estados')
        cy.get('#state')
        cy.get('button[type="input"][label="Crear estado"]').click({force: true});
        cy.get('.MuiAlert-message').should('have.text', 'El Estado es requerido!');
      });

    it('Deberia mostrar un mensaje que el estado esta vinculado cuando se tiene que eliminar', () => {
        cy.visit('/activos-fijos/estados')
        cy.get("[role='button']").each(function ($ele) {
            if ($ele.index() === '47') {
              $ele.wrap($ele)
            }
          })
        cy.get("#47")
        //cy.get('button[type="input"][label="Delete"]').click({force: true});
        cy.get('#state').not('have.value', 'El estado no puede ser eliminado porque existen activos fijos asociados a el.');
    });
  });