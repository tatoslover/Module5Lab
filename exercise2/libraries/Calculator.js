class Calculator {
  constructor() {
    this.id = Date.now();
  }

  #log(operation, num1, num2, result) {
    console.log(`[Calculator: ${this.id}]: ${num1} ${operation} ${num2} = ${result}`);
  }

  add(num1, num2) {
    const result = num1 + num2;
    this.#log('+', num1, num2, result);
    return result;
  }

  subtract(num1, num2) {
    const result = num1 - num2;
    this.#log('-', num1, num2, result);
    return result;
  }

  multiply(num1, num2) {
    const result = num1 * num2;
    this.#log('*', num1, num2, result);
    return result;
  }

  divide(num1, num2) {
    if (num2 === 0) {
      throw new Error("Division by zero is not allowed");
    }
    const result = num1 / num2;
    this.#log('/', num1, num2, result);
    return result;
  }
}

module.exports = Calculator;