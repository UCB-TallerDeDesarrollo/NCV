sessionStorage.setItem('Access', "CompleteAccess")

describe('Crear las pruebas de extremo a extremo de Activos Fijos', () => {
  const formulario = '/crear-activo-fijo'
  const urlGETActivoFijo = 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets/37'
  const urlGetLista = 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets'
  const urlPUTActivoFijo = 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets/37'
  
  it('Verificar happy path (crear activo fijo)', () => {
    const precio = Math.floor(Math.random() * 100);

    cy.intercept('GET', urlGETActivoFijo, {
      fixture: 'fixedAssets/anAsset.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', urlPUTActivoFijo, {
      "code": "123-ABC-000",
      "name": "Silla de 3 patas",
      "price": precio,
      "location": "Cbba",
      "assetTypeAssetCategoryCategory": "Juguetes",
      "programHouseName": "Casa Residencial",
      "programHouseAcronym": "CRE",
      "assetStateState": "Nuevo",
      "assetTypeType": "Chupadera",
      "assetResponsibleName": "Andres Peredo"
    }).as('getBasicInfo',);
    cy.intercept('GET', urlGetLista, [
      {
        "id": "37",
        "code": "123-ABC-000",
        "name": "Silla de 3 patas",
        "price": precio,
        "location": "Cbba",
        "assetTypeAssetCategoryCategory": "Juguetes",
        "programHouseName": "Casa Residencial",
        "programHouseAcronym": "CRE",
        "assetStateState": "Nuevo",
        "assetTypeType": "Chupadera",
        "assetResponsibleName": "Andres Peredo"
      }
    ]).as('getBasicInfo',);

    cy.visit(formulario);
    cy.get('#Name').type('Silla de 3 patas',{force: true})
    cy.get('#category-drop').click({force: true})
    cy.get("li[role='option']").each(function ($ele) {
      if ($ele.text() === 'Juguetes') {
        $ele.wrap($ele).click()
      }
    })
    cy.get('#type-drop').click({force: true})
    cy.get("li[role='option']").each(function ($ele) {
      if ($ele.text() === 'Chupadera') {
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
      if ($ele.text() === 'Nuevo') {
        $ele.wrap($ele).click()
      }
    })
    cy.get('#responsable-drop').click({force: true})
    cy.get("li[role='option']").each(function ($ele) {
      if ($ele.text() === 'Andres Peredo') {
        $ele.wrap($ele).click()
      }
    })
    cy.get('#Location').type('Cbba',{force: true})
    cy.get('#Code').type('123-ABC-000',{force: true})

    cy.get('#submit_button').click()
    cy.clock()
    
    cy.get('button[type="input"][label="Guardar Cambios"]').click();
    cy.get('.MuiListItemText-primary').contains('Administrador').click()
    cy.get('ul.MuiList-root')
      .contains(precio)
      .should('be.visible');
  });
});