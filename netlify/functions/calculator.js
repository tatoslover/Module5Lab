exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters } = event;

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed',
        message: 'Only GET requests are supported'
      })
    };
  }

  // Parse the operation from the path
  const pathParts = path.split('/');
  const operation = pathParts[pathParts.length - 1];

  // Extract query parameters
  const { num1, num2 } = queryStringParameters || {};

  // Validate inputs
  if (!num1 || !num2) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Missing parameters',
        message: 'Both num1 and num2 are required',
        usage: 'Add query parameters: ?num1=5&num2=3'
      })
    };
  }

  // Convert to numbers
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);

  // Validate numbers
  if (isNaN(number1) || isNaN(number2)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Invalid numbers',
        message: 'Both num1 and num2 must be valid numbers',
        received: { num1, num2 }
      })
    };
  }

  let result;
  let operationSymbol;

  try {
    switch (operation) {
      case 'add':
        result = number1 + number2;
        operationSymbol = '+';
        break;
      case 'subtract':
        result = number1 - number2;
        operationSymbol = '-';
        break;
      case 'multiply':
        result = number1 * number2;
        operationSymbol = '×';
        break;
      case 'divide':
        if (number2 === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: 'Division by zero',
              message: 'Cannot divide by zero',
              operation: 'divide',
              inputs: { num1: number1, num2: number2 }
            })
          };
        }
        result = number1 / number2;
        operationSymbol = '÷';
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid operation',
            message: 'Supported operations: add, subtract, multiply, divide',
            requested: operation,
            usage: 'Use /calculator/add, /calculator/subtract, /calculator/multiply, or /calculator/divide'
          })
        };
    }

    // Round to avoid floating point precision issues
    result = Math.round(result * 1000000) / 1000000;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        operation,
        operationSymbol,
        num1: number1,
        num2: number2,
        result,
        expression: `${number1} ${operationSymbol} ${number2} = ${result}`,
        timestamp: new Date().toISOString(),
        server: 'Netlify Functions - Calculator API'
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
        operation,
        inputs: { num1: number1, num2: number2 }
      })
    };
  }
};
