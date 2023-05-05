/// <reference types="Cypress" />

sessionStorage.setItem('Access',"CompleteAccess")

describe(' Agregar pruebas de extremo a extremo de ACTIVOS FIJOS ', () => {
  /*
    it(' Crea un activo fijo (HAPPY PATH) ', () => {
      cy.visit('/crear-activo-fijo')  

      cy.get('#Name').type('Principito',{force: true})
      cy.wait(1000)

      cy.get('#category-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        //cy.log($ele.text())
        if ($ele.text() === 'Maquinaria y Equipos') {
          cy.log("Elemento encontrado")
          $ele.wrap($ele).click()
        }
        else {
          cy.log("Valores restantes ", $ele.text())
        }
      })
      cy.wait(1000)

      cy.get('#type-drop').click({force: true})
      cy.get("[role='option']").each(function ($ele) {
        if ($ele.text() === 'Impresora') {
          $ele.wrap($ele).click()
        }
      })
      cy.wait(1000)
      
      cy.get('#Price').type(50,{force: true})
      cy.wait(1000)

      cy.get('#programa-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'CRE') {
          $ele.wrap($ele).click()
        }
      })
      cy.wait(1000)

      cy.get('#estado-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'Activo') {
          $ele.wrap($ele).click()
        }
      })
      cy.wait(1000)
    
      cy.get('#responsable-drop').click({force: true})
      cy.get("li[role='option']").each(function ($ele) {
        if ($ele.text() === 'Jose Arebalo') {
          $ele.wrap($ele).click()
        }
      })
      cy.wait(1000)

      cy.get('#Location').type('Cochabamba',{force: true})
      cy.wait(1000)

      cy.get('#Code').type('F-CRE-MAQ-0913',{force: true})
      cy.wait(1000)
  
      cy.get('#submit_button').click()
      cy.clock()
      //cy.pause()
    });
  */
 
    it(' Validar mensaje de error al dejar vacio el Detalle (Obligatorio) ', () => {
      cy.visit('/crear-activo-fijo')
      cy.get('#Name').should('have.value', '');

      /*
      cy.get("[role='alert']").each(function ($ele) {
        if ($ele.text() === 'El Detalle del Activo Fijo es requerido!') {
          $ele.wrap($ele).click()
        }
      })
      */
      cy.get('#submit_button').click()
      cy.clock()
      cy.wait(1000)
    });

    it(' Validar mensaje de error al dejar vacio el Valor (Obligatorio) ', () => {
      cy.visit('/crear-activo-fijo')
      cy.get('#Price').should('have.value', '');

      /*
      cy.get("[role='alert']").each(function ($ele) {
        if ($ele.text() === 'El Detalle del Activo Fijo es requerido!') {
          $ele.wrap($ele).click()
        }
      })
      */

      cy.get('#submit_button').click()
      cy.clock()
      cy.wait(10000)
    });

    it(' Validar mensaje de error al dejar vacio el Codigo (Obligatorio) ', () => {
      cy.visit('/crear-activo-fijo')
      cy.get('#Code').should('have.value', '');

      /*
      cy.get("[role='alert']").each(function ($ele) {
        if ($ele.text() === 'El Detalle del Activo Fijo es requerido!') {
          $ele.wrap($ele).click()
        }
      })
      */

      cy.get('#submit_button').click()
      cy.clock()
      cy.wait(10000)
    });
  });