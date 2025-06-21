describe('Do a task', () => {
  it('should be able to do a task', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[name=description]').type('Task test')
    cy.get('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Alta']").click()
    cy.get('button[aria-describedby=submit-button-hint]').click()

    cy.get('[role=listitem]').find('[role=checkbox]').click()
    cy.get('[role=listitem]')
      .find('[role=checkbox][aria-checked=true][data-state=checked]')
      .should('exist')
  })

  it('should be able to undo a task', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[name=description]').type('Task test')
    cy.get('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Alta']").click()
    cy.get('button[aria-describedby=submit-button-hint]').click()

    cy.get('[role=listitem]').find('[role=checkbox]').click()
    cy.get('[role=listitem]').find('[role=checkbox]').click()

    cy.get('[role=listitem]')
      .find('[role=checkbox][aria-checked=false][data-state=unchecked]')
      .should('exist')
  })
})
