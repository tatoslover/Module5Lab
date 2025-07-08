const Logger = require('../../libraries/Logger');
const IdGenerator = require('../../libraries/IdGenerator');

describe('Logger Library Tests', () => {
  let logger;
  let consoleSpy;

  beforeEach(() => {
    // Spy on console methods to capture log output
    consoleSpy = {
      log: jest.spyOn(console, 'log').mockImplementation(),
      error: jest.spyOn(console, 'error').mockImplementation(),
      warn: jest.spyOn(console, 'warn').mockImplementation(),
      debug: jest.spyOn(console, 'debug').mockImplementation()
    };
    
    // Create a new logger instance for each test
    logger = new Logger('test_caller', 'INFO');
  });

  afterEach(() => {
    // Restore console methods
    Object.values(consoleSpy).forEach(spy => spy.mockRestore());
  });

  describe('Logger Initialization', () => {
    test('should create logger with caller ID and log level', () => {
      expect(logger.callerId).toBe('test_caller');
      expect(logger.logLevel).toBe('INFO');
      expect(logger.sessionId).toBeDefined();
      expect(logger.logCount).toBe(1); // Initial log
    });

    test('should create logger with default values', () => {
      const defaultLogger = new Logger();
      expect(defaultLogger.callerId).toMatch(/unknown_[a-f0-9]{6}/);
      expect(defaultLogger.logLevel).toBe('INFO');
    });

    test('should initialize with session ID', () => {
      expect(logger.sessionId).toMatch(/session_[a-f0-9]{16}/);
    });
  });

  describe('Basic Logging Methods', () => {
    test('should log info messages', () => {
      logger.log('Test message', 'result', 'TEST_OP');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1]; // Skip initialization log
      expect(logCall[0]).toContain('[INFO][TEST_OP]');
      expect(logCall[0]).toContain('Test message');
      expect(logCall[0]).toContain('Result: result');
    });

    test('should log error messages', () => {
      logger.error('Test error', 'ERROR_OP');
      
      expect(consoleSpy.error).toHaveBeenCalled();
      const errorCall = consoleSpy.error.mock.calls[0];
      expect(errorCall[0]).toContain('[ERROR][ERROR_OP]');
      expect(errorCall[0]).toContain('Test error');
    });

    test('should log warning messages', () => {
      logger.warn('Test warning', 'WARN_OP');
      
      expect(consoleSpy.warn).toHaveBeenCalled();
      const warnCall = consoleSpy.warn.mock.calls[0];
      expect(warnCall[0]).toContain('[WARN][WARN_OP]');
      expect(warnCall[0]).toContain('Test warning');
    });

    test('should log debug messages when level is DEBUG', () => {
      logger.setLogLevel('DEBUG');
      logger.debug('Debug message', 'debug_data', 'DEBUG_OP');
      
      expect(consoleSpy.debug).toHaveBeenCalled();
      const debugCall = consoleSpy.debug.mock.calls[0];
      expect(debugCall[0]).toContain('[DEBUG][DEBUG_OP]');
      expect(debugCall[0]).toContain('Debug message');
    });
  });

  describe('Operation Logging', () => {
    test('should log mathematical operations', () => {
      logger.logOperation('ADD', [5, 3], 8, '+');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1]; // Skip initialization log
      expect(logCall[0]).toContain('[ADD]');
      expect(logCall[0]).toContain('5 + 3 = 8');
      expect(logCall[0]).toContain('Result: 8');
    });

    test('should log single input operations', () => {
      logger.logOperation('SQRT', [16], 4, '√');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('√16 = 4');
    });

    test('should handle invalid inputs gracefully', () => {
      logger.logOperation('INVALID', [], 0);
      
      expect(consoleSpy.warn).toHaveBeenCalled();
      const warnCall = consoleSpy.warn.mock.calls[0];
      expect(warnCall[0]).toContain('Invalid inputs provided');
    });
  });

  describe('Chain Logging', () => {
    test('should log chain operations', () => {
      logger.logChain('Started with 10', 10);
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('[CHAIN]');
      expect(logCall[0]).toContain('Chain: Started with 10 -> 10');
    });

    test('should log chain with next operation', () => {
      logger.logChain('Added 5', 15, 'MULTIPLY');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('(Next: MULTIPLY)');
    });
  });

  describe('Validation Logging', () => {
    test('should log validation errors', () => {
      logger.logValidationError('TYPE_CHECK', 'invalid', 'number expected');
      
      expect(consoleSpy.error).toHaveBeenCalled();
      const errorCall = consoleSpy.error.mock.calls[0];
      expect(errorCall[0]).toContain('[VALIDATION]');
      expect(errorCall[0]).toContain('Validation failed: TYPE_CHECK');
      expect(errorCall[0]).toContain('Got: invalid');
      expect(errorCall[0]).toContain('Expected: number expected');
    });
  });

  describe('Log Level Filtering', () => {
    test('should filter logs based on level', () => {
      // Create a fresh logger with ERROR level to avoid interference
      const errorLogger = new Logger('test_error', 'ERROR');
      
      // Reset spies to get clean counts
      Object.values(consoleSpy).forEach(spy => spy.mockClear());
      
      // These should not appear (below ERROR level)
      errorLogger.info('Info message');
      errorLogger.warn('Warning message');
      errorLogger.debug('Debug message');
      
      // This should appear (ERROR level)
      errorLogger.error('Error message');
      
      // Only error should be logged, not the lower level messages
      expect(consoleSpy.log).toHaveBeenCalledTimes(0); // No info logs
      expect(consoleSpy.error).toHaveBeenCalledTimes(1); // One error log
      expect(consoleSpy.warn).toHaveBeenCalledTimes(0); // No warning logs
      expect(consoleSpy.debug).toHaveBeenCalledTimes(0); // No debug logs
    });

    test('should change log level correctly', () => {
      logger.setLogLevel('DEBUG');
      expect(logger.logLevel).toBe('DEBUG');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('Log level changed from INFO to DEBUG');
    });

    test('should reject invalid log levels', () => {
      logger.setLogLevel('INVALID');
      
      expect(logger.logLevel).toBe('INFO'); // Should remain unchanged
      expect(consoleSpy.error).toHaveBeenCalled();
      const errorCall = consoleSpy.error.mock.calls[0];
      expect(errorCall[0]).toContain('Invalid log level: INVALID');
    });
  });

  describe('Session Management', () => {
    test('should log session start', () => {
      logger.logSessionStart('TEST_SESSION', { userId: 123 });
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('[SESSION_START]');
      expect(logCall[0]).toContain('Session started: TEST_SESSION');
    });

    test('should log session end with stats', () => {
      logger.logSessionEnd('TEST_SESSION', { operationsCount: 5 });
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('[SESSION_END]');
      expect(logCall[0]).toContain('Session ended: TEST_SESSION');
      expect(logCall[0]).toContain('operationsCount');
    });
  });

  describe('Child Logger', () => {
    test('should create child logger with same session', () => {
      const childLogger = logger.createChild('child_caller');
      
      expect(childLogger.callerId).toBe('child_caller');
      expect(childLogger.sessionId).toBe(logger.sessionId);
      expect(childLogger.logLevel).toBe(logger.logLevel);
    });

    test('should create child logger with different log level', () => {
      const childLogger = logger.createChild('child_caller', 'DEBUG');
      
      expect(childLogger.logLevel).toBe('DEBUG');
      expect(childLogger.sessionId).toBe(logger.sessionId);
    });
  });

  describe('Logger Statistics', () => {
    test('should return correct statistics', () => {
      // Add a small delay to ensure uptime > 0
      const startTime = Date.now();
      while (Date.now() - startTime < 1) {
        // Wait for at least 1ms
      }
      
      logger.info('Test message 1');
      logger.info('Test message 2');
      
      const stats = logger.getStats();
      
      expect(stats.callerId).toBe('test_caller');
      expect(stats.logLevel).toBe('INFO');
      expect(stats.logCount).toBe(3); // Init + 2 test messages
      expect(stats.sessionId).toBeDefined();
      expect(stats.uptime).toBeGreaterThanOrEqual(0);
      expect(stats.startTime).toBeDefined();
    });
  });

  describe('Utility Methods', () => {
    test('should format log entries correctly', () => {
      const formatted = logger.formatLogEntry('INFO', 'TEST', 'message', 'result', [1, 2]);
      
      expect(formatted).toContain('[INFO][TEST]');
      expect(formatted).toContain('Inputs: [1, 2]');
      expect(formatted).toContain('message');
      expect(formatted).toContain('Result: result');
      expect(formatted).toContain('[LogID:');
    });

    test('should log objects for debugging', () => {
      // Set to DEBUG level to ensure debug logs are shown
      logger.setLogLevel('DEBUG');
      
      const testObj = { key: 'value', number: 42 };
      logger.logObject(testObj, 'TestObject');
      
      expect(consoleSpy.debug).toHaveBeenCalled();
      const debugCall = consoleSpy.debug.mock.calls[0];
      expect(debugCall[0]).toContain('TestObject properties:');
    });

    test('should log separators', () => {
      logger.logSeparator('Test Section');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('='.repeat(50));
      expect(logCall[0]).toContain('Test Section');
    });
  });

  describe('Error Handling', () => {
    test('should handle Error objects correctly', () => {
      const error = new Error('Test error message');
      logger.error(error, 'TEST_ERROR');
      
      expect(consoleSpy.error).toHaveBeenCalled();
      const errorCall = consoleSpy.error.mock.calls[0];
      expect(errorCall[0]).toContain('Test error message');
    });

    test('should handle string errors correctly', () => {
      logger.error('String error', 'TEST_ERROR');
      
      expect(consoleSpy.error).toHaveBeenCalled();
      const errorCall = consoleSpy.error.mock.calls[0];
      expect(errorCall[0]).toContain('String error');
    });
  });

  describe('Performance Logging', () => {
    test('should log performance metrics', () => {
      const startTime = Date.now();
      const endTime = startTime + 100;
      
      logger.logPerformance('TEST_OP', startTime, endTime, 'success');
      
      expect(consoleSpy.log).toHaveBeenCalled();
      const logCall = consoleSpy.log.mock.calls[1];
      expect(logCall[0]).toContain('[PERF]');
      expect(logCall[0]).toContain('Performance: TEST_OP completed in 100ms');
    });
  });
});