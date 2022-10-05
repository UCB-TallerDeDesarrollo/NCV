describe('Show view of File Kid', () => {
    it('Verifies the fields from a single health report', () => {
      cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/1/healthreports',{
        fixture: 'kidsFiles/aHealthReport.json'
      }).as('getAHealthReport',);
  
      cy.visit('/ninos/1');

      cy.get('h5')
      .should('have.length', 14) // plus the sum of the personal information card (7)
      .and('contain', 'ABRH-')
      .and('contain', '15678234')
      .and('contain', 'Diagnostico fisico de ejemplo');

    });
    it('Verifies the fields from a EMPTY single health report', () => {
        cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/9/healthreports',{
          fixture: 'kidsFiles/aHealthReport.json'
        }).as('getAHealthReport',);
    
        cy.visit('/ninos/9');
  
        cy.get('h5')
        .should('have.length', 14) // plus the sum of the personal information card (7)
        .and('contain', '-----')
  
      });
      it('Verifies the fields basic information of a kid', () => {
        cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/1',{
          fixture: 'kidsFiles/aFileKid.json'
        }).as('getAFileKid',);
    
        cy.visit('/ninos/1');
  
        cy.get('h5')
        .should('have.length', 14) // plus the sum of the personal information card (7)
        .and('contain', 'Pato')
        .and('contain', 'Oward')
        .and('contain', '3434582')
        .and('contain', 'Av. Cualquier cosa #153')
        .and('contain', '3/3/2003')
  
      });

     
      it('Verifies NOT view of button if there IS health report', () => {
        cy.intercept('GET', 'https://ncv-api.herokuapp.com/api/kids/1/healthreports',{
          fixture: 'kidsFiles/aHealthReport.json'
        }).as('getAButton',);
    
        cy.visit('/ninos/1');
  
        cy.get('Button')
        .should('have.length', 4 ) // only the buttons of navbar (4)
      });
      
  });
  