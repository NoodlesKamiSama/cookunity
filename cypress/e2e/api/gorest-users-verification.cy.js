/**
 * GoRest API Users Verification Test
 * 
 * This test verifies the GoRest API functionality for user operations:
 * - Get list of users
 * - Find active users
 * - Get details of first active user
 * - Verify user status and response codes
 */

describe('GoRest API - Users Verification', () => {
  
  // Test configuration
  const apiConfig = {
    baseUrl: Cypress.env('gorestApiUrl'),
    token: Cypress.env('gorestToken')
  }

  beforeEach(() => {
    cy.log('Starting GoRest API Users Verification Test')
    
    // Verify API configuration
    expect(apiConfig.baseUrl, 'API base URL should be configured').to.not.be.undefined
    expect(apiConfig.token, 'API token should be configured').to.not.be.undefined
  })

  it('should get users list, find active user, and verify user details', () => {
    let firstActiveUser = null
    
    // Step 1: Get list of users
    cy.log('Step 1: Getting list of users from GoRest API')
    
    cy.getUsers().then((response) => {
      // Verify response structure and status
      expect(response.status, 'Users list request should return 200').to.equal(200)
      expect(response.body, 'Response should have body').to.exist
      expect(response.body.data, 'Response should contain data array').to.be.an('array')
      
      const users = response.body.data
      cy.log(`Retrieved ${users.length} users from API`)
      
      // Verify we have users in the response
      expect(users.length, 'Should have at least one user').to.be.greaterThan(0)
      
      // Step 2: Find active users from the list
      cy.log('Step 2: Finding active users from the list')
      
      const activeUsers = users.filter(user => user.status === 'active')
      cy.log(`Found ${activeUsers.length} active users`)
      
      // Verify we have at least one active user
      expect(activeUsers.length, 'Should have at least one active user').to.be.greaterThan(0)
      
      // Get the first active user
      firstActiveUser = activeUsers[0]
      cy.log(`First active user ID: ${firstActiveUser.id}, Name: ${firstActiveUser.name}`)
      
      // Step 3: Get details of the first active user
      cy.log('Step 3: Getting details of the first active user')
      
      return cy.getUserById(firstActiveUser.id)
    }).then((userDetailsResponse) => {
      // Primary Assertions
      cy.log('Performing primary assertions on user details')
      
      // Assert status code is 200
      expect(userDetailsResponse.status, 'User details request should return status code 200').to.equal(200)
      
      // Assert response body exists and has correct structure
      expect(userDetailsResponse.body, 'User details response should have body').to.exist
      expect(userDetailsResponse.body.data, 'User details should contain data object').to.exist
      
      const userDetails = userDetailsResponse.body.data
      
      // Assert user status is 'active'
      expect(userDetails.status, 'User status should be "active"').to.equal('active')
      
      // Additional verification - user details should match
      expect(userDetails.id, 'User ID should match the requested user').to.equal(firstActiveUser.id)
      expect(userDetails.name, 'User name should exist').to.be.a('string').and.not.be.empty
      expect(userDetails.email, 'User email should exist').to.be.a('string').and.not.be.empty
      expect(userDetails.gender, 'User gender should exist').to.be.a('string').and.not.be.empty
      
      // Log successful verification
      cy.log('✅ User verification completed successfully')
      cy.log(`✅ Status Code: ${userDetailsResponse.status}`)
      cy.log(`✅ User Status: ${userDetails.status}`)
      cy.log(`✅ User Details: ID=${userDetails.id}, Name="${userDetails.name}", Email="${userDetails.email}"`)
    })
  })

  // Additional test to verify API error handling
  it('should handle invalid user ID gracefully', () => {
    cy.log('Testing API error handling with invalid user ID')
    
    const invalidUserId = 999999999 // Very high ID that likely doesn't exist
    
    cy.getUserById(invalidUserId).then((response) => {
      // Should return 404 for non-existent user
      expect(response.status, 'Invalid user ID should return 404').to.equal(404)
      
      cy.log('✅ Error handling test completed')
    })
  })

  // Test to verify API response structure
  it('should verify API response structure and data types', () => {
    cy.log('Verifying API response structure and data types')
    
    cy.getUsers().then((response) => {
      expect(response.status).to.equal(200)
      
      const responseBody = response.body
      
      // Verify top-level structure
      expect(responseBody).to.have.property('data')
      expect(responseBody).to.have.property('meta')
      expect(responseBody.data).to.be.an('array')
      
      // Verify user object structure
      if (responseBody.data.length > 0) {
        const user = responseBody.data[0]
        
        expect(user).to.have.property('id').that.is.a('number')
        expect(user).to.have.property('name').that.is.a('string')
        expect(user).to.have.property('email').that.is.a('string')
        expect(user).to.have.property('gender').that.is.a('string')
        expect(user).to.have.property('status').that.is.a('string')
        
        // Verify status is valid
        expect(['active', 'inactive']).to.include(user.status)
        
        // Verify gender is valid
        expect(['male', 'female']).to.include(user.gender)
      }
      
      cy.log('✅ API structure verification completed')
    })
  })

  afterEach(() => {
    cy.log('Cleaning up after API test')
    
    // Log any additional debugging information if needed
    cy.task('log', 'GoRest API Users Verification test completed')
  })
}) 