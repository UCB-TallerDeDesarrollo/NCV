/*
sessionStorage.setItem('Access', "CompleteAccess")

describe(' Editar usuarios de pruebas de extremo a extremo ', () => {
  it('Verificar happy path (cambio de Detalle)', () => {
    const newDetail = "Armario de 10 divisiones";
    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets/18', {
      fixture: 'fixedAssets/aBasicInfo.json'
    }).as('getBasicInfo',);
    cy.intercept('PUT', 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets/18', {
      "Name": newDetail,
      "category-drop": "Juguetes",
      "type-drop": "Resbaladilla",
      "Price": 34567.00,
      "programa-drop": "CRE",
      "estado-drop": "Guardado",
      "responsable-drop": "Sofia Zapata",
      "Location": "",
      "Code": "F-CRE-EQ-121"
    }).as('getBasicInfo',);

    cy.intercept('GET', 'https://ncv-api-staging.azurewebsites.net/api/fixedAssets', [
      {
        "id": 18,
        "code": "F-CRE-EQ-121",
        "name": newDetail,
        "price": 34567.00,
        "location": null,
        "programHouseId": 2,
        "assetTypeAssetCategoryId": 3,
        "assetTypeAssetCategoryCategory": "Juguetes",
        "programHouseName": "Casa Residencial",
        "programHouseAcronym": "CRE",
        "assetStateId": 6,
        "assetStateState": "Guardado",
        "assetTypeId": 11,
        "assetTypeType": "Resbaladilla",
        "assetResponsibleId": 5,
        "assetResponsibleName": "Sofia Zapata",
        "deleted": false
      }
    ]).as('getBasicInfo',);
    cy.visit('/activos-fijos/18/editar-activo-fijo');
    cy.get('#Name')
      .clear()
      .type(newDetail)
    cy.get('button[type="input"][label="Guardar"]').click();
    cy.get('ul.MuiList-root')
      .contains(newDetail)
      .should('be.visible');
  });
});
*/