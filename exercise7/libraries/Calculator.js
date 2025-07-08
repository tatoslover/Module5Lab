const IdGenerator = require('./IdGenerator');
const Logger = require('./Logger');

class Calculator {
  constructor() {
    this.id = IdGenerator.generateCalculatorId(); // Secure random ID generation
    this.logger = new Logger(this.id, 'INFO'); // Initialize logger with calculator ID
    this.operationCount = 0;
    this.operationHistory = [];
    this.lastResult = null;
    this.chainMode = false;
    
    // Log calculator initialization
    this.logger.logSessionStart('CALCULATOR', { 
      calculatorId: this.id,
      initialState: 'ready'
    });
  }

  #log(operation, num1, num2, result) {
    // Map operation symbols for display
    const symbols = {
      '+': '+',
      '-': '-',
      '*': '×',
      '/': '÷',
      '^': '^'
    };
    
    this.logger.logOperation(
      operation.toUpperCase(), 
      [num1, num2], 
      result, 
      symbols[operation] || operation
    );
  }

  #validateNumbers(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      this.logger.logValidationError('TYPE_CHECK', [num1, num2], 'Both arguments must be numbers');
      throw new Error('Both arguments must be numbers');
    }
    if (isNaN(num1) || isNaN(num2)) {
      this.logger.logValidationError('NAN_CHECK', [num1, num2], 'Arguments cannot be NaN');
      throw new Error('Arguments cannot be NaN');
    }
    if (!isFinite(num1) || !isFinite(num2)) {
      this.logger.logValidationError('FINITE_CHECK', [num1, num2], 'Arguments must be finite numbers');
      throw new Error('Arguments must be finite numbers');
    }
  }

  #recordOperation(operation, num1, num2, result) {
    this.operationCount++;
    this.lastResult = result;
    this.operationHistory.push({
      id: IdGenerator.generateShort(), // Unique ID for each operation
      operationNumber: this.operationCount,
      operation,
      num1,
      num2,
      result,
      timestamp: new Date().toISOString()
    });
    
    // Keep history to last 100 operations to prevent memory issues
    if (this.operationHistory.length > 100) {
      this.operationHistory.shift();
    }
  }

  add(num1, num2) {
    this.#validateNumbers(num1, num2);
    const result = num1 + num2;
    this.#log('+', num1, num2, result);
    this.#recordOperation('add', num1, num2, result);
    return result;
  }

  subtract(num1, num2) {
    this.#validateNumbers(num1, num2);
    const result = num1 - num2;
    this.#log('-', num1, num2, result);
    this.#recordOperation('subtract', num1, num2, result);
    return result;
  }

  multiply(num1, num2) {
    this.#validateNumbers(num1, num2);
    const result = num1 * num2;
    this.#log('*', num1, num2, result);
    this.#recordOperation('multiply', num1, num2, result);
    return result;
  }

  divide(num1, num2) {
    this.#validateNumbers(num1, num2);
    if (num2 === 0) {
      throw new Error("Division by zero is not allowed");
    }
    const result = num1 / num2;
    this.#log('/', num1, num2, result);
    this.#recordOperation('divide', num1, num2, result);
    return result;
  }

  // Enhanced methods for professional calculator functionality
  
  power(base, exponent) {
    this.#validateNumbers(base, exponent);
    const result = Math.pow(base, exponent);
    this.#log('^', base, exponent, result);
    this.#recordOperation('power', base, exponent, result);
    return result;
  }

  sqrt(num) {
    if (typeof num !== 'number' || isNaN(num)) {
      this.logger.logValidationError('SQRT_TYPE_CHECK', num, 'Argument must be a valid number');
      throw new Error('Argument must be a valid number');
    }
    if (num < 0) {
      this.logger.logValidationError('SQRT_NEGATIVE_CHECK', num, 'Cannot calculate square root of negative number');
      throw new Error('Cannot calculate square root of negative number');
    }
    const result = Math.sqrt(num);
    
    // Log sqrt operation
    this.logger.logOperation('SQRT', [num], result, '√');
    
    this.operationCount++;
    this.lastResult = result;
    this.operationHistory.push({
      id: IdGenerator.generateShort(),
      operationNumber: this.operationCount,
      operation: 'sqrt',
      num1: num,
      num2: null,
      result,
      timestamp: new Date().toISOString()
    });
    
    if (this.operationHistory.length > 100) {
      this.operationHistory.shift();
    }
    return result;
  }

  // Chain calculation methods
  
  startChain(initialValue = 0) {
    this.#validateNumbers(initialValue, 0);
    this.chainMode = true;
    this.lastResult = initialValue;
    this.logger.logChain(`Started with ${initialValue}`, initialValue);
    return this;
  }

  chainAdd(num) {
    if (!this.chainMode) {
      this.logger.error('Chain mode not active. Call startChain() first', 'CHAIN_ADD');
      throw new Error('Chain mode not active. Call startChain() first');
    }
    this.lastResult = this.add(this.lastResult, num);
    this.logger.logChain(`Added ${num}`, this.lastResult, 'CONTINUE');
    return this;
  }

  chainSubtract(num) {
    if (!this.chainMode) {
      this.logger.error('Chain mode not active. Call startChain() first', 'CHAIN_SUBTRACT');
      throw new Error('Chain mode not active. Call startChain() first');
    }
    this.lastResult = this.subtract(this.lastResult, num);
    this.logger.logChain(`Subtracted ${num}`, this.lastResult, 'CONTINUE');
    return this;
  }

  chainMultiply(num) {
    if (!this.chainMode) {
      this.logger.error('Chain mode not active. Call startChain() first', 'CHAIN_MULTIPLY');
      throw new Error('Chain mode not active. Call startChain() first');
    }
    this.lastResult = this.multiply(this.lastResult, num);
    this.logger.logChain(`Multiplied by ${num}`, this.lastResult, 'CONTINUE');
    return this;
  }

  chainDivide(num) {
    if (!this.chainMode) {
      this.logger.error('Chain mode not active. Call startChain() first', 'CHAIN_DIVIDE');
      throw new Error('Chain mode not active. Call startChain() first');
    }
    this.lastResult = this.divide(this.lastResult, num);
    this.logger.logChain(`Divided by ${num}`, this.lastResult, 'CONTINUE');
    return this;
  }

  endChain() {
    if (!this.chainMode) {
      this.logger.error('Chain mode not active', 'END_CHAIN');
      throw new Error('Chain mode not active');
    }
    this.chainMode = false;
    const finalResult = this.lastResult;
    this.logger.logChain(`Chain completed`, finalResult, 'FINISHED');
    return finalResult;
  }

  // Utility methods
  
  getHistory() {
    return [...this.operationHistory]; // Return copy to prevent external mutation
  }

  getLastResult() {
    return this.lastResult;
  }

  getOperationCount() {
    return this.operationCount;
  }

  clearHistory() {
    this.operationHistory = [];
    this.operationCount = 0;
    this.lastResult = null;
    this.logger.info('History cleared', null, 'CLEAR_HISTORY');
  }

  getStats() {
    const operations = this.operationHistory.reduce((acc, op) => {
      acc[op.operation] = (acc[op.operation] || 0) + 1;
      return acc;
    }, {});

    return {
      id: this.id,
      idType: 'calculator',
      totalOperations: this.operationCount,
      operationBreakdown: operations,
      lastResult: this.lastResult,
      chainModeActive: this.chainMode,
      historySize: this.operationHistory.length,
      uniqueOperationIds: this.operationHistory.map(op => op.id)
    };
  }

  // Error recovery methods
  
  validateAndRecover(operation, num1, num2) {
    try {
      this.#validateNumbers(num1, num2);
      this.logger.debug(`Validation passed for ${operation}`, [num1, num2], 'VALIDATION');
      return { valid: true, error: null };
    } catch (error) {
      this.logger.error(error, `VALIDATION_${operation.toUpperCase()}`, [num1, num2]);
      return { valid: false, error: error.message };
    }
  }
}

module.exports = Calculator;