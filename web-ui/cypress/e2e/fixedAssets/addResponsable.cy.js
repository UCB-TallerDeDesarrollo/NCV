/// <reference types="Cypress" />

sessionStorage.setItem('Access',"CompleteAccess")

describe(' AGREGAR PRUEBAS DE EXTREMO A EXTREMO A ESTADO ', () => {
    it(' Deberia crear un responsable exitosamente! (HAPPY PATH) ', () => {
      cy.visit('/activos-fijos/responsables')
      cy.get('#name').type('Señor X',{force: true})
      cy.get('#submit_button').click()
    });

    it(' Deberia mostrar un mensaje que el campo Responsable es requerido! ', () => {
        cy.visit('/activos-fijos/responsables')
        cy.get('#name')
        cy.get('button[type="input"][label="Crear responsable"]').click({force: true});
        cy.get('.MuiAlert-message').should('have.text', 'El Responsable es requerido!');
      });

    it('Deberia mostrar un mensaje que el responsable esta vinculado cuando se tiene que eliminar', () => {
        cy.visit('/activos-fijos/responsables')
        cy.get("[role='button']").each(function ($ele) {
            if ($ele.index() === '5') {
              $ele.wrap($ele)
            }
          })
        cy.get("#5")
        //cy.get('button[type="input"][label="Delete"]').click({force: true});
        cy.get('#name').not('have.value', 'El responsable no puede ser eliminado porque existen activos fijos asociados a el.');
    });
  });