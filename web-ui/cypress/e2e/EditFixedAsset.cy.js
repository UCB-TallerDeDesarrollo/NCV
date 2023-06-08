sessionStorage.setItem('Access', "CompleteAccess");

const urlVisit = 'https://ncv-stagging.web.app/activos-fijos/8100000/editar-activo-fijo';
const urlAsset = 'https://ncv-api.azurewebsites.net/api/fixedAssets/8100000';
const urlPUTUsuario = 'https://ncv-api.azurewebsites.net/api/fixedAssets/8100000';

describe('Edit fixed asset', () => {
  beforeEach(() => {
    cy.intercept('GET', urlAsset, {
      // Respuesta de la solicitud GET para obtener el activo fijo
      "id": 8100000,
      "code": "DASDASD",
      "name": "Mesa de Comer",
      "price": 1200.00,
      "location": "Pacata",
      "programHouseId": 1,
      "assetTypeAssetCategoryId": 2,
      "assetTypeAssetCategoryCategory": "Muebles",
      "programHouseName": "CASA",
      "programHouseAcronym": "CRH",
      "assetStateId": 1,
      "assetStateState": "BUENO",
      "assetTypeId": 6,
      "assetTypeType": "Mesa",
      "assetResponsibleId": 1,
      "assetResponsibleName": "Juan Chaves",
      "deleted": false
    }).as('getBasicInfo');
    cy.visit(urlVisit);
    sessionStorage.setItem('Access', 'CompleteAccess');
  });

  it('Verificar happy path editar inputs', () => {
    cy.intercept('GET', urlAsset, {
      // Respuesta de la solicitud GET para obtener el activo fijo
      "id": 8100000,
      "code": "DASDASD",
      "name": "Mesa de Comer",
      "price": 1200.00,
      "location": "Pacata",
      "programHouseId": 1,
      "assetTypeAssetCategoryId": 2,
      "assetTypeAssetCategoryCategory": "Muebles",
      "programHouseName": "CASA",
      "programHouseAcronym": "CRH",
      "assetStateId": 1,
      "assetStateState": "BUENO",
      "assetTypeId": 6,
      "assetTypeType": "Mesa",
      "assetResponsibleId": 1,
      "assetResponsibleName": "Juan Chaves",
      "deleted": false
    }).as('getBasicInfo');

    cy.intercept('PUT', urlPUTUsuario, {
      // Respuesta de la solicitud PUT para actualizar el activo fijo
      "id": 8100000,
      "code": "c12dawd",
      "name": "Mesa de cenar",
      "price": 14000,
      "location": "Quillacollo",
      "programHouseId": 1,
      "assetTypeAssetCategoryId": 2,
      "assetTypeAssetCategoryCategory": "Muebles",
      "programHouseName": "CASA",
      "programHouseAcronym": "CRH",
      "assetStateId": 1,
      "assetStateState": "BUENO",
      "assetTypeId": 6,
      "assetTypeType": "Mesa",
      "assetResponsibleId": 1,
      "assetResponsibleName": "Juan Chaves",
      "deleted": false
    }).as('putAsset');

    cy.get('#Name').clear({ force: true }).type('Mesa de cenar');
    cy.get('#Price').clear({ force: true }).type('14000');
    cy.get('#Location').clear({ force: true }).type('Quillacollo');
    cy.get('#Code').clear({ force: true }).type('c12dawd');
    cy.contains('button', 'Guardar').click();

    // Verificar el mensaje de activo fijo actualizado correctamente
    cy.get('.MuiAlert-message')
      .contains('Activo Fijo actualizado exitosamente')
      .should('be.visible');
  });

  beforeEach(() => {
    cy.visit(urlVisit);
    sessionStorage.setItem('Access', 'CompleteAccess');
  });

  it('Verificar happy path editar opciones desplegables', () => {
    cy.intercept('GET', urlAsset, {
      // Respuesta de la solicitud GET para obtener el activo fijo
      "id": 8100000,
      "code": "DASDASD",
      "name": "Mesa de Comer",
      "price": 1200.00,
      "location": "Pacata",
      "programHouseId": 1,
      "assetTypeAssetCategoryId": 2,
      "assetTypeAssetCategoryCategory": "Muebles",
      "programHouseName": "CASA",
      "programHouseAcronym": "CRH",
      "assetStateId": 1,
      "assetStateState": "BUENO",
      "assetTypeId": 6,
      "assetTypeType": "Mesa",
      "assetResponsibleId": 1,
      "assetResponsibleName": "Juan Chaves",
      "deleted": false
    }).as('getBasicInfo');

    cy.intercept('PUT', urlPUTUsuario, {
      // Respuesta de la solicitud PUT para actualizar el activo fijo
      "id": 8100000,
      "code": "c12dawd",
      "name": "Mesa de cenar",
      "price": 14000,
      "location": "Quillacollo",
      "programHouseId": 1,
      "assetTypeAssetCategoryId": 2,
      "assetTypeAssetCategoryCategory": "Maquinaria y Equipos",
      "programHouseName": "CASA",
      "programHouseAcronym": "CRH",
      "assetStateId": 1,
      "assetStateState": "USADO",
      "assetTypeId": 6,
      "assetTypeType": "Mesa",
      "assetResponsibleId": 1,
      "assetResponsibleName": "Cypher",
      "deleted": false
    }).as('putAsset');

    cy.get('#category-drop').should('be.visible', { timeout: 1000 }).click({force: true});
    cy.contains('li', 'Maquinaria y Equipos').click({force: true});
    cy.get('#type-drop').should('be.visible', { timeout: 1000 }).click({force: true});
    cy.contains('li', 'Prueba').click({force: true});
    cy.get('#estado-drop').should('be.visible', { timeout: 1000 }).click({force: true});
    cy.contains('li', 'USADO').click({force: true});
    cy.get('#responsable-drop').should('be.visible', { timeout: 1000 }).click({force: true});
    cy.contains('li', 'Cypher').click({force: true});
    

    cy.contains('button', 'Guardar').click();

    // Verificar el mensaje de activo fijo actualizado correctamente
    cy.get('.MuiAlert-message')
      .contains('Activo Fijo actualizado exitosamente')
      .should('be.visible');
  });

  it('Verificar error dejar campos vacios', () => {
    cy.intercept('GET', urlAsset, {
      // Respuesta de la solicitud GET para obtener el activo fijo
      "id": 8100000,
      "code": "DASDASD",
      "name": "Mesa de Comer",
      "price": 1200.00,
      "location": "Pacata",
      "programHouseId": 1,
      "assetTypeAssetCategoryId": 2,
      "assetTypeAssetCategoryCategory": "Muebles",
      "programHouseName": "CASA",
      "programHouseAcronym": "CRH",
      "assetStateId": 1,
      "assetStateState": "BUENO",
      "assetTypeId": 6,
      "assetTypeType": "Mesa",
      "assetResponsibleId": 1,
      "assetResponsibleName": "Juan Chaves",
      "deleted": false
    }).as('getBasicInfo');

    cy.get('#Name').clear({ force: true });
    cy.get('#Price').clear({ force: true });
    cy.get('#Location').clear({ force: true });
    cy.get('#Code').clear({ force: true });

    cy.contains('button', 'Guardar').click();

    // Verificar mensajes de error ausentes
    cy.contains('.MuiAlert-message', 'El Detalle del Activo Fijo es requerido!').should('be.visible');
    cy.contains('.MuiAlert-message', 'El Valor del Activo Fijo debe ser ingresado en formato decimal!').should('be.visible');
    cy.contains('.MuiAlert-message', 'El Código del Activo Fijo es requerido!').should('be.visible');
  });
});