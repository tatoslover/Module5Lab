// calculatorController.js
const Calculator = require("../libraries/Calculator");
const calculatorObj = new Calculator();

const addNumbers = (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    const result = calculatorObj.add(num1, num2);
    res.status(200).json({ 
      operation: "addition",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const subtractNumbers = (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    const result = calculatorObj.subtract(num1, num2);
    res.status(200).json({ 
      operation: "subtraction",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const multiplyNumbers = (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    const result = calculatorObj.multiply(num1, num2);
    res.status(200).json({ 
      operation: "multiplication",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const divideNumbers = (req, res) => {
  try {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    if (num2 === 0) {
      return res.status(400).json({ 
        error: "Division by zero",
        message: "Cannot divide by zero"
      });
    }
    
    const result = calculatorObj.divide(num1, num2);
    res.status(200).json({ 
      operation: "division",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

module.exports = { 
  addNumbers, 
  subtractNumbers, 
  multiplyNumbers, 
  divideNumbers 
};