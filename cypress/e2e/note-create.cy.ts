describe('Note Create Page', () => {
    beforeEach(() => {
      cy.visit('/create');
    });
  
    it('should display create note form', () => {
      cy.contains('h2', 'CREATE_NOTE');
    });
  
    it('should create a new note', () => {
      cy.intercept('POST', '/api/v1/notes').as('createNote');
  
      cy.get('input[name="name"]').type('Test Note');
      cy.get('textarea[name="description"]').type('This is a test note.');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@createNote');
  
      cy.visit('/notes');
      cy.get('.note-list ul li').should('have.length.greaterThan', 0);
      cy.get('.note-list ul li').first().find('h3').should('have.text', 'Test Note');
    });
  });
  