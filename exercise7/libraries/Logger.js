const IdGenerator = require('./IdGenerator');

/**
 * Logger - A generic logging library for structured application logging
 * 
 * Features:
 * - Structured logging with caller ID tracking
 * - Multiple log levels (INFO, ERROR, DEBUG, WARN)
 * - Operation-specific logging with inputs and results
 * - Session tracking for request correlation
 * - Configurable output formatting
 * - Performance metrics tracking
 */
class Logger {
  
  constructor(callerId, logLevel = 'INFO') {
    this.callerId = callerId || IdGenerator.generateWithPrefix('unknown', 6);
    this.logLevel = logLevel.toUpperCase();
    this.sessionId = IdGenerator.generateSessionId();
    this.logCount = 0;
    this.startTime = Date.now();
    
    // Log level hierarchy for filtering
    this.logLevels = {
      'DEBUG': 0,
      'INFO': 1,
      'WARN': 2,
      'ERROR': 3
    };
    
    // Initialize logger
    this.#logInternal('INFO', 'INIT', `Logger initialized for caller: ${this.callerId}`);
  }

  /**
   * Internal logging method - handles all log formatting and output
   * @private
   */
  #logInternal(level, operation, message, result = null, inputs = null) {
    // Check if this log level should be output
    if (this.logLevels[level] < this.logLevels[this.logLevel]) {
      return;
    }

    this.logCount++;
    const timestamp = new Date().toISOString();
    const logId = IdGenerator.generateShort();
    
    // Build structured log entry
    let logEntry = `[${this.sessionId}][${this.callerId}][${timestamp}][${level}][${operation}]`;
    
    if (inputs && Array.isArray(inputs)) {
      logEntry += ` Inputs: [${inputs.join(', ')}]`;
    }
    
    logEntry += ` ${message}`;
    
    if (result !== null && result !== undefined) {
      logEntry += ` -> Result: ${result}`;
    }
    
    logEntry += ` [LogID: ${logId}]`;
    
    // Output to console with appropriate method
    switch (level) {
      case 'ERROR':
        console.error(logEntry);
        break;
      case 'WARN':
        console.warn(logEntry);
        break;
      case 'DEBUG':
        console.debug(logEntry);
        break;
      default:
        console.log(logEntry);
    }
  }

  /**
   * Log a general informational message
   * @param {string} message - The message to log
   * @param {*} result - Optional result to include
   * @param {string} operation - Optional operation name
   */
  log(message, result = null, operation = 'GENERAL') {
    this.#logInternal('INFO', operation, message, result);
  }

  /**
   * Log an informational message (alias for log)
   * @param {string} message - The message to log
   * @param {*} result - Optional result to include
   * @param {string} operation - Optional operation name
   */
  info(message, result = null, operation = 'INFO') {
    this.#logInternal('INFO', operation, message, result);
  }

  /**
   * Log an error message
   * @param {string|Error} error - Error message or Error object
   * @param {string} operation - Operation where error occurred
   * @param {*} inputs - Optional inputs that caused the error
   */
  error(error, operation = 'ERROR', inputs = null) {
    const errorMessage = error instanceof Error ? error.message : error;
    const stackTrace = error instanceof Error ? error.stack : null;
    
    this.#logInternal('ERROR', operation, errorMessage, null, inputs);
    
    if (stackTrace && this.logLevel === 'DEBUG') {
      console.error(`[${this.callerId}] Stack Trace:`, stackTrace);
    }
  }

  /**
   * Log a warning message
   * @param {string} message - Warning message
   * @param {string} operation - Operation name
   * @param {*} result - Optional result
   */
  warn(message, operation = 'WARN', result = null) {
    this.#logInternal('WARN', operation, message, result);
  }

  /**
   * Log a debug message (only shown when log level is DEBUG)
   * @param {string} message - Debug message
   * @param {*} data - Optional data to include
   * @param {string} operation - Operation name
   */
  debug(message, data = null, operation = 'DEBUG') {
    this.#logInternal('DEBUG', operation, message, data);
  }

  /**
   * Log a mathematical operation with inputs and result
   * @param {string} operation - Operation name (ADD, SUBTRACT, etc.)
   * @param {Array} inputs - Array of input values
   * @param {*} result - Operation result
   * @param {string} symbol - Mathematical symbol for display
   */
  logOperation(operation, inputs, result, symbol = '?') {
    if (!Array.isArray(inputs) || inputs.length === 0) {
      this.warn('Invalid inputs provided to logOperation', 'LOG_OPERATION');
      return;
    }

    let operationString;
    if (inputs.length === 1) {
      operationString = `${symbol}${inputs[0]}`;
    } else if (inputs.length === 2) {
      operationString = `${inputs[0]} ${symbol} ${inputs[1]}`;
    } else {
      operationString = inputs.join(` ${symbol} `);
    }

    const message = `${operationString} = ${result}`;
    this.#logInternal('INFO', operation, message, result, inputs);
  }

  /**
   * Log a calculation chain operation
   * @param {string} chainOperation - Description of chain operation
   * @param {*} currentValue - Current chain value
   * @param {string} nextOperation - Next operation in chain
   */
  logChain(chainOperation, currentValue, nextOperation = null) {
    let message = `Chain: ${chainOperation} -> ${currentValue}`;
    if (nextOperation) {
      message += ` (Next: ${nextOperation})`;
    }
    this.#logInternal('INFO', 'CHAIN', message, currentValue);
  }

  /**
   * Log performance metrics
   * @param {string} operation - Operation name
   * @param {number} startTime - Operation start time
   * @param {number} endTime - Operation end time
   * @param {*} result - Operation result
   */
  logPerformance(operation, startTime, endTime, result = null) {
    const duration = endTime - startTime;
    const message = `Performance: ${operation} completed in ${duration}ms`;
    this.#logInternal('INFO', 'PERF', message, result);
  }

  /**
   * Log session start
   * @param {string} sessionType - Type of session starting
   * @param {object} metadata - Optional session metadata
   */
  logSessionStart(sessionType = 'GENERAL', metadata = {}) {
    const message = `Session started: ${sessionType}`;
    this.#logInternal('INFO', 'SESSION_START', message, JSON.stringify(metadata));
  }

  /**
   * Log session end with statistics
   * @param {string} sessionType - Type of session ending
   * @param {object} stats - Session statistics
   */
  logSessionEnd(sessionType = 'GENERAL', stats = {}) {
    const sessionDuration = Date.now() - this.startTime;
    const defaultStats = {
      duration: sessionDuration,
      logCount: this.logCount,
      sessionId: this.sessionId,
      ...stats
    };
    
    const message = `Session ended: ${sessionType}`;
    this.#logInternal('INFO', 'SESSION_END', message, JSON.stringify(defaultStats));
  }

  /**
   * Log validation errors with details
   * @param {string} validationType - Type of validation that failed
   * @param {*} invalidValue - The invalid value
   * @param {string} expectedFormat - Expected format description
   */
  logValidationError(validationType, invalidValue, expectedFormat) {
    const message = `Validation failed: ${validationType}. Got: ${invalidValue}, Expected: ${expectedFormat}`;
    this.#logInternal('ERROR', 'VALIDATION', message, null, [invalidValue]);
  }

  /**
   * Create a child logger with the same session but different caller ID
   * @param {string} newCallerId - New caller ID for child logger
   * @param {string} logLevel - Log level for child logger (inherits if not specified)
   * @returns {Logger} New Logger instance
   */
  createChild(newCallerId, logLevel = null) {
    const childLogger = new Logger(newCallerId, logLevel || this.logLevel);
    childLogger.sessionId = this.sessionId; // Inherit session ID
    childLogger.info(`Child logger created from parent: ${this.callerId}`, null, 'CHILD_INIT');
    return childLogger;
  }

  /**
   * Change the log level for this logger instance
   * @param {string} newLevel - New log level (DEBUG, INFO, WARN, ERROR)
   */
  setLogLevel(newLevel) {
    const oldLevel = this.logLevel;
    newLevel = newLevel.toUpperCase();
    
    if (!this.logLevels.hasOwnProperty(newLevel)) {
      this.error(`Invalid log level: ${newLevel}. Valid levels: ${Object.keys(this.logLevels).join(', ')}`, 'SET_LOG_LEVEL');
      return;
    }
    
    this.logLevel = newLevel;
    this.info(`Log level changed from ${oldLevel} to ${newLevel}`, null, 'LOG_LEVEL_CHANGE');
  }

  /**
   * Get current logger statistics
   * @returns {object} Logger statistics
   */
  getStats() {
    return {
      callerId: this.callerId,
      sessionId: this.sessionId,
      logLevel: this.logLevel,
      logCount: this.logCount,
      uptime: Date.now() - this.startTime,
      startTime: new Date(this.startTime).toISOString()
    };
  }

  /**
   * Create a formatted log entry without outputting it
   * @param {string} level - Log level
   * @param {string} operation - Operation name
   * @param {string} message - Log message
   * @param {*} result - Optional result
   * @param {Array} inputs - Optional inputs
   * @returns {string} Formatted log entry
   */
  formatLogEntry(level, operation, message, result = null, inputs = null) {
    const timestamp = new Date().toISOString();
    const logId = IdGenerator.generateShort();
    
    let logEntry = `[${this.sessionId}][${this.callerId}][${timestamp}][${level}][${operation}]`;
    
    if (inputs && Array.isArray(inputs)) {
      logEntry += ` Inputs: [${inputs.join(', ')}]`;
    }
    
    logEntry += ` ${message}`;
    
    if (result !== null && result !== undefined) {
      logEntry += ` -> Result: ${result}`;
    }
    
    logEntry += ` [LogID: ${logId}]`;
    
    return logEntry;
  }

  /**
   * Utility method to log object properties for debugging
   * @param {object} obj - Object to log
   * @param {string} objectName - Name of the object
   */
  logObject(obj, objectName = 'Object') {
    if (typeof obj !== 'object' || obj === null) {
      this.warn(`${objectName} is not a valid object`, 'LOG_OBJECT');
      return;
    }

    this.debug(`${objectName} properties:`, JSON.stringify(obj, null, 2), 'OBJECT_DUMP');
  }

  /**
   * Log a separator line for visual organization
   * @param {string} title - Optional title for the separator
   */
  logSeparator(title = null) {
    const separator = '='.repeat(50);
    const message = title ? `${separator} ${title} ${separator}` : separator;
    this.info(message, null, 'SEPARATOR');
  }
}

module.exports = Logger;