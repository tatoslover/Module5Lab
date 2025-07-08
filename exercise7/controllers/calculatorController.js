// calculatorController.js
const Calculator = require("../libraries/Calculator");
const Logger = require("../libraries/Logger");

// Create a shared calculator instance and controller logger
const calculatorObj = new Calculator();
const controllerLogger = new Logger('api_controller', 'INFO');

const addNumbers = (req, res) => {
  try {
    controllerLogger.info(`API Request: ADD - Query params: ${JSON.stringify(req.query)}`, null, 'API_REQUEST');
    
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      controllerLogger.logValidationError('API_INPUT', req.query, 'Valid num1 and num2 parameters required');
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    const result = calculatorObj.add(num1, num2);
    controllerLogger.logOperation('API_ADD', [num1, num2], result, '+');
    
    res.status(200).json({ 
      operation: "addition",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    controllerLogger.error(error, 'API_ADD_ERROR', [req.query.num1, req.query.num2]);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const subtractNumbers = (req, res) => {
  try {
    controllerLogger.info(`API Request: SUBTRACT - Query params: ${JSON.stringify(req.query)}`, null, 'API_REQUEST');
    
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      controllerLogger.logValidationError('API_INPUT', req.query, 'Valid num1 and num2 parameters required');
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    const result = calculatorObj.subtract(num1, num2);
    controllerLogger.logOperation('API_SUBTRACT', [num1, num2], result, '-');
    
    res.status(200).json({ 
      operation: "subtraction",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    controllerLogger.error(error, 'API_SUBTRACT_ERROR', [req.query.num1, req.query.num2]);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const multiplyNumbers = (req, res) => {
  try {
    controllerLogger.info(`API Request: MULTIPLY - Query params: ${JSON.stringify(req.query)}`, null, 'API_REQUEST');
    
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      controllerLogger.logValidationError('API_INPUT', req.query, 'Valid num1 and num2 parameters required');
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    const result = calculatorObj.multiply(num1, num2);
    controllerLogger.logOperation('API_MULTIPLY', [num1, num2], result, '×');
    
    res.status(200).json({ 
      operation: "multiplication",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    controllerLogger.error(error, 'API_MULTIPLY_ERROR', [req.query.num1, req.query.num2]);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

const divideNumbers = (req, res) => {
  try {
    controllerLogger.info(`API Request: DIVIDE - Query params: ${JSON.stringify(req.query)}`, null, 'API_REQUEST');
    
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    
    if (isNaN(num1) || isNaN(num2)) {
      controllerLogger.logValidationError('API_INPUT', req.query, 'Valid num1 and num2 parameters required');
      return res.status(400).json({ 
        error: "Invalid numbers provided",
        message: "Please provide valid num1 and num2 parameters"
      });
    }
    
    if (num2 === 0) {
      controllerLogger.logValidationError('DIVISION_BY_ZERO', [num1, num2], 'Cannot divide by zero');
      return res.status(400).json({ 
        error: "Division by zero",
        message: "Cannot divide by zero"
      });
    }
    
    const result = calculatorObj.divide(num1, num2);
    controllerLogger.logOperation('API_DIVIDE', [num1, num2], result, '÷');
    
    res.status(200).json({ 
      operation: "division",
      num1: num1,
      num2: num2,
      result: result
    });
  } catch (error) {
    controllerLogger.error(error, 'API_DIVIDE_ERROR', [req.query.num1, req.query.num2]);
    res.status(500).json({ error: "Internal server error", message: error.message });
  }
};

module.exports = { 
  addNumbers, 
  subtractNumbers, 
  multiplyNumbers, 
  divideNumbers 
};