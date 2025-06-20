describe('Delete a task', () => {
  it('should be able to delete a task', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[name=description]').type('Task test')
    cy.get('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Alta']").click()
    cy.get('button[aria-describedby=submit-button-hint]').click()

    cy.get("button[aria-label='Apagar tarefa'").click()

    cy.get('[role=listitem]').should('not.exist')
  })
})
