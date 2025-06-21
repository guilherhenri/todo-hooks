describe('Edit a task', () => {
  it('should be able to edit a task description', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[name=description]').type('Task test')
    cy.get('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Alta']").click()
    cy.get('button[aria-describedby=submit-button-hint]').click()

    cy.get("button[aria-label='Editar tarefa'").click()

    cy.get('[role=dialog]')
      .find('input[name=description]')
      .type('Task test updated')
    cy.get('[role=dialog]')
      .find('button[aria-describedby=submit-button-hint]')
      .click()

    cy.get('p').contains('Task test updated').should('exist')
  })

  it('should be able to edit a task priority', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[name=description]').type('Task test')
    cy.get('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Alta']").click()
    cy.get('button[aria-describedby=submit-button-hint]').click()

    cy.get("button[aria-label='Editar tarefa'").click()

    cy.get('[role=dialog]').find('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Normal']").click()
    cy.get('[role=dialog]')
      .find('button[aria-describedby=submit-button-hint]')
      .click()

    cy.get('[role=listitem]').find('p').contains('Task test').should('exist')
    cy.get('[role=listitem]').find('span').contains('Normal').should('exist')
  })

  it('should not be able to submit invalid values', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[name=description]').type('Task test')
    cy.get('button[role=combobox]').click()
    cy.get("[role=option][aria-label='Alta']").click()
    cy.get('button[aria-describedby=submit-button-hint]').click()

    cy.get("button[aria-label='Editar tarefa'").click()

    cy.get('[role=dialog]').find('input[name=description]').clear()

    cy.get('[role=dialog]')
      .find('button[aria-describedby=submit-button-hint]')
      .should('be.disabled')
  })
})
