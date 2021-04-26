describe('todo app', () => {
  beforeEach(() => {
    cy.visit('/list/836621a8-ed1f-4b06-8867-542cbb0e0b07');
    cy.get('h1').contains('Reminders App');
  });

  it('should display the todo list', () => {});

  it('should add a new todo to the list', () => {});

  it('should toggle a todo correctly', () => {});
});