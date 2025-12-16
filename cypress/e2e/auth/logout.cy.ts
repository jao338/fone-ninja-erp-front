describe('SPEC - cypress/e2e/auth/logout.cy.ts', () => {
  beforeEach(() => {
    cy.login(Cypress.env('CY_USER'), Cypress.env('CY_PASSWORD'));
  })

  it('test_should_authenticate', () => {
      cy.logout();
    })
});
