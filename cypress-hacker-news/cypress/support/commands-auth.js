/** 
 * @param {string}  user Username
 * @param {string}  pass Password
 * 
 */
Cypress.Commands.add('newLogin', (user, pass) => {
    cy.visit('/login')
    cy.get(':nth-child(4) > table > tbody > :nth-child(1) > :nth-child(2) > input')
      .type(user, { log: false })
    cy.get(':nth-child(4) > table > tbody > :nth-child(2) > :nth-child(2) > input')
      .type(pass, { log: false })
    cy.get(':nth-child(4) > [type="submit"]').click()
    cy.get('#me').contains(user)
});