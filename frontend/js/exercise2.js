// Static calculator - pure client-side, no API calls
const Exercise2 = {
  operationSymbols: {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷",
  },

  // Calculator history for demonstration
  history: [],
  maxHistoryItems: 10,
};

// Pure client-side calculation function
async function performOperation(operation) {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const resultDisplay = document.getElementById("resultDisplay");
  const calculationDisplay = document.getElementById("calculationDisplay");

  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  // Input validation
  if (isNaN(num1) || isNaN(num2)) {
    showResult("Please enter valid numbers", "error");
    calculationDisplay.textContent = "Invalid input";
    return;
  }

  // Show loading state briefly for UI feedback
  showResult("Calculating...", "loading");
  calculationDisplay.textContent = `${num1} ${Exercise2.operationSymbols[operation]} ${num2} = ?`;

  // Simulate brief processing time for better UX
  await new Promise((resolve) => setTimeout(resolve, 200));

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

    // Update displays
    showResult(result, "success");
    calculationDisplay.textContent = `${num1} ${Exercise2.operationSymbols[operation]} ${num2} = ${result}`;

    // Add to history
    addToHistory({
      num1,
      num2,
      operation,
      result,
      timestamp: new Date().toISOString(),
    });

    console.log(
      `✅ Calculation successful: ${num1} ${Exercise2.operationSymbols[operation]} ${num2} = ${result}`,
    );
  } catch (err) {
    error = err.message;
    showResult(`Error: ${error}`, "error");
    calculationDisplay.textContent = `${num1} ${Exercise2.operationSymbols[operation]} ${num2} = ERROR`;
    console.error("❌ Calculation error:", error);
  }
}

// Display results with different styles
function showResult(message, type = "success") {
  const resultDisplay = document.getElementById("resultDisplay");
  if (!resultDisplay) return;

  resultDisplay.textContent = message;

  // Remove all type classes
  resultDisplay.classList.remove("success", "error", "loading");

  // Add appropriate class
  if (type) {
    resultDisplay.classList.add(type);
  }

  // Update status indicator
  updateStatusIndicator(type !== "error");
}

// Update the status indicator
function updateStatusIndicator(isOnline) {
  const indicator = document.getElementById("statusIndicator");
  if (indicator) {
    indicator.className = `status-indicator ${isOnline ? "online" : "offline"}`;
  }
}

// Add calculation to history
function addToHistory(calculation) {
  Exercise2.history.unshift(calculation);

  // Keep only the last N items
  if (Exercise2.history.length > Exercise2.maxHistoryItems) {
    Exercise2.history = Exercise2.history.slice(0, Exercise2.maxHistoryItems);
  }

  // Save to localStorage for persistence
  localStorage.setItem("calculatorHistory", JSON.stringify(Exercise2.history));
}

// Load history from localStorage
function loadHistory() {
  try {
    const saved = localStorage.getItem("calculatorHistory");
    if (saved) {
      Exercise2.history = JSON.parse(saved);
    }
  } catch (error) {
    console.warn("Could not load calculator history:", error);
    Exercise2.history = [];
  }
}

// Show calculation history
function showHistory() {
  const resultDisplay = document.getElementById("resultDisplay");
  const calculationDisplay = document.getElementById("calculationDisplay");

  if (Exercise2.history.length === 0) {
    showResult("No calculations in history", "info");
    calculationDisplay.textContent = "History is empty";
    return;
  }

  const historyHtml = Exercise2.history
    .slice(0, 5)
    .map((calc, index) => {
      const time = new Date(calc.timestamp).toLocaleTimeString();
      return `${calc.num1} ${Exercise2.operationSymbols[calc.operation]} ${calc.num2} = ${calc.result} (${time})`;
    })
    .join("\n");

  calculationDisplay.textContent = "Recent Calculations";
  resultDisplay.innerHTML = `<pre style="font-size: 0.9em; line-height: 1.4;">${historyHtml}</pre>`;
}

// Clear calculation history
function clearHistory() {
  Exercise2.history = [];
  localStorage.removeItem("calculatorHistory");
  showResult("History cleared", "info");
  document.getElementById("calculationDisplay").textContent = "History cleared";
}

// Clear current calculation
function clearCalculation() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  showResult("Ready to calculate...", "");
  document.getElementById("calculationDisplay").textContent =
    "Enter numbers and select an operation";
}

// Add keyboard support
function addKeyboardSupport() {
  // Enter key support for inputs
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");

  if (num1Input) {
    num1Input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        num2Input?.focus();
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

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
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
          clearCalculation();
          break;
      }
    }
  });
}

// Initialize the calculator
function initializeExercise2() {
  console.log("🧮 Static Calculator Demo loaded");
  console.log("📊 Pure client-side calculation - no API calls");

  // Load history from localStorage
  loadHistory();

  // Add keyboard support
  addKeyboardSupport();

  // Set initial state
  showResult("Ready to calculate...", "");
  document.getElementById("calculationDisplay").textContent =
    "Enter numbers and select an operation";
  updateStatusIndicator(true);

  // Add some helpful tips to console
  console.log("💡 Keyboard shortcuts:");
  console.log("  - Ctrl/Cmd + = : Addition");
  console.log("  - Ctrl/Cmd + - : Subtraction");
  console.log("  - Ctrl/Cmd + * : Multiplication");
  console.log("  - Ctrl/Cmd + / : Division");
  console.log("  - Ctrl/Cmd + H : Show history");
  console.log("  - Ctrl/Cmd + C : Clear calculation");
  console.log("  - Enter : Focus next input or calculate");

  // Show welcome message briefly
  setTimeout(() => {
    if (
      document.getElementById("resultDisplay").textContent ===
      "Ready to calculate..."
    ) {
      const tips = [
        "Try using keyboard shortcuts!",
        "Your calculations are saved locally",
        "Division by zero is handled gracefully",
        "Results are rounded to avoid floating point errors",
      ];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      document.getElementById("calculationDisplay").textContent =
        `💡 Tip: ${randomTip}`;
    }
  }, 3000);
}

// Add button animations
function addButtonAnimations() {
  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeExercise2();
  addButtonAnimations();
});

// Export functions for global access (if needed)
window.Exercise2Functions = {
  performOperation,
  showHistory,
  clearHistory,
  clearCalculation,
  showResult,
};
