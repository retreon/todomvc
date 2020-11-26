/// <reference types="cypress" />
describe('TodoMVC', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can add tasks to the task list', () => {
    cy.get('[data-test=new-todo-input]').type('Use Cypress{enter}');
    cy.get('[data-test=task-title]').should('have.text', 'Use Cypress');
  });
});
