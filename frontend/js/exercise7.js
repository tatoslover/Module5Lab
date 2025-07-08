// Exercise 7: Enhanced Calculator
// This file handles the frontend interactions with the Enhanced Calculator API

class Exercise7 {
    constructor() {
        this.baseUrl = 'http://localhost:3007';
        this.sessionId = null;
        this.currentInput = '';
        this.currentOperation = null;
        this.previousInput = '';
        this.shouldResetDisplay = false;
        this.memory = 0;
        this.history = [];
        this.operationCount = 0;
        this.startTime = new Date();
        this.logs = [];
        this.performanceMetrics = {
            totalOperations: 0,
            totalResponseTime: 0,
            errors: 0
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardSupport();
        this.initializeSession();
        this.updateDisplay();
        this.startClock();
        this.updatePerformanceMetrics();
        this.logSystemMessage('Enhanced Calculator initialized');
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

    async initializeSession() {
        try {
            const response = await this.makeRequest(`${this.baseUrl}/session`, {
                method: 'POST'
            });

            if (response.success) {
                this.sessionId = response.sessionId;
                this.updateSessionDisplay();
                this.logSystemMessage(`Session started: ${this.sessionId}`);
            } else {
                this.sessionId = this.generateUUID();
                this.logSystemMessage(`Using client-side session: ${this.sessionId}`);
            }
        } catch (error) {
            this.sessionId = this.generateUUID();
            this.logSystemMessage(`Offline mode: ${this.sessionId}`);
        }
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async makeRequest(url, options = {}) {
        const startTime = Date.now();

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-ID': this.sessionId,
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const responseTime = Date.now() - startTime;

            this.performanceMetrics.totalResponseTime += responseTime;
            this.performanceMetrics.totalOperations++;

            return data;
        } catch (error) {
            const responseTime = Date.now() - startTime;
            this.performanceMetrics.errors++;
            this.logErrorMessage(`API Request failed: ${error.message}`);
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
        this.logOperationMessage(`Input: ${number}`);
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
        this.logOperationMessage('Input: decimal point');
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
        this.logOperationMessage(`Operation: ${operation}`);
    }

    async performFunction(func) {
        if (this.currentInput === '' && this.previousInput === '') {
            return;
        }

        const value = parseFloat(this.currentInput || this.previousInput);
        let result;

        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(value * Math.PI / 180);
                    break;
                case 'cos':
                    result = Math.cos(value * Math.PI / 180);
                    break;
                case 'tan':
                    result = Math.tan(value * Math.PI / 180);
                    break;
                case 'log':
                    result = Math.log10(value);
                    break;
                case 'ln':
                    result = Math.log(value);
                    break;
                case 'sqrt':
                    result = Math.sqrt(value);
                    break;
                case 'power':
                    result = Math.pow(value, 2);
                    break;
                default:
                    return;
            }

            this.currentInput = result.toString();
            this.previousInput = '';
            this.currentOperation = null;
            this.shouldResetDisplay = true;
            this.operationCount++;

            this.updateDisplay();
            this.addToHistory(`${func}(${value}) = ${result}`);
            this.logOperationMessage(`Function: ${func}(${value}) = ${result}`);
        } catch (error) {
            this.logErrorMessage(`Function error: ${error.message}`);
        }
    }

    async calculateResult() {
        if (!this.currentOperation || this.previousInput === '' || this.currentInput === '') {
            return;
        }

        const a = parseFloat(this.previousInput);
        const b = parseFloat(this.currentInput);
        const operation = this.currentOperation;

        try {
            let result;

            // Try to use API first, fallback to local calculation
            try {
                const response = await this.makeRequest(`${this.baseUrl}/calculate`, {
                    method: 'POST',
                    body: JSON.stringify({
                        operation: operation,
                        a: a,
                        b: b,
                        sessionId: this.sessionId
                    })
                });

                if (response.success) {
                    result = response.result;
                } else {
                    throw new Error(response.message || 'API calculation failed');
                }
            } catch (apiError) {
                // Fallback to local calculation
                result = this.calculateLocally(operation, a, b);
                this.logSystemMessage('Using local calculation (API unavailable)');
            }

            this.currentInput = result.toString();
            this.previousInput = '';
            this.currentOperation = null;
            this.shouldResetDisplay = true;
            this.operationCount++;

            this.updateDisplay();
            this.addToHistory(`${a} ${this.getOperationSymbol(operation)} ${b} = ${result}`);
            this.logOperationMessage(`Calculation: ${a} ${this.getOperationSymbol(operation)} ${b} = ${result}`);
        } catch (error) {
            this.logErrorMessage(`Calculation failed: ${error.message}`);
        }
    }

    calculateLocally(operation, a, b) {
        switch (operation) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                if (b === 0) throw new Error('Division by zero');
                return a / b;
            default:
                throw new Error('Unknown operation');
        }
    }

    clearCalculator() {
        this.currentInput = '';
        this.previousInput = '';
        this.currentOperation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
        this.logOperationMessage('Calculator cleared');
    }

    memoryClear() {
        this.memory = 0;
        this.updateMemoryDisplay();
        this.logOperationMessage('Memory cleared');
    }

    memoryRecall() {
        this.currentInput = this.memory.toString();
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.logOperationMessage(`Memory recalled: ${this.memory}`);
    }

    memoryStore() {
        this.memory = parseFloat(this.currentInput || '0');
        this.updateMemoryDisplay();
        this.logOperationMessage(`Memory stored: ${this.memory}`);
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
                operationDisplay.textContent = 'Ready for calculations';
            }
        }

        this.updateTimestamp();
    }

    updateSessionDisplay() {
        const sessionIdElement = document.getElementById('sessionId');
        const sessionIdDetailElement = document.getElementById('sessionIdDetail');
        const sessionStartedElement = document.getElementById('sessionStarted');

        if (sessionIdElement) {
            sessionIdElement.textContent = `Session: ${this.sessionId?.substring(0, 8)}...`;
        }

        if (sessionIdDetailElement) {
            sessionIdDetailElement.textContent = this.sessionId || 'Not connected';
        }

        if (sessionStartedElement) {
            sessionStartedElement.textContent = this.startTime.toLocaleTimeString();
        }
    }

    updateMemoryDisplay() {
        const memoryValueElement = document.getElementById('memoryValue');
        if (memoryValueElement) {
            memoryValueElement.textContent = this.memory.toString();
        }
    }

    updateTimestamp() {
        const timestampElement = document.getElementById('timestamp');
        if (timestampElement) {
            timestampElement.textContent = new Date().toLocaleTimeString();
        }
    }

    startClock() {
        setInterval(() => {
            this.updateTimestamp();
            this.updateUptime();
        }, 1000);
    }

    updateUptime() {
        const uptimeElement = document.getElementById('uptime');
        if (uptimeElement) {
            const uptime = Math.floor((Date.now() - this.startTime.getTime()) / 1000);
            const minutes = Math.floor(uptime / 60);
            const seconds = uptime % 60;
            uptimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    updatePerformanceMetrics() {
        const avgResponseTimeElement = document.getElementById('avgResponseTime');
        const totalOperationsElement = document.getElementById('totalOperations');
        const errorRateElement = document.getElementById('errorRate');
        const operationCountElement = document.getElementById('operationCount');

        if (avgResponseTimeElement) {
            const avgTime = this.performanceMetrics.totalOperations > 0
                ? Math.round(this.performanceMetrics.totalResponseTime / this.performanceMetrics.totalOperations)
                : 0;
            avgResponseTimeElement.textContent = `${avgTime}ms`;
        }

        if (totalOperationsElement) {
            totalOperationsElement.textContent = this.performanceMetrics.totalOperations.toString();
        }

        if (errorRateElement) {
            const errorRate = this.performanceMetrics.totalOperations > 0
                ? Math.round((this.performanceMetrics.errors / this.performanceMetrics.totalOperations) * 100)
                : 0;
            errorRateElement.textContent = `${errorRate}%`;
        }

        if (operationCountElement) {
            operationCountElement.textContent = this.operationCount.toString();
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

    addToHistory(entry) {
        this.history.push({
            timestamp: new Date(),
            operation: entry,
            sessionId: this.sessionId
        });

        // Keep only last 50 entries
        if (this.history.length > 50) {
            this.history.shift();
        }
    }

    // Logging functions
    logSystemMessage(message) {
        this.addLogEntry('INFO', message, 'system');
    }

    logOperationMessage(message) {
        this.addLogEntry('INFO', message, 'operation');
    }

    logErrorMessage(message) {
        this.addLogEntry('ERROR', message, 'error');
    }

    addLogEntry(level, message, type = 'info') {
        const logEntry = {
            timestamp: new Date(),
            level: level,
            message: message,
            type: type
        };

        this.logs.push(logEntry);

        // Keep only last 100 log entries
        if (this.logs.length > 100) {
            this.logs.shift();
        }

        this.displayLogEntry(logEntry);
    }

    displayLogEntry(logEntry) {
        const logsContainer = document.getElementById('logsContainer');
        if (!logsContainer) return;

        const logElement = document.createElement('div');
        logElement.className = `log-entry ${logEntry.type}`;
        logElement.innerHTML = `
            <span class="log-time">${logEntry.timestamp.toLocaleTimeString()}</span>
            <span class="log-level ${logEntry.level}">${logEntry.level}</span>
            <span class="log-message">${logEntry.message}</span>
        `;

        logsContainer.appendChild(logElement);

        // Auto-scroll to bottom
        logsContainer.scrollTop = logsContainer.scrollHeight;

        // Remove old entries if too many
        const logEntries = logsContainer.querySelectorAll('.log-entry');
        if (logEntries.length > 100) {
            logsContainer.removeChild(logEntries[0]);
        }
    }

    clearLogs() {
        const logsContainer = document.getElementById('logsContainer');
        if (logsContainer) {
            logsContainer.innerHTML = '';
        }
        this.logs = [];
        this.logSystemMessage('Logs cleared');
    }

    // Advanced functions
    async performChainedCalculation() {
        const operations = [
            { operation: 'add', a: 10, b: 5 },
            { operation: 'multiply', a: null, b: 2 }, // null will use previous result
            { operation: 'subtract', a: null, b: 8 }
        ];

        let result = 0;
        let chainDescription = '';

        for (let i = 0; i < operations.length; i++) {
            const op = operations[i];
            const a = op.a !== null ? op.a : result;
            const b = op.b;

            result = this.calculateLocally(op.operation, a, b);

            if (i === 0) {
                chainDescription = `${a} ${this.getOperationSymbol(op.operation)} ${b}`;
            } else {
                chainDescription += ` ${this.getOperationSymbol(op.operation)} ${b}`;
            }
        }

        this.currentInput = result.toString();
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.addToHistory(`Chained: ${chainDescription} = ${result}`);
        this.logOperationMessage(`Chained calculation: ${chainDescription} = ${result}`);
    }

    generateRandomNumber() {
        const random = Math.floor(Math.random() * 1000);
        this.currentInput = random.toString();
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.logOperationMessage(`Random number generated: ${random}`);
    }

    showCalculationHistory() {
        const historyHtml = this.history.map(entry => `
            <div class="history-entry">
                <span class="history-time">${entry.timestamp.toLocaleTimeString()}</span>
                <span class="history-operation">${entry.operation}</span>
            </div>
        `).join('');

        const infoContent = document.getElementById('infoContent');
        if (infoContent) {
            infoContent.innerHTML = `
                <div class="history-display">
                    <h4>📊 Calculation History</h4>
                    <div class="history-container">
                        ${historyHtml || '<p>No calculations yet</p>'}
                    </div>
                </div>
            `;
        }
    }

    exportSession() {
        const sessionData = {
            sessionId: this.sessionId,
            startTime: this.startTime,
            history: this.history,
            logs: this.logs,
            performanceMetrics: this.performanceMetrics,
            operationCount: this.operationCount
        };

        const dataStr = JSON.stringify(sessionData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `calculator-session-${this.sessionId.substring(0, 8)}.json`;
        link.click();

        URL.revokeObjectURL(url);
        this.logSystemMessage('Session exported successfully');
    }

    // Tab switching
    showTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');

        // Update performance metrics when performance tab is shown
        if (tabName === 'performance') {
            this.updatePerformanceMetrics();
        }
    }
}

// Global functions for onclick handlers
function inputNumber(number) {
    exercise7.inputNumber(number);
}

function inputDecimal() {
    exercise7.inputDecimal();
}

function performOperation(operation) {
    exercise7.performOperation(operation);
}

function performFunction(func) {
    exercise7.performFunction(func);
}

function calculateResult() {
    exercise7.calculateResult();
}

function clearCalculator() {
    exercise7.clearCalculator();
}

function memoryClear() {
    exercise7.memoryClear();
}

function memoryRecall() {
    exercise7.memoryRecall();
}

function memoryStore() {
    exercise7.memoryStore();
}

function performChainedCalculation() {
    exercise7.performChainedCalculation();
}

function generateRandomNumber() {
    exercise7.generateRandomNumber();
}

function showCalculationHistory() {
    exercise7.showCalculationHistory();
}

function exportSession() {
    exercise7.exportSession();
}

function clearLogs() {
    exercise7.clearLogs();
}

function showTab(tabName) {
    exercise7.showTab(tabName);
}

// Initialize the application
const exercise7 = new Exercise7();

// Add some helpful console messages
console.log('⚡ Exercise 7: Enhanced Calculator');
console.log('API Base URL:', exercise7.baseUrl);
console.log('Session ID:', exercise7.sessionId);
console.log('Features: Custom Libraries, Logging, Session Management');
console.log('Available keyboard shortcuts:');
console.log('- Number keys: Input numbers');
console.log('- +, -, *, /: Operations');
console.log('- Enter/=: Calculate');
console.log('- Escape/C: Clear');
