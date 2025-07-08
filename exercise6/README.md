# Exercise 6: Calculator API with Unit Tests

This exercise adds comprehensive unit tests for all calculator operations, ensuring all routes work successfully and return expected responses.

## 📋 Overview

Exercise 6 builds upon the calculator API structure to demonstrate professional testing practices:

- **Unit Tests** for Calculator library functions
- **Unit Tests** for Controller business logic
- **Integration Tests** for complete API routes
- **Test Coverage** reporting
- **Continuous Testing** with watch mode

## 🏗️ Architecture

```
exercise6/
├── app.js                           # Main Express application
├── controllers/
│   └── calculatorController.js     # Business logic controllers
├── libraries/
│   └── Calculator.js               # Core calculator functionality
├── routes/
│   └── calculatorRoutes.js         # API route definitions
├── tests/
│   ├── setup.js                    # Jest configuration and utilities
│   ├── unit/
│   │   ├── Calculator.test.js      # Calculator library tests
│   │   └── calculatorController.test.js # Controller tests
│   └── integration/
│       └── calculatorRoutes.test.js # End-to-end API tests
└── package.json                    # Dependencies and test scripts
```

## 🚀 Getting Started

### Install Dependencies
```bash
cd exercise6
npm install
```

### Run the Calculator API
```bash
npm start  # Runs on port 3008
```

## 🧪 Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Test Coverage Report
```bash
npm run test:coverage
```

### Verbose Output
```bash
npm run test:verbose
```

## 📊 Test Structure

### 1. Unit Tests - Calculator Library

**File:** `tests/unit/Calculator.test.js`

Tests the core mathematical operations:
- ✅ Addition with positive, negative, decimal numbers
- ✅ Subtraction with various number combinations
- ✅ Multiplication including zero and negative cases
- ✅ Division with proper error handling for division by zero
- ✅ Logging functionality verification
- ✅ Edge cases and floating-point precision

**Example Test:**
```javascript
test('should add two positive numbers correctly', () => {
  const result = calculator.add(5, 3);
  expect(result).toBe(8);
});
```

### 2. Unit Tests - Calculator Controller

**File:** `tests/unit/calculatorController.test.js`

Tests the HTTP request/response logic:
- ✅ Parameter validation and parsing
- ✅ Error handling for invalid inputs
- ✅ Proper HTTP status codes
- ✅ JSON response formatting
- ✅ Calculator integration
- ✅ Exception handling

**Example Test:**
```javascript
test('should successfully add two valid numbers', async () => {
  mockRequest.query = { num1: '5', num2: '3' };
  mockCalculator.add.mockReturnValue(8);

  await calculatorController.addNumbers(mockRequest, mockResponse);

  expect(mockResponse.status).toHaveBeenCalledWith(200);
  expect(mockResponse.json).toHaveBeenCalledWith({
    operation: "addition",
    num1: 5,
    num2: 3,
    result: 8
  });
});
```

### 3. Integration Tests - API Routes

**File:** `tests/integration/calculatorRoutes.test.js`

Tests the complete API functionality:
- ✅ Full HTTP request/response cycle
- ✅ All four mathematical operations
- ✅ Query parameter handling
- ✅ Error responses with proper status codes
- ✅ Edge cases and complex scenarios
- ✅ Concurrent request handling

**Example Test:**
```javascript
test('should add two positive numbers successfully', async () => {
  const response = await request(app)
    .get('/calculator/add?num1=5&num2=3')
    .expect(200);

  expect(response.body).toEqual({
    operation: "addition",
    num1: 5,
    num2: 3,
    result: 8
  });
});
```

## 🔍 Test Categories

### Basic Operations Testing
- Addition: `5 + 3 = 8`
- Subtraction: `10 - 3 = 7`
- Multiplication: `6 × 7 = 42`
- Division: `20 ÷ 4 = 5`

### Edge Cases Testing
- Decimal numbers: `3.5 + 2.7 = 6.2`
- Negative numbers: `-5 + (-3) = -8`
- Zero operations: `5 × 0 = 0`
- Division by zero: `10 ÷ 0 → Error`

### Error Handling Testing
- Invalid parameters: `abc + 5 → 400 Error`
- Missing parameters: `5 + → 400 Error`
- Division by zero: `10 ÷ 0 → 400 Error`

### API Integration Testing
- HTTP status codes
- JSON response format
- Route parameter validation
- Concurrent requests

## 📈 Test Coverage

The test suite provides comprehensive coverage:

- **Calculator Library:** 100% function coverage
- **Controller Logic:** 100% branch coverage
- **API Routes:** 100% endpoint coverage
- **Error Handling:** All error paths tested

### Coverage Report Example
```
---------------------------|---------|----------|---------|---------|
File                      | % Stmts | % Branch | % Funcs | % Lines |
---------------------------|---------|----------|---------|---------|
All files                 |     100 |      100 |     100 |     100 |
 controllers               |     100 |      100 |     100 |     100 |
  calculatorController.js  |     100 |      100 |     100 |     100 |
 libraries                 |     100 |      100 |     100 |     100 |
  Calculator.js            |     100 |      100 |     100 |     100 |
 routes                    |     100 |      100 |     100 |     100 |
  calculatorRoutes.js      |     100 |      100 |     100 |     100 |
---------------------------|---------|----------|---------|---------|
```

## 🧰 Testing Tools

### Jest Framework
- **Unit Testing:** Individual function testing
- **Mocking:** Isolated component testing
- **Assertions:** Comprehensive expectation library
- **Coverage:** Built-in code coverage reporting

### Supertest
- **HTTP Testing:** Real API request testing
- **Integration Testing:** End-to-end route testing
- **Response Validation:** Status codes and JSON verification

### Custom Test Utilities
- **Mock Helpers:** Request/response object creation
- **Test Setup:** Global configuration and cleanup
- **Precision Helpers:** Floating-point comparison utilities

## 🎯 Test Scenarios

### Successful Operations
```bash
GET /calculator/add?num1=5&num2=3        → 200: {"result": 8}
GET /calculator/subtract?num1=10&num2=3  → 200: {"result": 7}
GET /calculator/multiply?num1=6&num2=7   → 200: {"result": 42}
GET /calculator/divide?num1=20&num2=4    → 200: {"result": 5}
```

### Error Cases
```bash
GET /calculator/add?num1=abc&num2=3      → 400: {"error": "Invalid numbers"}
GET /calculator/divide?num1=10&num2=0    → 400: {"error": "Division by zero"}
GET /calculator/add?num1=5               → 400: {"error": "Invalid numbers"}
```

### Complex Scenarios
```bash
# Decimal precision
GET /calculator/divide?num1=22&num2=7    → 200: {"result": 3.142857...}

# Large numbers
GET /calculator/multiply?num1=999999&num2=888888 → 200: {"result": 888887111112}

# Scientific notation
GET /calculator/add?num1=1e2&num2=2e3    → 200: {"result": 2100}
```

## 🚦 Continuous Integration

### Development Workflow
1. **Write Code:** Implement new functionality
2. **Write Tests:** Add corresponding test cases
3. **Run Tests:** `npm run test:watch` for immediate feedback
4. **Check Coverage:** `npm run test:coverage` for completeness
5. **Commit:** Only commit when all tests pass

### Test Automation
- **Pre-commit hooks:** Run tests before code commits
- **CI/CD Integration:** Automated testing in deployment pipeline
- **Coverage Gates:** Maintain minimum coverage thresholds

## 🏆 Benefits of This Testing Approach

### 1. **Confidence in Code Changes**
- Immediate feedback when modifications break functionality
- Safe refactoring with comprehensive test coverage
- Early detection of regression bugs

### 2. **Documentation Through Tests**
- Tests serve as living documentation
- Clear examples of expected behavior
- API usage examples for developers

### 3. **Professional Development Practices**
- Industry-standard testing methodologies
- Test-driven development (TDD) capabilities
- Quality assurance integration

### 4. **Maintainable Codebase**
- Easier debugging with isolated test failures
- Clear separation of concerns in testing
- Scalable testing architecture

## 🔧 Extending the Tests

### Adding New Operations
1. **Add Library Method:** Implement in `Calculator.js`
2. **Add Controller Function:** Handle HTTP logic in `calculatorController.js`
3. **Add Route:** Define endpoint in `calculatorRoutes.js`
4. **Write Unit Tests:** Test library and controller separately
5. **Write Integration Tests:** Test complete API functionality

### Test Categories to Maintain
- **Happy Path:** Expected successful operations
- **Edge Cases:** Boundary conditions and special values
- **Error Cases:** Invalid inputs and error conditions
- **Performance:** Response time and concurrent handling

This comprehensive testing approach ensures that the Calculator API is robust, reliable, and maintainable while following professional development practices.