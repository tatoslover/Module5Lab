const request = require('supertest');
const app = require('../../app');

describe('Calculator API Integration Tests', () => {
  describe('GET /calculator/add', () => {
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

    test('should add decimal numbers correctly', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=3.5&num2=2.7')
        .expect(200);

      expect(response.body.operation).toBe("addition");
      expect(response.body.num1).toBe(3.5);
      expect(response.body.num2).toBe(2.7);
      expect(response.body.result).toBeCloseTo(6.2);
    });

    test('should add negative numbers correctly', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=-5&num2=-3')
        .expect(200);

      expect(response.body).toEqual({
        operation: "addition",
        num1: -5,
        num2: -3,
        result: -8
      });
    });

    test('should handle adding zero', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=10&num2=0')
        .expect(200);

      expect(response.body).toEqual({
        operation: "addition",
        num1: 10,
        num2: 0,
        result: 10
      });
    });

    test('should return 400 for invalid num1', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=abc&num2=3')
        .expect(400);

      expect(response.body).toEqual({
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    });

    test('should return 400 for invalid num2', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=5&num2=xyz')
        .expect(400);

      expect(response.body).toEqual({
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    });

    test('should return 400 for missing parameters', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=5')
        .expect(400);

      expect(response.body.error).toBe("Invalid numbers provided");
    });
  });

  describe('GET /calculator/subtract', () => {
    test('should subtract two positive numbers successfully', async () => {
      const response = await request(app)
        .get('/calculator/subtract?num1=10&num2=3')
        .expect(200);

      expect(response.body).toEqual({
        operation: "subtraction",
        num1: 10,
        num2: 3,
        result: 7
      });
    });

    test('should handle negative results', async () => {
      const response = await request(app)
        .get('/calculator/subtract?num1=3&num2=10')
        .expect(200);

      expect(response.body).toEqual({
        operation: "subtraction",
        num1: 3,
        num2: 10,
        result: -7
      });
    });

    test('should subtract decimal numbers correctly', async () => {
      const response = await request(app)
        .get('/calculator/subtract?num1=5.7&num2=2.3')
        .expect(200);

      expect(response.body.operation).toBe("subtraction");
      expect(response.body.num1).toBe(5.7);
      expect(response.body.num2).toBe(2.3);
      expect(response.body.result).toBeCloseTo(3.4);
    });

    test('should subtract negative numbers correctly', async () => {
      const response = await request(app)
        .get('/calculator/subtract?num1=-5&num2=-3')
        .expect(200);

      expect(response.body).toEqual({
        operation: "subtraction",
        num1: -5,
        num2: -3,
        result: -2
      });
    });

    test('should return 400 for invalid parameters', async () => {
      const response = await request(app)
        .get('/calculator/subtract?num1=invalid&num2=3')
        .expect(400);

      expect(response.body.error).toBe("Invalid numbers provided");
    });
  });

  describe('GET /calculator/multiply', () => {
    test('should multiply two positive numbers successfully', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=6&num2=7')
        .expect(200);

      expect(response.body).toEqual({
        operation: "multiplication",
        num1: 6,
        num2: 7,
        result: 42
      });
    });

    test('should multiply by zero correctly', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=5&num2=0')
        .expect(200);

      expect(response.body).toEqual({
        operation: "multiplication",
        num1: 5,
        num2: 0,
        result: 0
      });
    });

    test('should multiply negative numbers correctly', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=-4&num2=5')
        .expect(200);

      expect(response.body).toEqual({
        operation: "multiplication",
        num1: -4,
        num2: 5,
        result: -20
      });
    });

    test('should multiply two negative numbers correctly', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=-4&num2=-5')
        .expect(200);

      expect(response.body).toEqual({
        operation: "multiplication",
        num1: -4,
        num2: -5,
        result: 20
      });
    });

    test('should multiply decimal numbers correctly', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=2.5&num2=4')
        .expect(200);

      expect(response.body.operation).toBe("multiplication");
      expect(response.body.num1).toBe(2.5);
      expect(response.body.num2).toBe(4);
      expect(response.body.result).toBeCloseTo(10);
    });

    test('should handle large number multiplication', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=1000&num2=2000')
        .expect(200);

      expect(response.body).toEqual({
        operation: "multiplication",
        num1: 1000,
        num2: 2000,
        result: 2000000
      });
    });

    test('should return 400 for invalid parameters', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=6&num2=not-a-number')
        .expect(400);

      expect(response.body.error).toBe("Invalid numbers provided");
    });
  });

  describe('GET /calculator/divide', () => {
    test('should divide two positive numbers successfully', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=20&num2=4')
        .expect(200);

      expect(response.body).toEqual({
        operation: "division",
        num1: 20,
        num2: 4,
        result: 5
      });
    });

    test('should handle decimal division results', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=22&num2=7')
        .expect(200);

      expect(response.body.operation).toBe("division");
      expect(response.body.num1).toBe(22);
      expect(response.body.num2).toBe(7);
      expect(response.body.result).toBeCloseTo(3.142857, 5);
    });

    test('should handle division by one', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=42&num2=1')
        .expect(200);

      expect(response.body).toEqual({
        operation: "division",
        num1: 42,
        num2: 1,
        result: 42
      });
    });

    test('should handle negative number division', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=-20&num2=4')
        .expect(200);

      expect(response.body).toEqual({
        operation: "division",
        num1: -20,
        num2: 4,
        result: -5
      });
    });

    test('should handle division of two negative numbers', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=-20&num2=-4')
        .expect(200);

      expect(response.body).toEqual({
        operation: "division",
        num1: -20,
        num2: -4,
        result: 5
      });
    });

    test('should return 400 for division by zero', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=10&num2=0')
        .expect(400);

      expect(response.body).toEqual({
        error: "Division by zero",
        message: "Cannot divide by zero"
      });
    });

    test('should return 400 for invalid parameters', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=invalid&num2=4')
        .expect(400);

      expect(response.body.error).toBe("Invalid numbers provided");
    });

    test('should handle zero divided by number', async () => {
      const response = await request(app)
        .get('/calculator/divide?num1=0&num2=5')
        .expect(200);

      expect(response.body).toEqual({
        operation: "division",
        num1: 0,
        num2: 5,
        result: 0
      });
    });
  });

  describe('API General Endpoints', () => {
    test('should return welcome message on root endpoint', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toBe("Welcome to Calculator API with Tests!");
      expect(response.body.server).toBe("Exercise 6 - Calculator Server with Tests");
      expect(response.body.endpoints).toHaveLength(4);
    });

    test('should return health check information', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe("healthy");
      expect(response.body.server).toBe("Exercise 6 - Calculator API with Tests");
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });

    test('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      expect(response.body.error).toBe("Route not found");
      expect(response.body.suggestion).toContain("Try /calculator/add");
    });

    test('should return 404 for invalid calculator operations', async () => {
      const response = await request(app)
        .get('/calculator/power?num1=2&num2=3')
        .expect(404);

      expect(response.body.error).toBe("Route not found");
    });
  });

  describe('Edge Cases and Complex Scenarios', () => {
    test('should handle very large numbers', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=999999999&num2=888888888')
        .expect(200);

      expect(response.body.result).toBe(1888888887);
    });

    test('should handle very small decimal numbers', async () => {
      const response = await request(app)
        .get('/calculator/multiply?num1=0.0001&num2=0.0002')
        .expect(200);

      expect(response.body.result).toBeCloseTo(0.00000002);
    });

    test('should handle scientific notation inputs', async () => {
      const response = await request(app)
        .get('/calculator/add?num1=1e2&num2=2e3')
        .expect(200);

      expect(response.body).toEqual({
        operation: "addition",
        num1: 100,
        num2: 2000,
        result: 2100
      });
    });

    test('should handle sequential operations by chaining results', async () => {
      // First operation: 10 + 5 = 15
      const add_response = await request(app)
        .get('/calculator/add?num1=10&num2=5')
        .expect(200);
      
      const firstResult = add_response.body.result;
      expect(firstResult).toBe(15);

      // Second operation: 15 * 2 = 30
      const multiply_response = await request(app)
        .get(`/calculator/multiply?num1=${firstResult}&num2=2`)
        .expect(200);
      
      const secondResult = multiply_response.body.result;
      expect(secondResult).toBe(30);

      // Third operation: 30 / 6 = 5
      const divide_response = await request(app)
        .get(`/calculator/divide?num1=${secondResult}&num2=6`)
        .expect(200);
      
      expect(divide_response.body.result).toBe(5);
    });

    test('should handle concurrent requests correctly', async () => {
      const requests = [
        request(app).get('/calculator/add?num1=1&num2=1'),
        request(app).get('/calculator/subtract?num1=10&num2=5'),
        request(app).get('/calculator/multiply?num1=3&num2=4'),
        request(app).get('/calculator/divide?num1=20&num2=4')
      ];

      const responses = await Promise.all(requests);

      expect(responses[0].body.result).toBe(2);   // 1 + 1
      expect(responses[1].body.result).toBe(5);   // 10 - 5
      expect(responses[2].body.result).toBe(12);  // 3 * 4
      expect(responses[3].body.result).toBe(5);   // 20 / 4

      // All should be successful
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });
  });
});