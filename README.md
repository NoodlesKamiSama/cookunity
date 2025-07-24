# CookUnity QA Automation Project

A comprehensive Cypress testing project for Senior QA Engineer role application at CookUnity. This project includes both UI and API automation tests using modern JavaScript practices, Cypress best practices, and **Allure reporting** for enhanced test visualization.

## 📋 Project Overview

This project demonstrates automation testing capabilities through:

### Frontend Testing (UI)
- **Target**: CookUnity website (www.cookunity.com)
- **Flow**: Complete user registration journey
- **Technology**: Cypress with JavaScript
- **Features**: Custom commands, robust selectors, error handling

### Backend Testing (API)
- **Target**: GoRest API (https://gorest.co.in/public/v1)
- **Operations**: User verification and updates
- **Technology**: Cypress API testing
- **Features**: Authentication, data validation, error handling

### Reporting
- **Technology**: Allure Framework
- **Features**: Rich visualizations, historical trends, detailed test steps, screenshots, and videos
- **Output**: Interactive HTML reports with comprehensive test analytics

## 🏗️ Project Structure

```
cookunity/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── gorest-users-verification.cy.js    # API Test 1: User verification
│   │   │   └── gorest-users-update.cy.js          # API Test 2: User updates
│   │   └── ui/
│   │       └── cookunity-user-flow.cy.js          # UI Test: Complete user flow
│   ├── screenshots/                               # Test failure screenshots
│   ├── videos/                                    # Test execution videos
│   └── support/
│       ├── commands.js                            # Custom Cypress commands
│       └── e2e.js                                 # Global configurations
├── allure-results/                                # Raw Allure test results
├── allure-report/                                 # Generated Allure HTML reports
├── allure.properties                              # Allure configuration
├── cypress.config.js                             # Cypress configuration
├── package.json                                  # Dependencies and scripts
└── README.md                                     # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 16 or higher)
- **Java 8+** (required for Allure reporting)
- **npm** or yarn package manager
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cookunity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npx cypress verify
   allure --version  # Verify Allure installation
   ```

## 🧪 Test Execution

### Run All Tests
```bash
# Run all tests in headless mode
npm test

# Run all tests with Cypress UI
npm run cypress:open
```

### Run Specific Test Suites

#### UI Tests Only
```bash
# Headless mode
npm run test:ui

# With Cypress UI
npm run cypress:run:ui
```

#### API Tests Only
```bash
# Headless mode
npm run test:api

# With Cypress UI
npm run cypress:run:api
```

### Generate Test Reports with Allure
```bash
# Run tests and generate Allure results
npm run test:report

# Generate HTML report from results
npm run allure:report

# Open the generated report in browser
npm run allure:open
```

## 📊 Allure Reporting

### Features
- **Rich Visualizations**: Beautiful charts, graphs, and test execution timelines
- **Historical Trends**: Track test results over multiple runs
- **Detailed Steps**: Each test shows detailed execution steps with timestamps
- **Attachments**: Screenshots, videos, and logs automatically attached
- **Categorization**: Tests organized by features, stories, and severity
- **Retry Analysis**: Clear view of test retries and flaky test detection

### Report Structure
- **Overview**: Executive summary with pass/fail statistics
- **Suites**: Tests organized by test suites and categories  
- **Timeline**: Chronological view of test execution
- **Behaviors**: Tests grouped by features and stories
- **Packages**: Tests organized by file structure

### Viewing Reports
After running tests, the Allure report will contain:
- ✅ **9 Total Tests** across UI and API suites
- 📊 **Interactive Charts** showing test distribution
- 🎯 **Detailed Test Steps** with screenshots for failures
- 📹 **Video Recordings** for UI test flows
- 📈 **Execution Timeline** showing test duration patterns

## 📝 Test Descriptions

### UI Test: CookUnity User Flow

**File**: `cypress/e2e/ui/cookunity-user-flow.cy.js`

**Test Steps**:
1. Navigate to www.cookunity.com
2. Enter zip code: 10001
3. Skip all quiz questions
4. Select 6 meals plan
5. Create account with provided credentials

**Test Data**:
- Email: qa.mail@gmail.com (dynamically generated)
- First Name: My Name
- Last Name: My Lastname
- Password: 123123123

**Assertions**:
- ✅ URL contains "en/meal-select"
- ✅ More than one meal in the meals list

**Features**:
- Robust element selection with multiple fallback strategies
- Dynamic waiting and error handling
- Comprehensive logging for debugging
- Cross-origin navigation handling

### API Test 1: User Verification

**File**: `cypress/e2e/api/gorest-users-verification.cy.js`

**Test Cases**:
1. **Main Verification Flow**
   - GET /users - Retrieve users list
   - Filter active users from the list
   - GET /users/{userId} - Get first active user details
2. **Error Handling Test**
   - Verify 404 response for invalid user IDs
3. **Data Structure Validation**
   - Verify API response schema and data types

**Assertions**:
- ✅ Status code: 200 for valid requests
- ✅ User status: "active"
- ✅ Response structure validation
- ✅ Error handling for invalid requests

### API Test 2: User Updates

**File**: `cypress/e2e/api/gorest-users-update.cy.js`

**Test Cases**:
1. **Complete User Update**
   - GET /users → PATCH /users/{userId} → Verify update
2. **Invalid User Handling**
   - Test updates on non-existent users
3. **Partial Updates**
   - Test name-only updates
4. **Random Data Testing**
   - Updates with dynamically generated data
5. **Authentication Testing**
   - Verify token validation

**Sample Request Data**:
```json
{
  "name": "QA Test Updated Name",
  "email": "jana.waters@hotmail.us", 
  "status": "active"
}
```

**Assertions**:
- ✅ Status code: 200 for successful updates
- ✅ Name updated correctly
- ✅ Authentication errors handled properly

## 🛠️ Custom Commands

### UI Commands
- `cy.visitCookUnity()` - Navigate to homepage with popup handling
- `cy.enterZipCode(zipCode)` - Enter zip code with smart element detection
- `cy.skipQuiz()` - Skip quiz questions with multiple selector strategies
- `cy.selectMealPlan(count)` - Select meal plan by count
- `cy.createAccount()` - Fill account creation form with dynamic email generation

### API Commands
- `cy.apiRequest(method, endpoint, body, headers)` - Generic API request with authentication
- `cy.getUsers()` - Get users list from GoRest API
- `cy.getUserById(userId)` - Get user by ID with error handling
- `cy.updateUser(userId, userData)` - Update user information
- `cy.findFirstActiveUser(users)` - Utility to find active users

### Utility Commands
- `cy.generateRandomName()` - Generate random test names
- Various assertion helpers for API and UI testing

## ⚙️ Configuration

### Environment Variables

The project uses environment variables defined in `cypress.config.js`:

```javascript
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
}
```

### Test Settings

- **Base URL**: https://www.cookunity.com
- **Viewport**: 1920x1080 (Full HD)
- **Timeout**: 10 seconds (default command timeout)
- **Video Recording**: Enabled for all tests
- **Screenshots**: Captured on failure
- **Allure Integration**: Enabled with detailed step logging

### Allure Configuration

**File**: `allure.properties`
```properties
allure.results.directory=allure-results
allure.cypress.log.commands=true
allure.cypress.log.requests=true
allure.skip.automatic.screenshot=false
allure.omit.previous.attempt.screenshot=false
allure.video.passed=false
```

## 📊 Reporting

### Allure Reports
The project uses **Allure Framework** for comprehensive test reporting:

#### Features:
- **Rich Visual Reports**: Interactive HTML reports with charts and graphs
- **Test Execution Timeline**: Detailed view of test execution flow
- **Historical Trends**: Track test results across multiple runs
- **Automatic Attachments**: Screenshots, videos, and logs included
- **Step-by-Step Details**: Each test shows detailed execution steps
- **Flaky Test Detection**: Identifies unstable tests over time

#### Generating Reports:
```bash
# Run tests (generates allure-results/)
npm run test:report

# Generate HTML report (creates allure-report/)
npm run allure:report

# Open report in browser
npm run allure:open
```

#### Report Contents:
- **Dashboard**: Overview with test statistics and trends
- **Test Suites**: Organized by UI and API test categories
- **Individual Test Details**: Step-by-step execution with timestamps
- **Attachments**: Screenshots for failures, videos for UI tests
- **Environment Info**: Test execution environment details

### Built-in Cypress Reporting
- **Videos**: Automatically recorded for all test runs
- **Screenshots**: Captured on test failures
- **Console Logs**: Detailed logging throughout test execution

## 🏆 Best Practices Implemented

### Code Organization
- **Modular Structure**: Separate files for UI and API tests
- **Custom Commands**: Reusable functions for common operations
- **Configuration Management**: Centralized settings and test data
- **Clear Documentation**: Comprehensive comments and JSDoc

### Error Handling
- **Graceful Degradation**: Multiple selector strategies for UI elements
- **Timeout Management**: Appropriate waits for different operations
- **Exception Handling**: Global error handling for common issues
- **API Error Testing**: Comprehensive error scenario coverage

### Maintainability
- **Consistent Patterns**: Standardized test structure and naming
- **Debugging Support**: Extensive logging and debugging information
- **Version Control**: Proper gitignore for generated files
- **Cross-browser Compatibility**: Modern browser support

### Test Design
- **Robust Selectors**: Multiple fallback strategies for element selection
- **Data-Driven**: Configuration-based test data management
- **Comprehensive Assertions**: Multiple validation points per test
- **Dynamic Data**: Generated emails and names for realistic testing

## 🐛 Troubleshooting

### Common Issues

1. **Allure Report Not Generating**
   - Ensure Java 8+ is installed: `java -version`
   - Verify allure-commandline installation: `allure --version`
   - Check if `allure-results/` directory contains JSON files
   - Run: `npm run allure:report` to regenerate

2. **Empty Allure Report**
   - Verify `allure: true` is set in environment variables
   - Check that `@shelex/cypress-allure-plugin` is imported in support file
   - Ensure tests are running successfully first

3. **Element Not Found Errors**
   - Tests use multiple selector strategies with fallbacks
   - Check console logs for selector attempts
   - Verify page load timing

4. **API Authentication Errors**
   - Verify GoRest token in configuration
   - Check network connectivity
   - Validate API endpoint URLs

5. **Test Timeout Issues**
   - Increase timeout values in cypress.config.js
   - Check network connectivity
   - Verify page load performance

### Debug Mode
Run tests with additional debugging:
```bash
# Run with debug logs
DEBUG=cypress:* npm test

# Run specific test with logging
npx cypress run --spec "cypress/e2e/ui/cookunity-user-flow.cy.js" --headed

# Debug Allure generation
DEBUG=allure-plugin* npm run test:report
```

## 📚 References

### Documentation
- [Cypress Documentation](https://docs.cypress.io/)
- [Allure Framework](https://docs.qameta.io/allure/)
- [Cypress Allure Plugin](https://github.com/Shelex/cypress-allure-plugin)
- [GoRest API Documentation](https://gorest.co.in/)
- [CookUnity Website](https://www.cookunity.com/)

### Testing Patterns
- Page Object Model (implied through custom commands)
- API Testing with Cypress
- Data-Driven Testing
- Cross-browser Testing Support

## 🎯 Success Criteria

### Frontend Test Success
- ✅ Successfully navigates through CookUnity user flow
- ✅ Reaches meal selection page (URL contains "en/meal-select")
- ✅ Verifies multiple meals are available
- ✅ Handles cross-origin authentication flow

### Backend Test Success
- ✅ Successfully retrieves and verifies active users (3 test cases)
- ✅ Successfully updates user information (5 test cases)
- ✅ All API requests return expected status codes
- ✅ Comprehensive error handling validation

### Reporting Success
- ✅ Allure reports generated with rich visualizations
- ✅ All test steps captured with detailed logging
- ✅ Screenshots and videos attached for analysis
- ✅ Historical trend data available

### Code Quality
- ✅ 100% JavaScript implementation
- ✅ Comprehensive error handling
- ✅ Reusable custom commands
- ✅ Clear documentation and comments
- ✅ Proper project structure and organization
- ✅ Modern reporting with Allure Framework

## 👨‍💻 Author

Created for CookUnity Senior QA Engineer role application. (Wagner Salustiano)

**Key Technologies**: Cypress, JavaScript, Allure Framework, API Testing, UI Automation

**Contact**: Available for questions and clarifications about implementation details.

---

*This project demonstrates modern QA automation practices suitable for enterprise-level applications, showcasing both technical skills and attention to best practices in test automation with comprehensive Allure reporting.*