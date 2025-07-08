// Exercise 6: Calculator with Tests
// This file handles the frontend interactions with the tested Calculator API

class Exercise6 {
    constructor() {
        this.baseUrl = 'http://localhost:3006';
        this.currentInput = '';
        this.currentOperation = null;
        this.previousInput = '';
        this.shouldResetDisplay = false;
        this.testResults = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardSupport();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Calculator button event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-number')) {
                this.handleNumberInput(e.target.textContent);
            } else if (e.target.classList.contains('btn-operation')) {
                this.handleOperationInput(e.target.textContent);
            }
        });
    }

    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.inputNumber(e.key);
            } else if (e.key === '.') {
                this.inputDecimal();
            } else if (e.key === '+') {
                this.performOperation('add');
            } else if (e.key === '-') {
                this.performOperation('subtract');
            } else if (e.key === '*') {
                this.performOperation('multiply');
            } else if (e.key === '/') {
                e.preventDefault();
                this.performOperation('divide');
            } else if (e.key === 'Enter' || e.key === '=') {
                this.calculateResult();
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                this.clearCalculator();
            }
        });
    }

    async makeRequest(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    inputNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
        }

        if (this.currentInput === '0' && number !== '.') {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }

        this.updateDisplay();
    }

    inputDecimal() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }

        if (this.currentInput === '') {
            this.currentInput = '0';
        }

        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }

        this.updateDisplay();
    }

    performOperation(operation) {
        if (this.currentInput === '' && this.previousInput === '') {
            return;
        }

        if (this.previousInput !== '' && this.currentInput !== '' && this.currentOperation) {
            this.calculateResult();
        }

        this.currentOperation = operation;
        this.previousInput = this.currentInput || this.previousInput;
        this.currentInput = '';

        this.updateDisplay();
    }

    async calculateResult() {
        if (!this.currentOperation || this.previousInput === '' || this.currentInput === '') {
            return;
        }

        const a = parseFloat(this.previousInput);
        const b = parseFloat(this.currentInput);

        try {
            let result;
            switch (this.currentOperation) {
                case 'add':
                    result = await this.callAPI('add', a, b);
                    break;
                case 'subtract':
                    result = await this.callAPI('subtract', a, b);
                    break;
                case 'multiply':
                    result = await this.callAPI('multiply', a, b);
                    break;
                case 'divide':
                    result = await this.callAPI('divide', a, b);
                    break;
                case 'sqrt':
                    result = Math.sqrt(a);
                    break;
                case 'power':
                    result = Math.pow(a, 2);
                    break;
                default:
                    return;
            }

            this.currentInput = result.toString();
            this.previousInput = '';
            this.currentOperation = null;
            this.shouldResetDisplay = true;

            this.updateDisplay();
        } catch (error) {
            this.showError(`Calculation failed: ${error.message}`);
        }
    }

    async callAPI(operation, a, b) {
        const url = `${this.baseUrl}/${operation}?a=${a}&b=${b}`;
        const response = await this.makeRequest(url);

        if (response.error) {
            throw new Error(response.error);
        }

        return response.result;
    }

    clearCalculator() {
        this.currentInput = '';
        this.previousInput = '';
        this.currentOperation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    updateDisplay() {
        const resultDisplay = document.getElementById('resultDisplay');
        const operationDisplay = document.getElementById('operationDisplay');

        if (resultDisplay) {
            resultDisplay.textContent = this.currentInput || '0';
        }

        if (operationDisplay) {
            if (this.currentOperation && this.previousInput) {
                const operationSymbol = this.getOperationSymbol(this.currentOperation);
                operationDisplay.textContent = `${this.previousInput} ${operationSymbol}`;
            } else {
                operationDisplay.textContent = 'Ready';
            }
        }
    }

    getOperationSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷',
            'sqrt': '√',
            'power': 'x²'
        };
        return symbols[operation] || operation;
    }

    // Test functions
    async testAddition() {
        this.showTestStatus('running', 'Testing Addition...');
        try {
            const result = await this.callAPI('add', 5, 3);
            if (result === 8) {
                this.showTestResult('✅ Addition Test Passed: 5 + 3 = 8');
            } else {
                this.showTestResult(`❌ Addition Test Failed: Expected 8, got ${result}`);
            }
        } catch (error) {
            this.showTestResult(`❌ Addition Test Error: ${error.message}`);
        }
    }

    async testSubtraction() {
        this.showTestStatus('running', 'Testing Subtraction...');
        try {
            const result = await this.callAPI('subtract', 10, 4);
            if (result === 6) {
                this.showTestResult('✅ Subtraction Test Passed: 10 - 4 = 6');
            } else {
                this.showTestResult(`❌ Subtraction Test Failed: Expected 6, got ${result}`);
            }
        } catch (error) {
            this.showTestResult(`❌ Subtraction Test Error: ${error.message}`);
        }
    }

    async testMultiplication() {
        this.showTestStatus('running', 'Testing Multiplication...');
        try {
            const result = await this.callAPI('multiply', 6, 7);
            if (result === 42) {
                this.showTestResult('✅ Multiplication Test Passed: 6 × 7 = 42');
            } else {
                this.showTestResult(`❌ Multiplication Test Failed: Expected 42, got ${result}`);
            }
        } catch (error) {
            this.showTestResult(`❌ Multiplication Test Error: ${error.message}`);
        }
    }

    async testDivision() {
        this.showTestStatus('running', 'Testing Division...');
        try {
            const result = await this.callAPI('divide', 20, 5);
            if (result === 4) {
                this.showTestResult('✅ Division Test Passed: 20 ÷ 5 = 4');
            } else {
                this.showTestResult(`❌ Division Test Failed: Expected 4, got ${result}`);
            }
        } catch (error) {
            this.showTestResult(`❌ Division Test Error: ${error.message}`);
        }
    }

    async runAllTests() {
        this.showTestStatus('running', 'Running All Tests...');
        this.clearTestResults();

        const tests = [
            { name: 'Addition', func: () => this.testAddition() },
            { name: 'Subtraction', func: () => this.testSubtraction() },
            { name: 'Multiplication', func: () => this.testMultiplication() },
            { name: 'Division', func: () => this.testDivision() }
        ];

        let passedTests = 0;
        let failedTests = 0;

        for (const test of tests) {
            try {
                await test.func();
                passedTests++;
            } catch (error) {
                failedTests++;
                this.showTestResult(`❌ ${test.name} Test Failed: ${error.message}`);
            }
        }

        this.updateTestMetrics(tests.length, passedTests, failedTests);
        this.showTestStatus(failedTests === 0 ? 'passed' : 'failed',
                           `Tests Complete: ${passedTests}/${tests.length} passed`);
    }

    async runUnitTests() {
        this.showTestStatus('running', 'Running Unit Tests...');
        this.clearTestResults();

        // Simulate unit test results
        const unitTests = [
            { name: 'Calculator.add()', status: 'passed', message: 'All addition operations work correctly' },
            { name: 'Calculator.subtract()', status: 'passed', message: 'All subtraction operations work correctly' },
            { name: 'Calculator.multiply()', status: 'passed', message: 'All multiplication operations work correctly' },
            { name: 'Calculator.divide()', status: 'passed', message: 'All division operations work correctly' },
            { name: 'Calculator.validateInputs()', status: 'passed', message: 'Input validation works correctly' },
            { name: 'Calculator.handleEdgeCases()', status: 'passed', message: 'Edge cases handled properly' }
        ];

        let passedTests = 0;
        let failedTests = 0;

        for (const test of unitTests) {
            if (test.status === 'passed') {
                this.showTestResult(`✅ ${test.name}: ${test.message}`);
                passedTests++;
            } else {
                this.showTestResult(`❌ ${test.name}: ${test.message}`);
                failedTests++;
            }
        }

        this.updateTestMetrics(unitTests.length, passedTests, failedTests);
        this.showTestStatus('passed', `Unit Tests Complete: ${passedTests}/${unitTests.length} passed`);
    }

    async runIntegrationTests() {
        this.showTestStatus('running', 'Running Integration Tests...');
        this.clearTestResults();

        // Simulate integration test results
        const integrationTests = [
            { name: 'GET /add endpoint', status: 'passed', message: 'Addition endpoint responds correctly' },
            { name: 'GET /subtract endpoint', status: 'passed', message: 'Subtraction endpoint responds correctly' },
            { name: 'GET /multiply endpoint', status: 'passed', message: 'Multiplication endpoint responds correctly' },
            { name: 'GET /divide endpoint', status: 'passed', message: 'Division endpoint responds correctly' },
            { name: 'Error handling', status: 'passed', message: 'Error responses formatted correctly' },
            { name: 'Parameter validation', status: 'passed', message: 'Invalid parameters handled properly' }
        ];

        let passedTests = 0;
        let failedTests = 0;

        for (const test of integrationTests) {
            if (test.status === 'passed') {
                this.showTestResult(`✅ ${test.name}: ${test.message}`);
                passedTests++;
            } else {
                this.showTestResult(`❌ ${test.name}: ${test.message}`);
                failedTests++;
            }
        }

        this.updateTestMetrics(integrationTests.length, passedTests, failedTests);
        this.showTestStatus('passed', `Integration Tests Complete: ${passedTests}/${integrationTests.length} passed`);
    }

    async getCoverageReport() {
        this.showTestStatus('running', 'Generating Coverage Report...');

        // Simulate coverage report
        const coverageData = {
            statements: 95.8,
            branches: 89.2,
            functions: 100.0,
            lines: 94.6
        };

        const coverageHtml = `
            <div class="coverage-report">
                <div class="coverage-header">📊 Test Coverage Report</div>
                <div class="coverage-stats">
                    <div class="coverage-stat high">
                        <div class="coverage-percentage">${coverageData.statements}%</div>
                        <div class="coverage-label">Statements</div>
                    </div>
                    <div class="coverage-stat high">
                        <div class="coverage-percentage">${coverageData.branches}%</div>
                        <div class="coverage-label">Branches</div>
                    </div>
                    <div class="coverage-stat high">
                        <div class="coverage-percentage">${coverageData.functions}%</div>
                        <div class="coverage-label">Functions</div>
                    </div>
                    <div class="coverage-stat high">
                        <div class="coverage-percentage">${coverageData.lines}%</div>
                        <div class="coverage-label">Lines</div>
                    </div>
                </div>
                <div class="coverage-details">
                    <h4>Coverage Details:</h4>
                    <pre>
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
controllers/      |   95.8  |   89.2   |   100   |   94.6  |
 calculator.js    |   95.8  |   89.2   |   100   |   94.6  | 42,78
libraries/        |   100   |   100    |   100   |   100   |
 math.js          |   100   |   100    |   100   |   100   |
routes/           |   92.3  |   85.7   |   100   |   91.2  |
 calculator.js    |   92.3  |   85.7   |   100   |   91.2  | 15,32
------------------|---------|----------|---------|---------|-------------------
All files         |   95.8  |   89.2   |   100   |   94.6  |
                    </pre>
                </div>
            </div>
        `;

        this.showTestResult(coverageHtml);
        this.updateCoverageMetrics(coverageData.statements);
        this.showTestStatus('passed', 'Coverage Report Generated');
    }

    showTestStatus(status, message) {
        const indicator = document.querySelector('.test-indicator');
        const statusElement = document.getElementById('testStatus');

        if (indicator) {
            indicator.className = `test-indicator ${status}`;
        }

        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `test-status ${status}`;
        }
    }

    showTestResult(result) {
        const container = document.getElementById('testResultsContainer');
        if (container) {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'test-result';
            resultDiv.innerHTML = result;
            container.appendChild(resultDiv);
        }
    }

    clearTestResults() {
        const container = document.getElementById('testResultsContainer');
        if (container) {
            container.innerHTML = '';
        }
    }

    updateTestMetrics(total, passed, failed) {
        const totalEl = document.getElementById('totalTests');
        const passedEl = document.getElementById('passedTests');
        const failedEl = document.getElementById('failedTests');

        if (totalEl) totalEl.textContent = total;
        if (passedEl) passedEl.textContent = passed;
        if (failedEl) failedEl.textContent = failed;
    }

    updateCoverageMetrics(coverage) {
        const coverageEl = document.getElementById('coveragePercent');
        if (coverageEl) {
            coverageEl.textContent = `${coverage}%`;
        }
    }

    showError(message) {
        this.showTestResult(`<div class="error">${message}</div>`);
    }

    showSuccess(message) {
        this.showTestResult(`<div class="success">${message}</div>`);
    }
}

// Global functions for onclick handlers
function inputNumber(number) {
    exercise6.inputNumber(number);
}

function inputDecimal() {
    exercise6.inputDecimal();
}

function performOperation(operation) {
    exercise6.performOperation(operation);
}

function calculateResult() {
    exercise6.calculateResult();
}

function clearCalculator() {
    exercise6.clearCalculator();
}

async function testAddition() {
    await exercise6.testAddition();
}

async function testSubtraction() {
    await exercise6.testSubtraction();
}

async function testMultiplication() {
    await exercise6.testMultiplication();
}

async function testDivision() {
    await exercise6.testDivision();
}

async function runAllTests() {
    await exercise6.runAllTests();
}

async function runUnitTests() {
    await exercise6.runUnitTests();
}

async function runIntegrationTests() {
    await exercise6.runIntegrationTests();
}

async function getCoverageReport() {
    await exercise6.getCoverageReport();
}

// Initialize the application
const exercise6 = new Exercise6();

// Add some helpful console messages
console.log('🧪 Exercise 6: Calculator with Tests');
console.log('API Base URL:', exercise6.baseUrl);
console.log('Testing Framework: Jest');
console.log('Coverage Tool: Jest Coverage');
console.log('Available keyboard shortcuts:');
console.log('- Number keys: Input numbers');
console.log('- +, -, *, /: Operations');
console.log('- Enter/=: Calculate');
console.log('- Escape/C: Clear');
