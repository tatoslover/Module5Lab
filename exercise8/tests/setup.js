// Jest setup configuration for Exercise 8 tests
const { TextEncoder, TextDecoder } = require('util');

// Polyfill for Node.js environments that might not have these globals
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock console methods during tests to reduce noise
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Suppress console output during tests unless NODE_ENV is 'test-verbose'
  if (process.env.NODE_ENV !== 'test-verbose') {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
  }
});

afterAll(() => {
  // Restore console methods
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Global test timeout
jest.setTimeout(10000);

// Mock axios responses for testing
const mockAxiosResponses = {
  products: [
    {
      id: 1,
      title: "Test Product 1",
      price: 29.99,
      description: "A test product for unit testing",
      category: "electronics",
      image: "https://example.com/image1.jpg",
      rating: { rate: 4.5, count: 100 }
    },
    {
      id: 2,
      title: "Test Product 2",
      price: 19.99,
      description: "Another test product",
      category: "clothing",
      image: "https://example.com/image2.jpg",
      rating: { rate: 3.8, count: 50 }
    }
  ],
  categories: ["electronics", "clothing", "jewelery"],
  singleProduct: {
    id: 1,
    title: "Test Product 1",
    price: 29.99,
    description: "A test product for unit testing",
    category: "electronics",
    image: "https://example.com/image1.jpg",
    rating: { rate: 4.5, count: 100 }
  }
};

// Helper function to mock axios
function mockAxios() {
  const axios = require('axios');
  
  axios.get = jest.fn().mockImplementation((url) => {
    if (url.includes('/products/categories')) {
      return Promise.resolve({ data: mockAxiosResponses.categories });
    } else if (url.includes('/products/1')) {
      return Promise.resolve({ data: mockAxiosResponses.singleProduct });
    } else if (url.includes('/products')) {
      return Promise.resolve({ data: mockAxiosResponses.products });
    }
    
    return Promise.reject(new Error(`Mock axios: No mock response for ${url}`));
  });
  
  return axios;
}

// Helper function to create test request/response objects
function createMockReqRes() {
  const req = {
    params: {},
    query: {},
    body: {},
    headers: {}
  };
  
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    sendFile: jest.fn().mockReturnThis()
  };
  
  return { req, res };
}

// Helper function to reset all mocks
function resetMocks() {
  jest.clearAllMocks();
  jest.resetModules();
}

// Export test utilities
global.mockAxios = mockAxios;
global.createMockReqRes = createMockReqRes;
global.resetMocks = resetMocks;
global.mockAxiosResponses = mockAxiosResponses;

// Shared test data
global.testData = {
  validProductId: 1,
  invalidProductId: 999,
  validCategory: 'electronics',
  invalidCategory: 'nonexistent',
  searchQuery: 'test',
  priceRange: { min: 10, max: 50 }
};

module.exports = {
  mockAxios,
  createMockReqRes,
  resetMocks,
  mockAxiosResponses,
  testData: global.testData
};