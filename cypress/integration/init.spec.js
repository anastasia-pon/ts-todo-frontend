// init.spec.js created with Cypress

describe('Cypress', () => {   
  it('is working', () => {     
      expect(true).to.equal(true)   
  }) 
  
  it('opens the app', () => {   
      cy.visit('http://localhost:3000') 
  })
})

describe('Login', () => {   
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })
  it('it has a signin form', () => {
    cy.get('form').should('have.class', 'signin')
 })
})

describe('List', () => {

  beforeEach(() => {
      cy.visit('http://localhost:3000/list/dadd52f3-af0c-4425-9b52-53ce76245703')
  })

  // 1. We have an HTML element of type form with a class 'addtask'.
  it('it has a addtask form', () => {
     cy.get('form').should('have.class', 'addtask')
  })

  // 2. The form has a "title" input element with a "Add a title" placeholder.
  it('has a title input field with placeholder', () => {
      cy.get('form').find('input#title').should('have.attr', 'placeholder', 'Add a title')
  })

  // 3. The form has a "cost" input element with a "Add a cost" placeholder.
  it('has a cost input field with placeholder', () => {
      cy.get('form').find('input#cost').should('have.attr', 'placeholder', 'Add a cost')
  })

  // 4. The form accepts "title" input.
  it('accepts title input', () => {
      const input = "Google shops"
      cy.get('#title')
          .type(input)
          .should('have.value', input)
  })

  // 5. The form accepts "cost" input.
  it('accepts country input', () => {
      const input = "123"
      cy.get('#cost')
          .type(input)
          .should('have.value', input)
  })

  // 6. We have a "Add a Task" button
  it("it has a 'Add a Task' button", () => {
      cy.get('form').find('button').should('have.text', 'Add a Task')
  })

  // 7. When the button is clicked, a task is added to the list
  it("A task is added to the list", () => {
    const input = "Google shops"
      cy.get('#title')
          .type(input)
    cy.get('form').find('button').click()
    cy.get('article').find('.title').should('have.text', input)
  })

  // 7. When the Delete is clicked, a task is deleted
  it("A task is deleted from the list", () => {
    cy.get('article').find('button.btn--delete').click()
    cy.get('article').find('.title').contains('Google shops').should('not.exist');
  })
})