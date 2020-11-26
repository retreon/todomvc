/// <reference types="cypress" />
describe('TodoMVC', () => {
  it('can add tasks to the task list', () => {
    cy.visit('https://retreon.github.io/todomvc/');
    cy.get('[data-test-id=new-todo-input]').type('Use Cypress{enter}');
    cy.get('[data-test-id=task-title]').should('have.text', 'Use Cypress');
  });
});
