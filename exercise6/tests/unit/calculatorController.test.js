const calculatorController = require('../../controllers/calculatorController');

describe('Calculator Controller Unit Tests', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Create mock request object
    mockRequest = {
      query: {}
    };

    // Create mock response object
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('addNumbers Controller', () => {
    test('should successfully add two valid numbers', async () => {
      mockRequest.query = { num1: '5', num2: '3' };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "addition",
        num1: 5,
        num2: 3,
        result: 8
      });
    });

    test('should handle decimal numbers correctly', async () => {
      mockRequest.query = { num1: '3.5', num2: '2.7' };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: "addition",
          num1: 3.5,
          num2: 2.7,
          result: expect.closeTo(6.2)
        })
      );
    });

    test('should return error for invalid num1', async () => {
      mockRequest.query = { num1: 'abc', num2: '3' };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    });

    test('should return error for invalid num2', async () => {
      mockRequest.query = { num1: '5', num2: 'xyz' };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    });

    test('should return error for missing parameters', async () => {
      mockRequest.query = { num1: '5' };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('subtractNumbers Controller', () => {
    test('should successfully subtract two valid numbers', async () => {
      mockRequest.query = { num1: '10', num2: '3' };

      await calculatorController.subtractNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "subtraction",
        num1: 10,
        num2: 3,
        result: 7
      });
    });

    test('should handle negative results', async () => {
      mockRequest.query = { num1: '3', num2: '10' };

      await calculatorController.subtractNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "subtraction",
        num1: 3,
        num2: 10,
        result: -7
      });
    });

    test('should return error for invalid parameters', async () => {
      mockRequest.query = { num1: 'invalid', num2: '3' };

      await calculatorController.subtractNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('multiplyNumbers Controller', () => {
    test('should successfully multiply two valid numbers', async () => {
      mockRequest.query = { num1: '6', num2: '7' };

      await calculatorController.multiplyNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "multiplication",
        num1: 6,
        num2: 7,
        result: 42
      });
    });

    test('should handle multiplication by zero', async () => {
      mockRequest.query = { num1: '5', num2: '0' };

      await calculatorController.multiplyNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "multiplication",
        num1: 5,
        num2: 0,
        result: 0
      });
    });

    test('should handle negative number multiplication', async () => {
      mockRequest.query = { num1: '-4', num2: '5' };

      await calculatorController.multiplyNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "multiplication",
        num1: -4,
        num2: 5,
        result: -20
      });
    });

    test('should return error for invalid parameters', async () => {
      mockRequest.query = { num1: '6', num2: 'not-a-number' };

      await calculatorController.multiplyNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('divideNumbers Controller', () => {
    test('should successfully divide two valid numbers', async () => {
      mockRequest.query = { num1: '20', num2: '4' };

      await calculatorController.divideNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "division",
        num1: 20,
        num2: 4,
        result: 5
      });
    });

    test('should handle decimal division results', async () => {
      mockRequest.query = { num1: '22', num2: '7' };

      await calculatorController.divideNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: "division",
          num1: 22,
          num2: 7,
          result: expect.closeTo(3.142857, 5)
        })
      );
    });

    test('should return error for division by zero', async () => {
      mockRequest.query = { num1: '10', num2: '0' };

      await calculatorController.divideNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Division by zero",
        message: "Cannot divide by zero"
      });
    });

    test('should handle negative division', async () => {
      mockRequest.query = { num1: '-20', num2: '4' };

      await calculatorController.divideNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "division",
        num1: -20,
        num2: 4,
        result: -5
      });
    });

    test('should return error for invalid parameters', async () => {
      mockRequest.query = { num1: 'invalid', num2: '4' };

      await calculatorController.divideNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Parameter Edge Cases', () => {
    test('should handle empty query parameters', async () => {
      mockRequest.query = {};

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    test('should handle null query parameters', async () => {
      mockRequest.query = { num1: null, num2: null };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    test('should handle undefined query parameters', async () => {
      mockRequest.query = { num1: undefined, num2: undefined };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });

    test('should handle string representations of numbers', async () => {
      mockRequest.query = { num1: '0', num2: '0' };

      await calculatorController.addNumbers(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        operation: "addition",
        num1: 0,
        num2: 0,
        result: 0
      });
    });
  });
});