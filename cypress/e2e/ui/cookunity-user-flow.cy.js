
describe('CookUnity User Registration Flow', () => {
  
  // Test data from configuration
  const testData = {
    userInfo: {
      email: Cypress.env('testEmail'),
      firstName: Cypress.env('testFirstName'),
      lastName: Cypress.env('testLastName'),
      password: Cypress.env('testPassword'),
      zipCode: Cypress.env('testZipCode'),
      mealPlanCount: 6
    },
  }

  it('should complete user registration flow and reach meal selection page', () => {
    cy.visitCookUnity()
    cy.enterZipCode(testData.userInfo.zipCode)
    cy.skipQuiz()
    cy.selectMealPlan(testData.userInfo.mealPlanCount)
    cy.createAccount(testData.userInfo.email, testData.userInfo.firstName, testData.userInfo.lastName, testData.userInfo.password)
    cy.verifyMealSelectionPage()
  })
}) 