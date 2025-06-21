describe('Create new task', () => {
  it('should be able to create a new task', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[name=description]').type('Task test')
    cy.get('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Alta']").click()
    cy.get('button[aria-describedby=submit-button-hint]').click()

    cy.get('p').contains('Task test').should('exist')
    cy.get('span').contains('Alta').should('exist')
  })

  it('should not be able to submit invalid values', () => {
    cy.visit('http://localhost:5173/')

    cy.get('button[aria-describedby=submit-button-hint]').should('be.disabled')
  })
})
