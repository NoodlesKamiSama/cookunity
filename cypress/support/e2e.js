// Import commands.js using ES2015 syntax:
import './commands'
import '@shelex/cypress-allure-plugin';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration and setup
beforeEach(() => {
    cy.clearCookies()
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
})


// Global exception handling
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific common exceptions that don't affect functionality
    if (err === null || !err || !err.message) {
        return false
    }
    
    if (err.message === 'null' ||
        err.message.includes('ResizeObserver loop limit exceeded') ||
        err.message.includes('Non-Error promise rejection captured') ||
        err.message.includes('Script error') ||
        err.message.includes('ChunkLoadError') ||
        err.message.includes('Loading chunk') ||
        err.message.includes('auth.cookunity.com') ||
        err.message.includes('cross-origin')) {
        return false
    }
    
    // For CookUnity specific errors, add patterns here:
    // if (err.message.includes('your-specific-error-text')) {
    //     return false
    // }
    
    // Let other errors fail the test to catch real issues
    return true
})

// Custom assertion messages
chai.use((chai, utils) => {
  utils.addMethod(chai.Assertion.prototype, 'containUrl', function (expectedUrl) {
    const actualUrl = this._obj
    this.assert(
      actualUrl.includes(expectedUrl),
      `Expected URL to contain "${expectedUrl}" but got "${actualUrl}"`,
      `Expected URL not to contain "${expectedUrl}" but got "${actualUrl}"`,
      expectedUrl,
      actualUrl
    )
  })
}) 