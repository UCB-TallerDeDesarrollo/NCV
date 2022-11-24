/*sessionStorage.setItem('Access',"ComplitAcces")

describe('Add a Health report end to end tests', () => {
    it('Creates a health report', () => {
      cy.visit('ninos/6/crear-reporte/');
      cy.get('#bloodtype').type('O+');
      cy.get('#CIDiscapacidad').type('1234567');
      cy.get('#PsychologicalDiagnosis').type('AQSER');
      cy.get('#NeurologicalDiagnosis').type('TYUUJI');
      cy.get('#SpecialDiagnosis').type('OUBT');
  
      cy.get('#submit_button').click();
  
      cy.clock();
      cy.intercept('POST', 'https://ncv-api.herokuapp.com/api/kids/6/healthreports',{
        fixture: 'Kids/listOfKids.json',
        statusCode: 201
      }).as('anKidPost',);
      cy.wait('@anKidPost').its('response.statusCode').should('equal', 201);
    });
  });
  */