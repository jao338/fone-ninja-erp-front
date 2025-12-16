describe('cypress/e2e/auth/login.cy.ts', () => {
  it('test_should_authenticate', () => {
    cy.login(Cypress.env('CY_USER'), Cypress.env('CY_PASSWORD'));
  });
});
