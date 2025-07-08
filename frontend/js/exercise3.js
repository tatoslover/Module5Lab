// Static calculator for Exercise 3 - pure client-side, no API calls
const API_BASE_URL = "CLIENT_SIDE"; // No longer using external API

// Operation symbols for display
const operationSymbols = {
  add: "+",
  subtract: "-",
  multiply: "×",
  divide: "÷",
};

// Calculator state
const calculatorState = {
  history: [],
  lastResult: null,
  currentOperation: null,
};

// Pure client-side calculation function
async function performOperation(operation) {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const resultDisplay = document.getElementById("result");
  const operationDisplay = document.getElementById("operationDisplay");

  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  // Validation
  if (isNaN(num1) || isNaN(num2)) {
    showResult("Please enter valid numbers", "error");
    operationDisplay.textContent = "Invalid input";
    return;
  }

  // Show loading state briefly for better UX
  showResult("Calculating...", "loading");
  operationDisplay.textContent = `${num1} ${operationSymbols[operation]} ${num2} = ?`;

  // Simulate brief processing time
  await new Promise((resolve) => setTimeout(resolve, 150));

  let result;
  let error = null;

  try {
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
          throw new Error("Cannot divide by zero");
        }
        result = num1 / num2;
        break;
      default:
        throw new Error("Invalid operation");
    }

    // Round to avoid floating point precision issues
    result = Math.round(result * 1000000) / 1000000;

    // Display successful result
    showResult(result, "success");
    operationDisplay.textContent = `${num1} ${operationSymbols[operation]} ${num2} = ${result}`;

    // Store in history
    calculatorState.history.push({
      num1,
      num2,
      operation,
      result,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 10 calculations
    if (calculatorState.history.length > 10) {
      calculatorState.history.shift();
    }

    calculatorState.lastResult = result;
    calculatorState.currentOperation = operation;

    // Log to console for debugging
    console.log(
      `✅ Calculation: ${num1} ${operationSymbols[operation]} ${num2} = ${result}`,
    );
  } catch (err) {
    error = err.message;
    showResult(`Error: ${error}`, "error");
    operationDisplay.textContent = `${num1} ${operationSymbols[operation]} ${num2} = ERROR`;
    console.error("❌ Calculation error:", error);
  }
}

// Function to display results with different styles
function showResult(message, type = "success") {
  const resultDisplay = document.getElementById("result");
  if (!resultDisplay) return;

  resultDisplay.textContent = message;

  // Remove all type classes
  resultDisplay.classList.remove("success", "error", "loading");

  // Add appropriate class
  if (type) {
    resultDisplay.classList.add(type);
  }
}

// Clear all inputs and results
function clearCalculator() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("operationDisplay").textContent = "";
  showResult("Enter numbers and click an operation", "");
}

// Show calculation history
function showHistory() {
  const resultDisplay = document.getElementById("result");
  const operationDisplay = document.getElementById("operationDisplay");

  if (calculatorState.history.length === 0) {
    showResult("No calculations in history", "");
    operationDisplay.textContent = "History is empty";
    return;
  }

  const latest = calculatorState.history.slice(-3);
  const historyText = latest
    .map(
      (calc) =>
        `${calc.num1} ${operationSymbols[calc.operation]} ${calc.num2} = ${calc.result}`,
    )
    .join(" | ");

  operationDisplay.textContent = "Recent: " + historyText;
  showResult(
    `${calculatorState.history.length} calculations in history`,
    "success",
  );
}

// Use last result as first number
function useLastResult() {
  if (calculatorState.lastResult !== null) {
    document.getElementById("num1").value = calculatorState.lastResult;
    document.getElementById("num2").focus();
    showResult("Using last result as first number", "success");
  } else {
    showResult("No previous result available", "error");
  }
}

// Repeat last operation with new numbers
function repeatLastOperation() {
  if (calculatorState.currentOperation) {
    performOperation(calculatorState.currentOperation);
  } else {
    showResult("No previous operation to repeat", "error");
  }
}

// Add keyboard support
function addKeyboardSupport() {
  // Enter key support for inputs
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");

  if (num1Input) {
    num1Input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        if (num2Input) {
          num2Input.focus();
        }
      }
    });
  }

  if (num2Input) {
    num2Input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        // Default to addition when Enter is pressed
        performOperation("add");
      }
    });
  }

  // Global keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Don't interfere with input fields
    if (e.target.tagName === "INPUT") return;

    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "+":
        case "=":
          e.preventDefault();
          performOperation("add");
          break;
        case "-":
          e.preventDefault();
          performOperation("subtract");
          break;
        case "*":
          e.preventDefault();
          performOperation("multiply");
          break;
        case "/":
          e.preventDefault();
          performOperation("divide");
          break;
        case "h":
        case "H":
          e.preventDefault();
          showHistory();
          break;
        case "c":
        case "C":
          e.preventDefault();
          clearCalculator();
          break;
        case "r":
        case "R":
          e.preventDefault();
          useLastResult();
          break;
      }
    }

    // Quick operation keys (without modifier)
    switch (e.key) {
      case "Escape":
        clearCalculator();
        break;
      case "1":
        performOperation("add");
        break;
      case "2":
        performOperation("subtract");
        break;
      case "3":
        performOperation("multiply");
        break;
      case "4":
        performOperation("divide");
        break;
    }
  });
}

// Add button animations
function addButtonAnimations() {
  document.querySelectorAll(".calc-button").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

// Generate random numbers for testing
function generateRandomNumbers() {
  document.getElementById("num1").value = Math.floor(Math.random() * 100) + 1;
  document.getElementById("num2").value = Math.floor(Math.random() * 100) + 1;
  showResult("Random numbers generated", "success");
}

// Initialize with welcome message
function initializeExercise3() {
  console.log("🧮 Exercise 3 - Static Calculator loaded");
  console.log("📊 Pure client-side calculation - no API calls");
  console.log("💡 Keyboard shortcuts:");
  console.log("  - Ctrl/Cmd + = : Addition");
  console.log("  - Ctrl/Cmd + - : Subtraction");
  console.log("  - Ctrl/Cmd + * : Multiplication");
  console.log("  - Ctrl/Cmd + / : Division");
  console.log("  - Ctrl/Cmd + H : Show history");
  console.log("  - Ctrl/Cmd + C : Clear calculator");
  console.log("  - Ctrl/Cmd + R : Use last result");
  console.log("  - 1-4 : Quick operations");
  console.log("  - Escape : Clear all");

  // Set initial state
  showResult("Enter numbers and click an operation", "");

  // Add keyboard support
  addKeyboardSupport();

  // Add button animations
  addButtonAnimations();

  // Show helpful tip after a few seconds
  setTimeout(() => {
    const tips = [
      "Try the keyboard shortcuts!",
      "Press Ctrl+H to see calculation history",
      "Use Ctrl+R to reuse your last result",
      "Generate random numbers for testing",
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    if (
      document.getElementById("result").textContent ===
      "Enter numbers and click an operation"
    ) {
      document.getElementById("operationDisplay").textContent =
        `💡 Tip: ${randomTip}`;
    }
  }, 3000);
}

// Initialize when DOM is loaded
window.addEventListener("load", function () {
  initializeExercise3();
});

// Export functions for global access (if needed)
window.Exercise3Functions = {
  performOperation,
  clearCalculator,
  showHistory,
  useLastResult,
  generateRandomNumbers,
  showResult,
};
