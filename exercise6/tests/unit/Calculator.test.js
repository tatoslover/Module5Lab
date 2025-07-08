const Calculator = require('../../libraries/Calculator');

describe('Calculator Library Unit Tests', () => {
  let calculator;

  beforeEach(() => {
    // Create a new calculator instance for each test
    calculator = new Calculator();
  });

  afterEach(() => {
    // Clean up after each test
    calculator = null;
  });

  describe('Calculator Constructor', () => {
    test('should create a calculator instance with an ID', () => {
      expect(calculator).toBeInstanceOf(Calculator);
      expect(calculator.id).toBeDefined();
      expect(typeof calculator.id).toBe('number');
    });

    test('should create unique IDs for different instances', (done) => {
      setTimeout(() => {
        const calculator2 = new Calculator();
        expect(calculator.id).not.toBe(calculator2.id);
        done();
      }, 1);
    });
  });

  describe('Addition Operation', () => {
    test('should add two positive numbers correctly', () => {
      const result = calculator.add(5, 3);
      expect(result).toBe(8);
    });

    test('should add positive and negative numbers correctly', () => {
      const result = calculator.add(10, -3);
      expect(result).toBe(7);
    });

    test('should add two negative numbers correctly', () => {
      const result = calculator.add(-5, -3);
      expect(result).toBe(-8);
    });

    test('should add zero correctly', () => {
      const result = calculator.add(5, 0);
      expect(result).toBe(5);
    });

    test('should add decimal numbers correctly', () => {
      const result = calculator.add(3.5, 2.7);
      expect(result).toBeCloseTo(6.2);
    });

    test('should handle large numbers', () => {
      const result = calculator.add(999999, 888888);
      expect(result).toBe(1888887);
    });
  });

  describe('Subtraction Operation', () => {
    test('should subtract two positive numbers correctly', () => {
      const result = calculator.subtract(10, 3);
      expect(result).toBe(7);
    });

    test('should subtract negative from positive correctly', () => {
      const result = calculator.subtract(10, -3);
      expect(result).toBe(13);
    });

    test('should subtract positive from negative correctly', () => {
      const result = calculator.subtract(-10, 3);
      expect(result).toBe(-13);
    });

    test('should subtract two negative numbers correctly', () => {
      const result = calculator.subtract(-10, -3);
      expect(result).toBe(-7);
    });

    test('should subtract zero correctly', () => {
      const result = calculator.subtract(5, 0);
      expect(result).toBe(5);
    });

    test('should subtract from zero correctly', () => {
      const result = calculator.subtract(0, 5);
      expect(result).toBe(-5);
    });

    test('should subtract decimal numbers correctly', () => {
      const result = calculator.subtract(5.7, 2.3);
      expect(result).toBeCloseTo(3.4);
    });
  });

  describe('Multiplication Operation', () => {
    test('should multiply two positive numbers correctly', () => {
      const result = calculator.multiply(6, 7);
      expect(result).toBe(42);
    });

    test('should multiply positive and negative numbers correctly', () => {
      const result = calculator.multiply(5, -3);
      expect(result).toBe(-15);
    });

    test('should multiply two negative numbers correctly', () => {
      const result = calculator.multiply(-4, -5);
      expect(result).toBe(20);
    });

    test('should multiply by zero correctly', () => {
      const result = calculator.multiply(5, 0);
      expect(result).toBe(0);
    });

    test('should multiply by one correctly', () => {
      const result = calculator.multiply(5, 1);
      expect(result).toBe(5);
    });

    test('should multiply decimal numbers correctly', () => {
      const result = calculator.multiply(2.5, 4);
      expect(result).toBeCloseTo(10);
    });

    test('should handle large number multiplication', () => {
      const result = calculator.multiply(1000, 2000);
      expect(result).toBe(2000000);
    });
  });

  describe('Division Operation', () => {
    test('should divide two positive numbers correctly', () => {
      const result = calculator.divide(20, 4);
      expect(result).toBe(5);
    });

    test('should divide positive by negative correctly', () => {
      const result = calculator.divide(20, -4);
      expect(result).toBe(-5);
    });

    test('should divide negative by positive correctly', () => {
      const result = calculator.divide(-20, 4);
      expect(result).toBe(-5);
    });

    test('should divide two negative numbers correctly', () => {
      const result = calculator.divide(-20, -4);
      expect(result).toBe(5);
    });

    test('should divide by one correctly', () => {
      const result = calculator.divide(5, 1);
      expect(result).toBe(5);
    });

    test('should handle decimal division correctly', () => {
      const result = calculator.divide(22, 7);
      expect(result).toBeCloseTo(3.142857, 5);
    });

    test('should handle division resulting in decimal', () => {
      const result = calculator.divide(1, 3);
      expect(result).toBeCloseTo(0.333333, 5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => {
        calculator.divide(10, 0);
      }).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing zero by zero', () => {
      expect(() => {
        calculator.divide(0, 0);
      }).toThrow('Division by zero is not allowed');
    });
  });

  describe('Logging Functionality', () => {
    let consoleSpy;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('should log addition operations', () => {
      calculator.add(5, 3);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`[Calculator: ${calculator.id}]: 5 + 3 = 8`)
      );
    });

    test('should log subtraction operations', () => {
      calculator.subtract(10, 3);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`[Calculator: ${calculator.id}]: 10 - 3 = 7`)
      );
    });

    test('should log multiplication operations', () => {
      calculator.multiply(6, 7);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`[Calculator: ${calculator.id}]: 6 * 7 = 42`)
      );
    });

    test('should log division operations', () => {
      calculator.divide(20, 4);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`[Calculator: ${calculator.id}]: 20 / 4 = 5`)
      );
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle very small decimal numbers', () => {
      const result = calculator.add(0.1, 0.2);
      expect(result).toBeCloseTo(0.3);
    });

    test('should handle infinity operations', () => {
      expect(() => {
        calculator.divide(1, 0);
      }).toThrow('Division by zero is not allowed');
    });

    test('should handle negative zero', () => {
      const result = calculator.multiply(-0, 5);
      expect(Object.is(result, -0)).toBe(true);
    });

    test('should maintain precision with multiple operations', () => {
      let result = 10;
      result = calculator.add(result, 5);      // 15
      result = calculator.subtract(result, 3); // 12
      result = calculator.multiply(result, 2); // 24
      result = calculator.divide(result, 4);   // 6
      expect(result).toBe(6);
    });
  });
});