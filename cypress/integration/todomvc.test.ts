/// <reference types="cypress" />
describe('TodoMVC', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('can add tasks to the list', () => {
    cy.get('[data-test=new-task-input]').type('Use Cypress{enter}');
    cy.get('[data-test=task-title]').should('have.text', 'Use Cypress');
  });

  it('hides the toolbar when no tasks exist', () => {
    cy.get('[data-test=task-list]').should('not.exist');
    cy.get('[data-test=task-list-toolbar]').should('not.exist');
  });

  it('deletes tasks when you click the delete button', () => {
    cy.get('[data-test=new-task-input]').type('Adopt a turtle{enter}');
    cy.get('[data-test=task-delete-button]').click();
    cy.get('[data-test=task]').should('have.length', 0);
  });

  it('edits the task title when you double-click', () => {
    cy.get('[data-test=new-task-input]').type('Do something meaningful{enter}');
    cy.get('[data-test=task-title]').dblclick();
    cy.get('[data-test=edit-task-title-input]').type(
      '{selectall}Get out of bed{enter}',
    );

    cy.get('[data-test=task-title]').should('have.text', 'Get out of bed');
  });

  it('toggles task completion when you click the checkbox', () => {
    cy.get('[data-test=new-task-input]').type('Eat a burger{enter}');
    cy.get('[data-test=task-completion-checkbox]').as('checkbox');
    cy.get('@checkbox').should('have.attr', 'data-completed', 'false');
    cy.get('@checkbox').click();
    cy.get('@checkbox').should('have.attr', 'data-completed', 'true');
    cy.get('@checkbox').click();
    cy.get('@checkbox').should('have.attr', 'data-completed', 'false');
  });

  it('filters out completed tasks on the active view', () => {
    cy.get('[data-test=new-task-input]').type('Write a book{enter}');
    cy.get('[data-test=task-completion-checkbox]').click();
    cy.get('[data-test=new-task-input]').type('Start a riot{enter}');
    cy.get('[data-test=new-task-input]').type('Sail to Norway{enter}');
    cy.get('[data-test=task-filter-active]').click();
    cy.get('[data-test=task]').should('have.length', 2);
  });

  it('filters out active tasks on the completed view', () => {
    cy.get('[data-test=new-task-input]').type('Learn Klingon{enter}');
    cy.get('[data-test=task-completion-checkbox]').click();
    cy.get('[data-test=new-task-input]').type('Sing an instrumental{enter}');
    cy.get('[data-test=new-task-input]').type('War crimes{enter}');
    cy.get('[data-test=task-filter-completed]').click();
    cy.get('[data-test=task]').should('have.length', 1);
  });

  it('clears completed tasks when you click the button', () => {
    cy.get('[data-test=new-task-input]').type('Beat up cancer{enter}');
    cy.get('[data-test=task-completion-checkbox]').click();
    cy.get('[data-test=new-task-input]').type('Burgle an Emmy{enter}');
    cy.get('[data-test=clear-completed-tasks]').click();
    cy.get('[data-test=task]').should('have.length', 1);
  });

  it('can toggle completion for all tasks at once', () => {
    cy.get('[data-test=new-task-input]').type('Make a robo-double{enter}');
    cy.get('[data-test=new-task-input]').type('Invent a new color{enter}');
    cy.get('[data-test=toggle-all-tasks]').click();
    cy.get('[data-test=task-completion-checkbox]').as('checkboxes');
    cy.get('@checkboxes').should('have.attr', 'data-completed', 'true');
    cy.get('[data-test=toggle-all-tasks]').click();
    cy.get('@checkboxes').should('have.attr', 'data-completed', 'false');
  });
});
