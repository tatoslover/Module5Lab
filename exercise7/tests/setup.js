// Jest setup file for Exercise 7 Enhanced Calculator Tests
// This file runs before all tests to set up the testing environment

// Increase timeout for integration tests
jest.setTimeout(10000);

// Mock console.log to avoid cluttering test output
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

// Add custom Jest matchers
expect.extend({
  closeTo(received, expected, precision = 5) {
    const pass = Math.abs(received - expected) < Math.pow(10, -precision);
    if (pass) {
      return {
        message: () => `expected ${received} not to be close to ${expected}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be close to ${expected}`,
        pass: false,
      };
    }
  },
});

// Global test utilities
global.testUtils = {
  // Helper function to create mock request objects
  createMockRequest: (query = {}) => ({
    query,
    params: {},
    body: {},
    headers: {}
  }),

  // Helper function to create mock response objects
  createMockResponse: () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  },

  // Helper function to check if a number is close to expected (for floating point comparisons)
  expectClose: (actual, expected, precision = 5) => {
    expect(actual).toBeCloseTo(expected, precision);
  }
};

// Set up test database or mock data if needed
beforeEach(() => {
  // Reset any global state before each test
  jest.clearAllMocks();
});

// Clean up after each test
afterEach(() => {
  // Perform any necessary cleanup
});