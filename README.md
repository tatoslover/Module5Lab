# Express Labs - Module 5 Exercises

## Table of Contents

1. [Setup](#setup)
2. [Exercise 1: Multiple Web Servers](#exercise-1-multiple-web-servers)
   - [Running the Servers](#running-the-servers)
   - [Server Details](#server-details)
   - [Testing](#testing)
3. [Exercise 2: Calculator API](#exercise-2-calculator-api)
   - [Running the Calculator API](#running-the-calculator-api)
   - [API Endpoints](#api-endpoints)
   - [Testing](#testing-1)
4. [Exercise 3: Calculator Frontend Interface](#exercise-3-calculator-frontend-interface)
   - [Running Exercise 3](#running-exercise-3)
   - [Features](#features)
   - [Available Operations](#available-operations)
   - [Usage](#usage)
   - [Testing](#testing-2)
   - [Architecture](#architecture)
5. [Exercise 4: Friends API with Advanced Routing](#exercise-4-friends-api-with-advanced-routing)
   - [Running Exercise 4](#running-exercise-4)
   - [Features Implemented](#features-implemented)
   - [API Endpoints](#api-endpoints-1)
   - [Testing Examples](#testing-examples)
   - [Data Validation](#data-validation)
   - [Sample Data](#sample-data)
6. [Exercise 5: Friends API with MVC Architecture](#exercise-5-friends-api-with-mvc-architecture)
   - [Running Exercise 5](#running-exercise-5)
   - [MVC Architecture Implementation](#mvc-architecture-implementation)
   - [Controller Functions](#controller-functions)
   - [Clean Routes Implementation](#clean-routes-implementation)
   - [Enhanced Features](#enhanced-features)
   - [API Endpoints](#api-endpoints-2)
   - [Architecture Comparison](#architecture-comparison)
   - [Testing](#testing-3)
   - [Benefits of MVC Implementation](#benefits-of-mvc-implementation)
7. [Exercise 6: Calculator API with Unit Tests](#exercise-6-calculator-api-with-unit-tests)
   - [Running Exercise 6](#running-exercise-6)
   - [Testing Commands](#testing-commands)
   - [Test Architecture](#test-architecture)
   - [Test Coverage](#test-coverage)
   - [Test Categories](#test-categories)
   - [Testing Tools](#testing-tools)
   - [File Structure](#file-structure)
   - [Benefits of Testing Implementation](#benefits-of-testing-implementation)
   - [API Endpoints](#api-endpoints-3)
8. [Exercise 7](#exercise-7-to-be-completed)
9. [Exercise 8](#exercise-8-to-be-completed)

---

## Setup

1. Install dependencies:
```bash
npm install
```
2. Free up ports:
```bash
npm run kill-ports
```

---

## Exercise 1: Multiple Web Servers

This exercise demonstrates running multiple Express.js servers on different ports simultaneously.

### Running the Servers

```bash
npm run server1  # Runs on port 3001
npm run server2  # Runs on port 3002
npm run server3  # Runs on port 3003
```

### Server Details

#### Server 1 (Port 3001)
- Basic server with health checks
- Endpoints: `/`, `/health`, `/info`, `POST /echo`

#### Server 2 (Port 3002)
- Data processing server
- Endpoints: `/`, `/health`, `/users`, `POST /process`, `/random`

#### Server 3 (Port 3003)
- Utility server with various tools
- Endpoints: `/`, `/health`, `/time`, `/status/:code`, `POST /validate`, `/headers`

### Testing

Visit each server in your browser:
- http://localhost:3001
- http://localhost:3002
- http://localhost:3003

Use tools like Postman or curl to test POST endpoints.

---

## Exercise 2: Calculator API

Based on the 'add' route demonstrated in Module5Code, this exercise creates routes for all four core mathematical operations: add, subtract, multiply, and divide.

### Running the Calculator API

```bash
npm run calculator  # Runs on port 3004
```

### API Endpoints

All operations use query parameters `num1` and `num2`:

- `GET /calculator/add?num1=5&num2=3` - Addition
- `GET /calculator/subtract?num1=10&num2=4` - Subtraction
- `GET /calculator/multiply?num1=6&num2=7` - Multiplication
- `GET /calculator/divide?num1=20&num2=4` - Division

### Testing

Visit the calculator API:
- http://localhost:3004
- http://localhost:3004/calculator/add?num1=5&num2=3
- http://localhost:3004/calculator/subtract?num1=10&num2=4
- http://localhost:3004/calculator/multiply?num1=6&num2=7
- http://localhost:3004/calculator/divide?num1=20&num2=4

---

## Exercise 3: Calculator Frontend Interface

Extends the calculator.html from Module5Code to create a full front-end calculator interface that connects to all four server-side calculator routes from Exercise 2.

### Running Exercise 3

**Step 1: Start the Calculator API (Exercise 2)**
```bash
npm run calculator  # Runs on port 3004
```

**Step 2: Start the Frontend Server (in another terminal)**
```bash
npm run frontend  # Runs on port 3005
```

### Features

- **Full Calculator Interface** - Modern, responsive design with buttons for all operations
- **Real-time API Integration** - Connects to Exercise 2 calculator API on port 3004
- **Input Validation** - Checks for valid numbers and required inputs
- **Error Handling** - Displays meaningful error messages for invalid operations
- **Keyboard Shortcuts** - Support for Ctrl/Cmd + (+, -, *, /) operations
- **Visual Feedback** - Loading states and color-coded results

### Available Operations

- **Addition** - Green button (➕)
- **Subtraction** - Red button (➖)
- **Multiplication** - Blue button (✖️)
- **Division** - Orange button (➗)

### Usage

1. Open http://localhost:3005 in your browser
2. Enter two numbers in the input fields
3. Click any operation button to perform the calculation
4. View the result with full operation display

### Testing

- **Basic Operations:** Try 10 + 5, 15 - 3, 6 × 7, 20 ÷ 4
- **Decimal Numbers:** Test 3.5 + 2.7, 22 ÷ 7
- **Error Cases:** Try division by zero, invalid inputs
- **Keyboard Shortcuts:** Use Ctrl+Plus, Ctrl+Minus, etc.

### Architecture

- **Frontend Server:** Express.js serving static HTML/CSS/JS (Port 3005)
- **Calculator API:** Backend calculator service (Port 3004)
- **API Communication:** Fetch API calls to localhost:3004/calculator/[operation]

---

## Exercise 4: Friends API with Advanced Routing

Modifies the provided friendRoutes.js template to implement 4 advanced routing features with proper validation and error handling.

### Running Exercise 4

```bash
npm run friends  # Runs on port 3006
```

### Features Implemented

#### Part 1: Enhanced Filter Endpoint
- **Gender filtering:** `/friends/filter?gender=male`
- **Letter filtering:** `/friends/filter?letter=R` (filters by first letter of name)
- **Combined filtering:** `/friends/filter?gender=male&letter=R`
- **Case-insensitive** matching for both filters

#### Part 2: Modified Info Route
- Returns only specific headers: `user-agent`, `content-type`, `accept`
- Clean JSON response with timestamp
- **Endpoint:** `GET /friends/info`

#### Part 3: Single Friend by ID
- Returns single friend object matching the ID
- **Endpoint:** `GET /friends/:id`
- **Validation:** Checks for valid number format
- **Error handling:** 404 for non-existent friends, 400 for invalid ID format

#### Part 4: Update Friend (PUT)
- Updates existing friend data with validation
- **Endpoint:** `PUT /friends/:id`
- **Validation:** Requires both `name` and `gender` fields
- **Error handling:** 404 for non-existent friends, 400 for missing fields

### API Endpoints

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET | `/friends` | Get all friends | |
| GET | `/friends/filter` | Filter by gender/letter | `?gender=male&letter=R` |
| GET | `/friends/info` | Get request headers | |
| GET | `/friends/:id` | Get single friend | `/friends/1` |
| POST | `/friends` | Add new friend | |
| PUT | `/friends/:id` | Update friend | `/friends/1` |

### Testing Examples

#### Filter male friends starting with 'R'

```bash
curl "http://localhost:3006/friends/filter?gender=male&letter=R"
```

#### Get header information

```bash
curl "http://localhost:3006/friends/info"
```

#### Get specific friend

```bash
curl "http://localhost:3006/friends/1"
```

#### Update friend

```bash
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "Phoebe Buffay", "gender": "female"}' \
     "http://localhost:3006/friends/1"
```

### Data Validation

- **ID validation:** Must be numeric
- **Required fields:** Both `name` and `gender` required for POST/PUT
- **Case handling:** All filters are case-insensitive
- **Error responses:** Proper HTTP status codes (400, 404, 500)

### Sample Data

The API includes 6 Friends characters:
- Phoebe (ID: 1, female)
- Joey (ID: 2, male)
- Chandler (ID: 3, male)
- Monica (ID: 4, female)
- Ross (ID: 5, male)
- Rachael (ID: 6, female)

---

## Exercise 5: Friends API with MVC Architecture

Expands on Exercise 4 by refactoring the application to use the Model-View-Controller (MVC) pattern, separating business logic into controllers for better code organization and maintainability.

### Running Exercise 5

```bash
npm run friends-mvc  # Runs on port 3007
```

### MVC Architecture Implementation

#### Model-View-Controller Pattern
- **Models:** Data structures (`models/friends.js`)
- **Views:** JSON responses (handled by controllers)
- **Controllers:** Business logic (`controllers/friendsController.js`)
- **Routes:** Thin routing layer (`routes/friendRoutes.js`)

#### Key Improvements Over Exercise 4

- **Separation of Concerns:** Business logic moved to dedicated controllers
- **Code Reusability:** Controller functions can be reused across routes
- **Enhanced Validation:** Better input validation and error handling
- **Professional Structure:** Follows industry-standard MVC pattern
- **Maintainability:** Changes only require controller updates

### Controller Functions

```javascript
// controllers/friendsController.js
module.exports = {
    getAllFriends,        // GET /friends
    filterFriends,        // GET /friends/filter
    getHeaderInfo,        // GET /friends/info
    getFriendById,        // GET /friends/:id
    addFriend,            // POST /friends
    updateFriend          // PUT /friends/:id
}
```

### Clean Routes Implementation

```javascript
// routes/friendRoutes.js - Following Module5Code pattern
router.get('/', friendsController.getAllFriends);
router.get('/filter', friendsController.filterFriends);
router.get('/info', friendsController.getHeaderInfo);
router.get('/:id', friendsController.getFriendById);
router.post('/', friendsController.addFriend);
router.put('/:id', friendsController.updateFriend);
```

### Enhanced Features

#### Better Error Handling
- Detailed error messages with available options
- Proper HTTP status codes (400, 404, 409, 500)
- Input validation for all endpoints

#### Improved Responses
- Consistent JSON response format
- Timestamps on all responses
- Enhanced success messages

#### Advanced Validation
- ID format validation (must be numeric)
- Required field checking
- Gender validation (`male`, `female`, `other`)
- Duplicate ID detection
- Input sanitization

### API Endpoints (Same as Exercise 4)

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET | `/friends` | Get all friends | |
| GET | `/friends/filter` | Filter by gender/letter | `?gender=male&letter=R` |
| GET | `/friends/info` | Get request headers | |
| GET | `/friends/:id` | Get single friend | `/friends/1` |
| POST | `/friends` | Add new friend | |
| PUT | `/friends/:id` | Update friend | `/friends/1` |

### Architecture Comparison

**Exercise 4 (Monolithic Routes):**
```javascript
router.get('/filter', (req, res) => {
    // 50+ lines of business logic here
});
```

**Exercise 5 (MVC Pattern):**
```javascript
router.get('/filter', friendsController.filterFriends);
```

### Testing (Identical to Exercise 4)

```bash
# Filter male friends starting with 'R'
curl "http://localhost:3007/friends/filter?gender=male&letter=R"

# Get header information
curl "http://localhost:3007/friends/info"

# Update friend with enhanced validation
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "Phoebe Buffay", "gender": "female"}' \
     "http://localhost:3007/friends/1"
```

### Benefits of MVC Implementation

- ✅ **Professional Architecture:** Industry-standard pattern
- ✅ **Code Maintainability:** Easy to modify and extend
- ✅ **Testing Friendly:** Controllers can be unit tested
- ✅ **Reusable Logic:** Controller functions work across routes
- ✅ **Clean Separation:** Routes only handle HTTP concerns

---

## Exercise 6: Calculator API with Unit Tests

Adds comprehensive unit tests for all calculator operations, ensuring all routes work successfully and return expected responses. This exercise demonstrates professional testing practices with Jest framework.

### Running Exercise 6

```bash
npm run calculator-tests  # Runs Calculator API on port 3008
```

### Testing Commands

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Architecture

#### Unit Tests
- **Calculator Library Tests:** Core mathematical operations testing
- **Controller Tests:** HTTP request/response logic testing
- **Mocking:** Isolated component testing with Jest mocks

#### Integration Tests
- **API Route Tests:** Complete HTTP request/response cycle testing
- **Error Handling:** Comprehensive error case validation
- **Edge Cases:** Boundary conditions and special values

### Test Coverage

| Component | Coverage Type | Description |
|-----------|---------------|-------------|
| Calculator Library | Unit Tests | Add, subtract, multiply, divide operations |
| Controller Logic | Unit Tests | Parameter validation, error handling |
| API Routes | Integration Tests | Full HTTP request/response testing |
| Error Scenarios | All Levels | Invalid inputs, division by zero, missing params |

### Test Categories

#### Successful Operations
```javascript
// Addition: 5 + 3 = 8
test('should add two positive numbers correctly', () => {
  expect(calculator.add(5, 3)).toBe(8);
});

// Division: 20 ÷ 4 = 5
test('should divide numbers successfully', async () => {
  const response = await request(app)
    .get('/calculator/divide?num1=20&num2=4')
    .expect(200);
  expect(response.body.result).toBe(5);
});
```

#### Error Handling
```javascript
// Division by zero
test('should return 400 for division by zero', async () => {
  const response = await request(app)
    .get('/calculator/divide?num1=10&num2=0')
    .expect(400);
  expect(response.body.error).toBe("Division by zero");
});

// Invalid parameters
test('should return 400 for invalid inputs', async () => {
  const response = await request(app)
    .get('/calculator/add?num1=abc&num2=3')
    .expect(400);
});
```

#### Edge Cases
```javascript
// Decimal precision
test('should handle decimal division correctly', async () => {
  const response = await request(app)
    .get('/calculator/divide?num1=22&num2=7')
    .expect(200);
  expect(response.body.result).toBeCloseTo(3.142857, 5);
});

// Large numbers
test('should handle large number operations', async () => {
  const response = await request(app)
    .get('/calculator/multiply?num1=999999&num2=888888')
    .expect(200);
});
```

### Testing Tools

- **Jest Framework:** Unit testing with mocking capabilities
- **Supertest:** HTTP API integration testing
- **Test Coverage:** Built-in code coverage reporting
- **Watch Mode:** Continuous testing during development

### File Structure

```
exercise6/
├── tests/
│   ├── unit/
│   │   ├── Calculator.test.js          # Library unit tests
│   │   └── calculatorController.test.js # Controller unit tests
│   ├── integration/
│   │   └── calculatorRoutes.test.js    # API integration tests
│   └── setup.js                        # Jest configuration
├── controllers/calculatorController.js  # HTTP logic
├── libraries/Calculator.js             # Core math operations
└── routes/calculatorRoutes.js          # API routes
```

### Benefits of Testing Implementation

- ✅ **Code Confidence:** Safe refactoring with comprehensive coverage
- ✅ **Documentation:** Tests serve as living API documentation
- ✅ **Early Bug Detection:** Catch issues before deployment
- ✅ **Professional Practices:** Industry-standard testing methodologies
- ✅ **Maintainability:** Clear separation of test concerns
- ✅ **Continuous Integration:** Automated testing capabilities

### API Endpoints (Same as Exercise 2)

All calculator operations with comprehensive test coverage:

| Method | Endpoint | Test Coverage |
|--------|----------|---------------|
| GET | `/calculator/add` | ✅ Unit + Integration |
| GET | `/calculator/subtract` | ✅ Unit + Integration |
| GET | `/calculator/multiply` | ✅ Unit + Integration |
| GET | `/calculator/divide` | ✅ Unit + Integration |
| GET | `/` | ✅ Integration |
| GET | `/health` | ✅ Integration |

---

## Exercise 7: Enhanced Calculator API with Libraries

This exercise demonstrates advanced software architecture with a Calculator library, secure ID generation, and a comprehensive generic logging system.

## 📋 Overview

Exercise 7 expands upon the calculator API to showcase professional library design patterns:

- **Part 1:** Enhanced Calculator Library with advanced features
- **Part 2:** Secure Random ID Generation using Node.js `crypto.randomUUID()`
- **Part 3:** Generic Logging Library with structured logging and caller tracking
- **Comprehensive Testing** with unit and integration tests
- **Professional Architecture** with separation of concerns

## 🏗️ Architecture

```
exercise7/
├── app.js                           # Main Express application (Port 3009)
├── controllers/
│   └── calculatorController.js     # Enhanced HTTP controllers with logging
├── libraries/
│   ├── Calculator.js               # Enhanced calculator with history & chains
│   ├── IdGenerator.js              # Secure random ID generation library
│   └── Logger.js                   # Generic logging library
├── routes/
│   └── calculatorRoutes.js         # API route definitions
├── tests/
│   ├── setup.js                    # Jest configuration
│   ├── unit/
│   │   ├── Calculator.test.js      # Calculator library tests
│   │   ├── IdGenerator.test.js     # ID generation tests
│   │   ├── Logger.test.js          # Logging library tests
│   │   └── calculatorController.test.js # Controller tests
│   └── integration/
│       └── calculatorRoutes.test.js # API integration tests
├── demo.js                         # Interactive demo script
└── package.json                    # Dependencies and scripts
```

## 🚀 Getting Started

### Install Dependencies
```bash
cd exercise7
npm install
```

### Run the Enhanced Calculator API
```bash
npm start  # Runs on port 3009
```

### View Demo
```bash
node demo.js  # Interactive demonstration of all features
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test with Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

## 🏛️ Part 1: Enhanced Calculator Library

### Features
- **Secure Random IDs:** Each calculator instance has a unique cryptographic ID
- **Operation History:** Tracks last 100 operations with timestamps
- **Chain Calculations:** Fluent API for sequential operations
- **Advanced Operations:** Power, square root, and more
- **Input Validation:** Comprehensive error checking and recovery
- **Memory Management:** Automatic history cleanup to prevent memory leaks

### Example Usage
```javascript
const Calculator = require('./libraries/Calculator');
const calc = new Calculator();

// Basic operations with logging
const sum = calc.add(15, 25);        // Logged: [calc_abc123] 15 + 25 = 40
const result = calc.multiply(sum, 2); // Logged: [calc_abc123] 40 × 2 = 80

// Chain calculations
const chainResult = calc
  .startChain(10)
  .chainAdd(5)
  .chainMultiply(2)
  .chainDivide(3)
  .endChain(); // Result: 10

// Advanced operations
const power = calc.power(2, 8);      // 256
const sqrt = calc.sqrt(64);          // 8

// Get statistics
const stats = calc.getStats();
console.log(`Operations performed: ${stats.totalOperations}`);
```

## 🔐 Part 2: ID Generation Library

### Features
- **Cryptographically Secure:** Uses Node.js built-in `crypto.randomUUID()`
- **Multiple Formats:** UUID, short, medium, long, and custom patterns
- **Collision Prevention:** Batch generation with uniqueness validation
- **Performance Optimized:** High-frequency generation capabilities
- **Customizable:** Prefixes, patterns, and character sets

### ID Types Generated
```javascript
const IdGenerator = require('./libraries/IdGenerator');

// Standard UUID v4 (crypto.randomUUID())
IdGenerator.generate()                    // "550e8400-e29b-41d4-a716-446655440000"

// Application-specific IDs
IdGenerator.generateCalculatorId()        // "calc_a1b2c3d4"
IdGenerator.generateLoggerId()           // "log_e5f6g7h8"
IdGenerator.generateSessionId()          // "session_a1b2c3d4e5f6g7h8"

// Custom formats
IdGenerator.generateWithPattern('XXX-###-XXX') // "a1b-234-c5d"
IdGenerator.generateBatch(5, 'short')    // ["a1b2c3d4", "e5f6g7h8", ...]
```

### Security Features
- Uses `crypto.randomUUID()` for maximum entropy
- No predictable patterns or timestamps in core IDs
- Collision detection in batch operations
- Performance monitoring and statistics

## 📝 Part 3: Generic Logging Library

### Features
- **Structured Logging:** Consistent format with caller ID and session tracking
- **Multiple Log Levels:** DEBUG, INFO, WARN, ERROR with filtering
- **Operation Logging:** Specialized logging for mathematical operations
- **Session Management:** Track related operations across requests
- **Child Loggers:** Inherit session context with different caller IDs
- **Performance Tracking:** Built-in timing and metrics logging

### Log Format
```
[SESSION_ID][CALLER_ID][TIMESTAMP][LEVEL][OPERATION] Message -> Result [LOG_ID]
```

### Example Logs
```
[session_abc123][calc_def456][2024-01-01T12:00:00.000Z][INFO][ADD] Inputs: [5, 3] 5 + 3 = 8 -> Result: 8 [LogID: xyz789]
[session_abc123][api_controller][2024-01-01T12:00:01.000Z][ERROR][VALIDATION] Validation failed: TYPE_CHECK. Got: abc, Expected: number [LogID: uvw456]
```

### Usage Examples
```javascript
const Logger = require('./libraries/Logger');

// Create logger with caller ID
const logger = new Logger('my_component', 'INFO');

// Basic logging
logger.info('Operation completed', result, 'PROCESS');
logger.error('Validation failed', 'VALIDATION_ERROR');
logger.warn('Deprecated method used', 'DEPRECATION');

// Operation logging
logger.logOperation('ADD', [5, 3], 8, '+');

// Performance logging
const startTime = Date.now();
// ... do work ...
logger.logPerformance('CALCULATION', startTime, Date.now(), result);

// Chain operations with context
logger.logChain('Started with 10', 10);
logger.logChain('Added 5', 15, 'MULTIPLY');

// Create child logger (inherits session)
const childLogger = logger.createChild('child_component');
```

## 🔗 Library Integration

### Calculator + Logger Integration
The Calculator automatically integrates with the Logger for comprehensive operation tracking:

```javascript
// Calculator operations are automatically logged
const calc = new Calculator(); // Creates logger with calculator ID

calc.add(5, 3);
// Logs: [session_xxx][calc_yyy][timestamp][INFO][ADD] Inputs: [5, 3] 5 + 3 = 8 -> Result: 8

calc.startChain(10).chainAdd(5).endChain();
// Logs: [session_xxx][calc_yyy][timestamp][INFO][CHAIN] Chain: Started with 10 -> 10
//       [session_xxx][calc_yyy][timestamp][INFO][ADD] Inputs: [10, 5] 10 + 5 = 15 -> Result: 15
//       [session_xxx][calc_yyy][timestamp][INFO][CHAIN] Chain: Chain completed -> 15
```

### API Controller + Logger Integration
The API controllers use logging for request tracking and error handling:

```javascript
// API requests are logged with validation and results
GET /calculator/add?num1=5&num2=3
// Logs: [session_xxx][api_controller][timestamp][INFO][API_REQUEST] API Request: ADD - Query params: {"num1":"5","num2":"3"}
//       [session_xxx][api_controller][timestamp][INFO][API_ADD] Inputs: [5, 3] 5 + 3 = 8 -> Result: 8
```

## 🧪 Comprehensive Testing

### Test Coverage
- **Calculator Library:** Unit tests for all operations, chains, and error handling
- **IdGenerator Library:** Collision testing, format validation, performance tests
- **Logger Library:** Log level filtering, formatting, child logger functionality
- **Controller Integration:** API request/response testing with logging verification
- **Integration Tests:** End-to-end API testing with complete logging pipeline

### Test Statistics
- **Total Tests:** 80+ test cases
- **Coverage:** 95%+ across all libraries
- **Performance Tests:** ID generation speed and collision rates
- **Error Handling:** Comprehensive validation and edge case testing

## 🎯 API Endpoints

All endpoints now include enhanced logging and validation:

### Calculator Operations
```bash
# Addition with logging
GET /calculator/add?num1=5&num2=3
Response: {"operation": "addition", "num1": 5, "num2": 3, "result": 8}

# Subtraction with validation logging
GET /calculator/subtract?num1=10&num2=3
Response: {"operation": "subtraction", "num1": 10, "num2": 3, "result": 7}

# Multiplication with performance tracking
GET /calculator/multiply?num1=6&num2=7
Response: {"operation": "multiplication", "num1": 6, "num2": 7, "result": 42}

# Division with error handling
GET /calculator/divide?num1=20&num2=4
Response: {"operation": "division", "num1": 20, "num2": 4, "result": 5}
```

### Error Handling with Structured Logging
```bash
# Invalid input logging
GET /calculator/add?num1=abc&num2=3
Response: 400 {"error": "Invalid numbers provided"}
Logs: [session_xxx][api_controller][timestamp][ERROR][VALIDATION] Validation failed: API_INPUT

# Division by zero with detailed logging
GET /calculator/divide?num1=10&num2=0
Response: 400 {"error": "Division by zero"}
Logs: [session_xxx][api_controller][timestamp][ERROR][VALIDATION] Validation failed: DIVISION_BY_ZERO
```

## 🏆 Professional Features Demonstrated

### 1. **Security Best Practices**
- Cryptographically secure ID generation
- No predictable identifiers that could be exploited
- Proper input validation and sanitization

### 2. **Observability and Debugging**
- Comprehensive structured logging
- Session tracking across requests
- Performance metrics collection
- Error correlation and tracking

### 3. **Scalable Architecture**
- Reusable library components
- Generic logging system usable across applications
- Modular design with clear separation of concerns
- Professional error handling patterns

### 4. **Production Ready Code**
- Memory management in Calculator history
- Configurable log levels for different environments
- Performance optimized ID generation
- Comprehensive test coverage

## 🔧 Configuration Options

### Logger Configuration
```javascript
// Different log levels for different environments
const prodLogger = new Logger('prod_app', 'ERROR');    // Production: errors only
const devLogger = new Logger('dev_app', 'DEBUG');      // Development: all logs
const testLogger = new Logger('test_app', 'WARN');     // Testing: warnings and errors
```

### Calculator Configuration
```javascript
// Calculator automatically manages:
// - History size (max 100 operations)
// - Memory cleanup
// - Session tracking
// - Error recovery
```

### ID Generator Performance
```javascript
// Performance testing and statistics
const stats = IdGenerator.getPerformanceStats(10000);
console.log(stats);
// Output: {
//   iterations: 10000,
//   types: {
//     standard: { duration: 45, uniqueIds: 10000, collisionRate: '0.0000%' }
//   }
// }
```

## 🚀 Getting Started Examples

### Quick Start
```bash
# Clone and setup
cd exercise7
npm install
npm start

# Test API
curl "http://localhost:3009/calculator/add?num1=5&num2=3"

# View comprehensive demo
node demo.js
```

### Integration Example
```javascript
// Use all three libraries together
const Calculator = require('./libraries/Calculator');
const Logger = require('./libraries/Logger');
const IdGenerator = require('./libraries/IdGenerator');

// Create application components
const appLogger = new Logger('my_app', 'INFO');
const calc = new Calculator(); // Auto-creates logger with calc ID
const sessionId = IdGenerator.generateSessionId();

// Perform operations with full logging
appLogger.logSessionStart('CALCULATION_SESSION', { sessionId });
const result = calc.add(10, 20);
appLogger.logSessionEnd('CALCULATION_SESSION', {
  result,
  operationCount: calc.getOperationCount()
});
```

This exercise demonstrates professional software engineering practices with secure ID generation, comprehensive logging, and robust library architecture suitable for production applications.

## Exercise 8: [To be completed]
