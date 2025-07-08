// Calculator Progression JavaScript
// Handles navigation between stages and calculator functionality

// Global variables
let currentStage = "basic-api";
let sessionId = null;
let calculationHistory = [];

// API base URL - adjust based on your server setup
const API_BASE_URL = "http://localhost:3004";

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  generateSessionId();
  setupKeyboardListeners();

  // Show initial stage
  showStage("basic-api");
});

// Navigation Functions
function initializeNavigation() {
  const stageMarkers = document.querySelectorAll(".stage-marker");

  stageMarkers.forEach((marker) => {
    marker.addEventListener("click", function () {
      const stage = this.dataset.stage;
      showStage(stage);
    });
  });
}

function showStage(stageName) {
  // Hide all stages
  document.querySelectorAll(".stage-content").forEach((stage) => {
    stage.classList.remove("active");
  });

  // Remove active class from all markers
  document.querySelectorAll(".stage-marker").forEach((marker) => {
    marker.classList.remove("active");
  });

  // Show selected stage
  document.getElementById(stageName).classList.add("active");

  // Mark selected stage as active
  document.querySelector(`[data-stage="${stageName}"]`).classList.add("active");

  currentStage = stageName;

  // Initialize stage-specific functionality
  if (stageName === "testing") {
    initializeTestingStage();
  } else if (stageName === "enterprise") {
    initializeEnterpriseStage();
  }
}

// Stage 1: Basic API Testing
async function testAPI(operation) {
  const num1 = parseFloat(document.getElementById("api-num1").value);
  const num2 = parseFloat(document.getElementById("api-num2").value);
  const responseDisplay = document.getElementById("api-response");

  if (isNaN(num1) || isNaN(num2)) {
    responseDisplay.className = "api-response placeholder";
    responseDisplay.innerHTML = "Please enter valid numbers for both fields";
    return;
  }

  // Show loading
  responseDisplay.className = "api-response";
  responseDisplay.innerHTML =
    "Making API call to /calculator/" + operation + "...";

  // Simulate API delay
  setTimeout(() => {
    try {
      const result = simulateAPIResponse(operation, num1, num2);

      // Display realistic API response
      const responseText = `HTTP/1.1 ${result.status} ${result.statusText}
Content-Type: application/json
X-Powered-By: Express
Access-Control-Allow-Origin: *

${JSON.stringify(result.data, null, 2)}`;

      responseDisplay.innerHTML = responseText;

      // Add highlight animation
      responseDisplay.classList.add("highlight");
      setTimeout(() => responseDisplay.classList.remove("highlight"), 500);
    } catch (error) {
      const errorResponse = `HTTP/1.1 400 Bad Request
Content-Type: application/json
X-Powered-By: Express

{
  "error": "${error.message}",
  "operation": "${operation}",
  "timestamp": "${new Date().toISOString()}"
}`;
      responseDisplay.innerHTML = errorResponse;
    }
  }, 800); // Simulate network delay
}

// Stage 2: Frontend Calculator
async function performCalculation(operation) {
  const num1 = parseFloat(document.getElementById("ui-num1").value);
  const num2 = parseFloat(document.getElementById("ui-num2").value);
  const operationDisplay = document.getElementById("ui-operation");
  const resultDisplay = document.getElementById("ui-result");

  if (isNaN(num1) || isNaN(num2)) {
    resultDisplay.innerHTML =
      '<span class="error">Please enter valid numbers</span>';
    return;
  }

  // Show operation
  const operationSymbols = {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷",
  };

  operationDisplay.innerHTML = `${num1} ${operationSymbols[operation]} ${num2} =`;
  resultDisplay.innerHTML = '<div class="loading"></div>';

  try {
    const response = await fetch(
      `${API_BASE_URL}/calculator/${operation}?num1=${num1}&num2=${num2}`,
    );
    const data = await response.json();

    if (response.ok) {
      resultDisplay.innerHTML = data.result;
      resultDisplay.classList.add("success");
    } else {
      resultDisplay.innerHTML = `Error: ${data.error}`;
      resultDisplay.classList.add("error");
    }

    // Add to history
    calculationHistory.push({
      operation: `${num1} ${operationSymbols[operation]} ${num2}`,
      result: data.result || "Error",
      timestamp: new Date(),
    });
  } catch (error) {
    // Fallback to offline mode
    const offlineResult = performOfflineCalculation(operation, num1, num2);
    if (offlineResult.error) {
      resultDisplay.innerHTML = `Error: ${offlineResult.error}`;
      resultDisplay.classList.add("error");
    } else {
      resultDisplay.innerHTML = `${offlineResult.result} (Offline)`;
      resultDisplay.classList.add("success");
    }

    // Add to history
    calculationHistory.push({
      operation: `${num1} ${operationSymbols[operation]} ${num2}`,
      result: offlineResult.result || "Error",
      timestamp: new Date(),
    });
  }
}

// Stage 3: Testing Interface
function initializeTestingStage() {
  // Reset test results
  document.getElementById("test-results").innerHTML =
    '<div class="test-placeholder">Click "Run All Tests" to see test execution</div>';
}

async function runTests() {
  const testResults = document.getElementById("test-results");
  testResults.innerHTML = '<div class="loading"></div> Running tests...';

  // Simulate test execution
  setTimeout(() => {
    const testOutput = `
<div class="test-output">
PASS  tests/calculator.test.js
  ✓ should add two positive numbers correctly (5ms)
  ✓ should subtract numbers successfully (3ms)
  ✓ should multiply numbers correctly (2ms)
  ✓ should divide numbers successfully (4ms)
  ✓ should return 400 for division by zero (8ms)
  ✓ should return 400 for invalid inputs (6ms)
  ✓ should handle decimal division correctly (3ms)
  ✓ should handle large number operations (7ms)

PASS  tests/routes.test.js
  ✓ should respond to GET /calculator/add (12ms)
  ✓ should respond to GET /calculator/subtract (8ms)
  ✓ should respond to GET /calculator/multiply (9ms)
  ✓ should respond to GET /calculator/divide (11ms)

Test Suites: 2 passed, 2 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        2.847s
Ran all test suites.

Coverage Summary:
Statements   : 100% (24/24)
Branches     : 100% (8/8)
Functions    : 100% (6/6)
Lines        : 100% (24/24)
</div>
        `;

    testResults.innerHTML = testOutput;
  }, 2000);
}

async function runCoverage() {
  const testResults = document.getElementById("test-results");
  testResults.innerHTML =
    '<div class="loading"></div> Generating coverage report...';

  setTimeout(() => {
    const coverageOutput = `
<div class="coverage-output">
================== Coverage Report ==================

File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|------------------
All files           |   100   |   100    |   100   |   100   |
 calculator.js      |   100   |   100    |   100   |   100   |
 routes.js          |   100   |   100    |   100   |   100   |
 controllers.js     |   100   |   100    |   100   |   100   |
--------------------|---------|----------|---------|---------|------------------

✅ All files have 100% test coverage
✅ No uncovered lines detected
✅ All edge cases tested
✅ Error handling verified

Total test execution time: 2.847s
</div>
        `;

    testResults.innerHTML = coverageOutput;
  }, 1500);
}

// Stage 4: Enterprise Calculator
function initializeEnterpriseStage() {
  updateSessionInfo();
  clearLogs();
}

function generateSessionId() {
  // Generate a unique session ID
  sessionId =
    "calc_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
}

function updateSessionInfo() {
  const sessionInfo = document.getElementById("session-info");
  if (sessionInfo) {
    sessionInfo.innerHTML = `Session ID: ${sessionId} | Started: ${new Date().toLocaleTimeString()}`;
  }
}

async function performEnterpriseCalculation(operation) {
  const num1 = parseFloat(document.getElementById("ent-num1").value);
  const num2 = parseFloat(document.getElementById("ent-num2").value);
  const operationDisplay = document.getElementById("ent-operation");
  const resultDisplay = document.getElementById("ent-result");

  if (isNaN(num1) || (isNaN(num2) && operation !== "sqrt")) {
    resultDisplay.innerHTML =
      '<span class="error">Please enter valid numbers</span>';
    return;
  }

  // Log the operation start
  logOperation("INFO", `Starting ${operation} calculation`, {
    num1,
    num2,
    sessionId,
  });

  // Show operation
  let operationText = "";
  let calculationResult = 0;

  try {
    switch (operation) {
      case "add":
        operationText = `${num1} + ${num2} =`;
        calculationResult = num1 + num2;
        break;
      case "subtract":
        operationText = `${num1} - ${num2} =`;
        calculationResult = num1 - num2;
        break;
      case "multiply":
        operationText = `${num1} × ${num2} =`;
        calculationResult = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          throw new Error("Division by zero");
        }
        operationText = `${num1} ÷ ${num2} =`;
        calculationResult = num1 / num2;
        break;
      case "power":
        operationText = `${num1}^${num2} =`;
        calculationResult = Math.pow(num1, num2);
        break;
      case "sqrt":
        if (num1 < 0) {
          throw new Error("Cannot calculate square root of negative number");
        }
        operationText = `√${num1} =`;
        calculationResult = Math.sqrt(num1);
        break;
    }

    operationDisplay.innerHTML = operationText;
    resultDisplay.innerHTML = calculationResult;
    resultDisplay.classList.remove("error");
    resultDisplay.classList.add("success");

    // Log successful calculation
    logOperation("INFO", `Calculation completed successfully`, {
      operation: operationText,
      result: calculationResult,
      sessionId,
    });
  } catch (error) {
    operationDisplay.innerHTML = `Error in ${operation}:`;
    resultDisplay.innerHTML = error.message;
    resultDisplay.classList.remove("success");
    resultDisplay.classList.add("error");

    // Log error
    logOperation("ERROR", `Calculation failed: ${error.message}`, {
      operation,
      num1,
      num2,
      sessionId,
    });
  }
}

function performChainCalculation() {
  const num1 = parseFloat(document.getElementById("ent-num1").value);
  const num2 = parseFloat(document.getElementById("ent-num2").value);

  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById("ent-result").innerHTML =
      '<span class="error">Please enter valid numbers</span>';
    return;
  }

  // Simulate chained operations
  logOperation("INFO", "Starting chained calculation", {
    num1,
    num2,
    sessionId,
  });

  const step1 = num1 + num2;
  const step2 = step1 * 2;
  const step3 = Math.sqrt(step2);

  document.getElementById("ent-operation").innerHTML =
    `(${num1} + ${num2}) × 2 = ${step2}, √${step2} =`;
  document.getElementById("ent-result").innerHTML = step3.toFixed(4);

  logOperation("INFO", "Chained calculation completed", {
    steps: [
      { operation: "add", input: [num1, num2], result: step1 },
      { operation: "multiply", input: [step1, 2], result: step2 },
      { operation: "sqrt", input: [step2], result: step3 },
    ],
    finalResult: step3,
    sessionId,
  });
}

function logOperation(level, message, data = {}) {
  const logContent = document.getElementById("log-content");
  const timestamp = new Date().toISOString();

  const logEntry = document.createElement("div");
  logEntry.className = "log-entry";

  logEntry.innerHTML = `
        <span class="log-timestamp">[${timestamp}]</span>
        <span class="log-level ${level}">${level}</span>
        <span class="log-message">${message}</span>
        ${Object.keys(data).length > 0 ? `<span class="log-data">${JSON.stringify(data)}</span>` : ""}
    `;

  // Remove placeholder if it exists
  const placeholder = logContent.querySelector(".log-placeholder");
  if (placeholder) {
    placeholder.remove();
  }

  logContent.appendChild(logEntry);
  logContent.scrollTop = logContent.scrollHeight;
}

function clearLogs() {
  const logContent = document.getElementById("log-content");
  logContent.innerHTML =
    '<div class="log-placeholder">Perform calculations to see live logs</div>';
}

// Keyboard Support
function setupKeyboardListeners() {
  document.addEventListener("keydown", function (event) {
    // Enter key for calculations
    if (event.key === "Enter") {
      const activeStage = document.querySelector(".stage-content.active");
      if (activeStage) {
        const addButton = activeStage.querySelector(".add-btn");
        if (addButton) {
          addButton.click();
        }
      }
    }
  });
}

// Utility Functions
function formatNumber(num) {
  if (typeof num !== "number") return num;
  return num % 1 === 0 ? num.toString() : num.toFixed(4);
}

function validateInput(value) {
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
}

function simulateAPIResponse(operation, num1, num2) {
  try {
    let result;

    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          throw new Error("Division by zero is not allowed");
        }
        result = num1 / num2;
        break;
      default:
        throw new Error("Invalid operation");
    }

    return {
      status: 200,
      statusText: "OK",
      data: {
        result: formatNumber(result),
        operation: operation,
        num1: num1,
        num2: num2,
        timestamp: new Date().toISOString(),
        server: "Calculator API",
        port: 3004,
      },
    };
  } catch (error) {
    return {
      status: 400,
      statusText: "Bad Request",
      data: {
        error: error.message,
        operation: operation,
        num1: num1,
        num2: num2,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

function performOfflineCalculation(operation, num1, num2) {
  try {
    let result;

    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "subtract":
        result = num1 - num2;
        break;
      case "multiply":
        result = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          return { error: "Division by zero is not allowed" };
        }
        result = num1 / num2;
        break;
      default:
        return { error: "Invalid operation" };
    }

    return {
      result: formatNumber(result),
      operation: operation,
      num1: num1,
      num2: num2,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return { error: error.message };
  }
}

// Error Handling
window.addEventListener("error", function (event) {
  console.error("JavaScript Error:", event.error);
  logOperation("ERROR", `JavaScript Error: ${event.error.message}`, {
    stack: event.error.stack,
    sessionId,
  });
});

// Performance Monitoring
function measurePerformance(operation, func) {
  const start = performance.now();
  const result = func();
  const end = performance.now();

  logOperation(
    "DEBUG",
    `Performance: ${operation} took ${(end - start).toFixed(2)}ms`,
    {
      operation,
      duration: end - start,
      sessionId,
    },
  );

  return result;
}

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    testAPI,
    performCalculation,
    performEnterpriseCalculation,
    validateInput,
    formatNumber,
  };
}
