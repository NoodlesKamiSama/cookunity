/**
 * GoRest API Users Update Test
 * 
 * This test verifies the GoRest API functionality for updating user information:
 * - Get list of users
 * - Get first user from the list
 * - Update user name using PATCH request
 * - Verify updated name and response code
 */

describe('GoRest API - Users Update', () => {
  
  // Test configuration
  const apiConfig = {
    baseUrl: Cypress.env('gorestApiUrl'),
    token: Cypress.env('gorestToken')
  }

  // Test data for user update
  const updateData = {
    name: "QA Test Updated Name",
    email: "jana.waters@hotmail.us",
    status: "active"
  }

  beforeEach(() => {
    cy.log('Starting GoRest API Users Update Test')
    
    // Verify API configuration
    expect(apiConfig.baseUrl, 'API base URL should be configured').to.not.be.undefined
    expect(apiConfig.token, 'API token should be configured').to.not.be.undefined
  })

  it('should get users list, get first user, and update user name', () => {
    let firstUser = null
    const selectedName = updateData.name
    
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
      
      // Step 2: Get the first user from the list
      cy.log('Step 2: Getting the first user from the list')
      
      firstUser = users[0]
      cy.log(`First user - ID: ${firstUser.id}, Name: "${firstUser.name}", Email: "${firstUser.email}"`)
      
      // Store original user data for comparison
      const originalName = firstUser.name
      
      // Step 3: Update the user's name using PATCH request
      cy.log(`Step 3: Updating user name from "${originalName}" to "${selectedName}"`)
      
      return cy.updateUser(firstUser.id, updateData)
    }).then((updateResponse) => {
      // Primary Assertions for update operation
      cy.log('Performing primary assertions on update response')
      
      // Assert status code is 200
      expect(updateResponse.status, 'User update request should return status code 200').to.equal(200)
      
      // Assert response body exists and has correct structure
      expect(updateResponse.body, 'Update response should have body').to.exist
      expect(updateResponse.body.data, 'Update response should contain data object').to.exist
      
      const updatedUser = updateResponse.body.data
      
      // Assert the name was updated to the selected name
      expect(updatedUser.name, `User name should be updated to "${selectedName}"`).to.equal(selectedName)
      
      // Additional verification - other fields should be updated as specified
      expect(updatedUser.email, 'Email should be updated').to.equal(updateData.email)
      expect(updatedUser.status, 'Status should be updated').to.equal(updateData.status)
      
      // Verify user ID remains the same
      expect(updatedUser.id, 'User ID should remain unchanged').to.equal(firstUser.id)
      
      // Log successful update
      cy.log('✅ User update completed successfully')
      cy.log(`✅ Status Code: ${updateResponse.status}`)
      cy.log(`✅ Updated Name: "${updatedUser.name}"`)
      cy.log(`✅ Updated Email: "${updatedUser.email}"`)
      cy.log(`✅ Updated Status: "${updatedUser.status}"`)
      
      // Step 4: Verify the update by fetching user details again
      cy.log('Step 4: Verifying update by fetching user details')
      
      return cy.getUserById(firstUser.id)
    }).then((verificationResponse) => {
      // Verify the changes persisted
      expect(verificationResponse.status, 'Verification request should return 200').to.equal(200)
      
      const verifiedUser = verificationResponse.body.data
      
      // Assert the changes are persisted
      expect(verifiedUser.name, 'Name should persist after update').to.equal(selectedName)
      expect(verifiedUser.email, 'Email should persist after update').to.equal(updateData.email)
      expect(verifiedUser.status, 'Status should persist after update').to.equal(updateData.status)
      
      cy.log('✅ Update verification completed successfully')
      cy.log(`✅ Verified Name: "${verifiedUser.name}"`)
    })
  })

  // Test for updating with invalid user ID
  it('should handle update request with invalid user ID', () => {
    cy.log('Testing update with invalid user ID')
    
    const invalidUserId = 999999999
    
    cy.updateUser(invalidUserId, updateData).then((response) => {
      // Should return 404 for non-existent user
      expect(response.status, 'Invalid user ID should return 404').to.equal(404)
      
      cy.log('✅ Invalid user ID error handling test completed')
    })
  })

  // Test for partial update (only name field)
  it('should handle partial user update (name only)', () => {
    cy.log('Testing partial user update with only name field')
    
    const partialUpdateData = {
      name: "Partial Update Test Name"
    }
    
    cy.getUsers().then((response) => {
      const users = response.body.data
      const firstUser = users[0]
      
      return cy.updateUser(firstUser.id, partialUpdateData)
    }).then((updateResponse) => {
      expect(updateResponse.status, 'Partial update should return 200').to.equal(200)
      
      const updatedUser = updateResponse.body.data
      expect(updatedUser.name, 'Name should be updated').to.equal(partialUpdateData.name)
      
      cy.log('✅ Partial update test completed successfully')
    })
  })

  // Test for generating random name and updating
  it('should update user with randomly generated name', () => {
    cy.log('Testing user update with randomly generated name')
    
    cy.generateRandomName().then((randomName) => {
      cy.log(`Generated random name: "${randomName}"`)
      
      const randomUpdateData = {
        name: randomName,
        email: updateData.email,
        status: updateData.status
      }
      
      cy.getUsers().then((response) => {
        const users = response.body.data
        const firstUser = users[0]
        
        return cy.updateUser(firstUser.id, randomUpdateData)
      }).then((updateResponse) => {
        expect(updateResponse.status, 'Random name update should return 200').to.equal(200)
        
        const updatedUser = updateResponse.body.data
        expect(updatedUser.name, 'Name should be updated to random name').to.equal(randomName)
        
        cy.log(`✅ Random name update completed: "${updatedUser.name}"`)
      })
    })
  })

  // Test for request validation
  it('should validate required headers and authentication', () => {
    cy.log('Testing API authentication and headers validation')
    
    cy.getUsers().then((response) => {
      const users = response.body.data
      const firstUser = users[0]
      
      // Test with invalid token
      cy.apiRequest('PATCH', `/users/${firstUser.id}`, updateData, {
        'Authorization': 'Bearer invalid_token'
      }).then((invalidTokenResponse) => {
        // Should return 401 for invalid token
        expect(invalidTokenResponse.status, 'Invalid token should return 401').to.equal(401)
        
        cy.log('✅ Authentication validation test completed')
      })
    })
  })

  afterEach(() => {
    cy.log('Cleaning up after API update test')
    
    // Log completion
    cy.task('log', 'GoRest API Users Update test completed')
  })
}) 