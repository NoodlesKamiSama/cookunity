const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.cookunity.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 60000,
    video: true,
    screenshotOnRunFailure: true,
    env: {
      // Allure reporting
      allure: true,
      // API endpoints
      gorestApiUrl: 'https://gorest.co.in/public/v1',
      gorestToken: '55d6636b25b84832f383665a17f72117ee2b5e655a78ba968912c9a37d1c050f',
      // Test data
      testFirstName: 'My Name',
      testLastName: 'My Lastname',
      testPassword: '123123123',
      testZipCode: '10001'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config)
      
      // Task for API requests with better error handling
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      
      return config
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    experimentalOriginDependencies: true
  }
}) 