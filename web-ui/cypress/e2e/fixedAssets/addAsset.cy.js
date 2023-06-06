// sessionStorage.setItem('Access', "CompleteAccess")
// describe('Crear las pruebas de extremo a extremo de Activos Fijos', () => {
//   const dato = {
//     name: "Libro",
//     assetTypeAssetCategoryCategory: "JUGUETES",
//     assetTypeType: "COLUMPIO",
//     price: 12,
//     programHouseAcronym: "CRH",
//     assetStateState: "BUENO",
//     assetResponsibleName: "Juan Chaves",
//     location: "Pacata",
//     code: "Code-1"
//   }
//   const pathFormActivoFijo = 'https://ncv-stagging.web.app/crear-activo-fijo'
//   const urlGETactivoFijo = 'https://ncv-api.azurewebsites.net/api/fixedAssets'
//   const urlPOSTactivoFijo = 'https://ncv-api.azurewebsites.net/api/fixedAssets/'
//   it('Verificar happy path y codigo de estado', () => {
//     cy.intercept('GET', urlGETactivoFijo, {
//       fixture: 'fixedAssets/anAsset.json'
//     }).as('fixedAssets');
//     cy.intercept('POST', urlPOSTactivoFijo, {
//       "id": 100,
//       "code": "Code-1",
//       "name": "Libro",
//       "price": 12,
//       "location": "Pacata",
//       "programHouseId": 100,
//       "assetTypeAssetCategoryId": 100,
//       "assetTypeAssetCategoryCategory": "JUGUETES",
//       "programHouseName": "CASA ",
//       "programHouseAcronym": "CRH",
//       "assetStateId": 100,
//       "assetStateState": "BUENO",
//       "assetTypeId": 100,
//       "assetTypeType": "COLUMPIO",
//       "assetResponsibleId": 100,
//       "assetResponsibleName": "Juan Chaves",
//       "deleted": false
//     }).as('fixedAssets');
//     cy.visit(pathFormActivoFijo);
//     cy.get('#Name').type(dato.name, {force: true})
//     cy.get('#category-drop').click({force: true})
//     cy.get("li[role='option']").each(function ($ele) {
//       if ($ele.text() === dato.assetTypeAssetCategoryCategory) {
//         $ele.wrap($ele).click()
//       }
//     })
//     // eslint-disable-next-line cypress/no-unnecessary-waiting
//     cy.wait(2000)
//     cy.get('#type-drop').click({force: true})
//     cy.get("li[role='option']").each(function ($ele) {
//       if ($ele.text() === dato.assetTypeType) {
//         $ele.wrap($ele).click()
//       }
//     })
//     cy.get('#Price').type(dato.price, {force: true})
//     cy.get('#programa-drop').click({force: true})
//     cy.get("li[role='option']").each(function ($ele) {
//       if ($ele.text() === dato.programHouseAcronym) {
//         $ele.wrap($ele).click()
//       }
//     })
//     cy.get('#estado-drop').click({force: true})
//     cy.get("li[role='option']").each(function ($ele) {
//       if ($ele.text() === dato.assetStateState) {
//         $ele.wrap($ele).click()
//       }
//     })
//     cy.get('#responsable-drop').click({force: true})
//     cy.get("li[role='option']").each(function ($ele) {
//       if ($ele.text() === dato.assetResponsibleName) {
//         $ele.wrap($ele).click()
//       }
//     })
//     cy.get('#Location').type(dato.location, {force: true})
//     cy.get('#Code').type(dato.code, {force: true})
//     cy.get('#submit_button').click()
//     cy.wait('@fixedAssets').its('response.statusCode').should('eq', 200);
//     //cy.wait('@fixedAssets').its('response.name').should('eq', dato.name);
//     //cy.wait('@fixedAssets').its('response.price').should('eq', dato.price);
//     //cy.wait('@fixedAssets').its('response.code').should('eq', dato.code);
//     // eslint-disable-next-line cypress/no-unnecessary-waiting
//     cy.wait(2000)
//     cy.get('.MuiAlert-message').should('have.text', 'Activo Fijo creado exitosamente');
//   });

//   it('Deberia mostrar multiples mensajes que los campos vacios son obligatorios!', () => {
//     cy.visit(pathFormActivoFijo);
//     cy.get("div[role='alert']").should('not.exist');
//     cy.get('#submit_button').click();
  
//     cy.get("div[role='alert']").should('have.length', 8);
//   });
// });