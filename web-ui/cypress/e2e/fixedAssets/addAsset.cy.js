/*
/// <reference types="Cypress" />

sessionStorage.setItem('Access',"CompleteAccess")

describe(' AGREGAR PRUEBAS DE EXTREMO A EXTREMO DE ACTIVOS FIJOS ', () => {
    it(' Crear un activo fijo (HAPPY PATH) ', () => {
      cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets', {
          fixture: 'fixedAssets/aBasicInfo.json'
      }).as('getBasicInfo-Fixture')
      cy.visit('/crear-activo-fijo')
      cy.get('#Name').type('Principito',{force: true})
      cy.get('#category-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'Material Escolar') {
          $ele.wrap($ele).click()
        }
      })
      cy.get('#type-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'Libro') {
          $ele.wrap($ele).click()
        }
      })
      cy.get('#Price').type(50,{force: true})
      cy.get('#programa-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'CRE') {
          $ele.wrap($ele).click()
        }
      })
      cy.get('#estado-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'Descompuesto') {
          $ele.wrap($ele).click()
        }
      })
      cy.get('#responsable-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'Pepito Perez') {
          $ele.wrap($ele).click()
        }
      })
      cy.get('#Location').type('Distrito X',{force: true})
      cy.get('#Code').type('F-CRE-MAQ-0913',{force: true})
      cy.get('#submit_button').click()
      cy.clock()
    });
  });
     

  describe(' VALIDAR MENSAJE DE ERROR AL DEJAR VACIO EL CAMPO OBLIGATORIO ', () => {
      it(' Deberia validar mensaje de error en Detalle, Valor y Codigo ', () => {
        cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets', {
            fixture: 'fixedAssets/aBasicInfo.json'
        }).as('getBasicInfo-Fixture')
        cy.visit('/crear-activo-fijo')
        cy.get('#Name').should('have.value', '');
        cy.get('#submit_button').click()
        cy.get('#Price').should('have.value', '');
        cy.get('#submit_button').click()
        cy.get('#Code').should('have.value', '');
        cy.get('#submit_button').click()
        cy.clock()
      });
  });
  */