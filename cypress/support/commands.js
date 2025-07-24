 
//Navigate to CookUnity homepage and handle any initial popups
Cypress.Commands.add('visitCookUnity', () => {
  cy.visit('/')  
  // Handle any potential cookie banners or popups
  cy.wait(2000)
  cy.get('body').then(($body) => {
    if ($body.find('.promo-popup').length > 0) {
      cy.get('.close').click()
    }
  })
})

//Enter zip code in the location input
Cypress.Commands.add('enterZipCode', (zipCode) => {
  cy.intercept('GET', '**/api/validate-zipcode/*').as('validateZipcode')
  cy.get('[data-testid="funnel-start-form-zipcode-input"]').eq(0).should('be.visible').type(zipCode)
  cy.get('[data-testid="input-zipcode-cta"]').eq(0).should('be.visible').click()
  cy.wait('@validateZipcode', { timeout: 60000 })
})

//Skip all quiz questions
Cypress.Commands.add('skipQuiz', () => {
cy.wait(3000)   
  cy.get('[data-testid="preferences-quiz-skip-all-button"]', { timeout: 10000 }).should('be.visible').click()
  cy.get('svg.lucide.lucide-loader-circle.animate-spin', { timeout: 60000 }).should('not.exist')
})

// Select meal plan
Cypress.Commands.add('selectMealPlan', (mealCount) => {  
  cy.get(`[data-testid="plan-select-${mealCount}-toggle"]`).should('be.visible').click()
  cy.get('[data-testid="plan-select-continue-button"]').should('be.visible').click()
})

 //Fill account creation form
 Cypress.Commands.add('createAccount', () => {
    cy.origin('https://auth.cookunity.com', () => {
        
        // Handle cross-origin exceptions
        cy.on('uncaught:exception', (err) => {
        // Ignore null errors and auth-related exceptions
        if (err === null || 
            err.message === null ||
            err.message === 'null' ||
            err.message.includes('auth') ||
            err.message.includes('login') ||
            err.message.includes('Script error')) {
            return false
        }
        return true
        })

        // Generate unique email each time
        function generateEmail() {
          return `qa.mail${Date.now()}@gmail.com`
        }
        const userEmail = generateEmail()
        const userPassword = Cypress.env('testPassword')
        
        //Click on Login with email
        cy.wait(3000)
        cy.get('button').contains('Sign up with email').click()

        //Fill email & password
        cy.get('[data-testid="email"]').should('be.visible').type(userEmail)
        cy.get('button').contains('Sign Up').click()
        cy.get('[data-testid="password"]').should('be.visible').type(userPassword)
        cy.get('[data-testid="submit-form"]').should('be.visible').click()
    })        
})

//Verify meal selection page
Cypress.Commands.add('verifyMealSelectionPage', () => {
    cy.wait(3000)
    cy.url().should('include', 'en/meal-select')
    cy.get('.shadow-meal-card').should('be.visible').should('have.length.greaterThan', 1)
})


// API Commands
/**
 * Make API request to GoRest
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {Object} body - Request body (optional)
 * @param {Object} headers - Additional headers (optional)
 */
Cypress.Commands.add('apiRequest', (method, endpoint, body = null, headers = {}) => {
  const baseUrl = Cypress.env('gorestApiUrl')
  const token = Cypress.env('gorestToken')
  
  const defaultHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...headers
  }
  
  const requestOptions = {
    method,
    url: `${baseUrl}${endpoint}`,
    headers: defaultHeaders,
    failOnStatusCode: false // Don't fail on non-2xx status codes
  }
  
  if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
    requestOptions.body = body
  }
  
  return cy.request(requestOptions)
})

//Get list of users from GoRest API
Cypress.Commands.add('getUsers', () => {
  return cy.apiRequest('GET', '/users')
})

//Get user details by ID
Cypress.Commands.add('getUserById', (userId) => {
  return cy.apiRequest('GET', `/users/${userId}`)
})

/**
 * Update user information
 * @param {number} userId - User ID
 * @param {Object} userData - User data to update
 */
Cypress.Commands.add('updateUser', (userId, userData) => {
  return cy.apiRequest('PATCH', `/users/${userId}`, userData)
})

/**
 * Find first active user from users list
 * @param {Array} users - Array of users
 * @returns {Object} First active user
 */
Cypress.Commands.add('findFirstActiveUser', (users) => {
  return users.find(user => user.status === 'active')
})

// Utility Commands
//Generate random name for testing
Cypress.Commands.add('generateRandomName', () => {
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank']
  const surnames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson']
  
  const firstName = names[Math.floor(Math.random() * names.length)]
  const lastName = surnames[Math.floor(Math.random() * surnames.length)]
  
  return `${firstName} ${lastName}`
})

/**
 * Wait for element with better error handling
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in milliseconds
 */
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('exist').and('be.visible')
})

/**
 * Assert URL contains expected path
 * @param {string} expectedPath - Expected URL path
 */
Cypress.Commands.add('assertUrlContains', (expectedPath) => {
  cy.url().should('include', expectedPath)
})

/**
 * Count elements and assert minimum count
 * @param {string} selector - Element selector
 * @param {number} minCount - Minimum expected count
 */
Cypress.Commands.add('assertMinimumCount', (selector, minCount) => {
  cy.get(selector).should('have.length.greaterThan', minCount - 1)
}) 