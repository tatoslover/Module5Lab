// demo.js - Showcase Enhanced Calculator with Logging
// This demonstrates the Generic Logger Library and ID Generation features

const Calculator = require('./libraries/Calculator');
const Logger = require('./libraries/Logger');
const IdGenerator = require('./libraries/IdGenerator');

console.log('='.repeat(80));
console.log('🧮 Exercise 7 - Enhanced Calculator with Libraries Demo');
console.log('='.repeat(80));
console.log();

// Demonstrate ID Generation
console.log('📋 ID Generation Showcase:');
console.log('- Standard UUID:', IdGenerator.generate());
console.log('- Calculator ID:', IdGenerator.generateCalculatorId());
console.log('- Logger ID:', IdGenerator.generateLoggerId());
console.log('- Session ID:', IdGenerator.generateSessionId());
console.log('- Custom Pattern:', IdGenerator.generateWithPattern('XXX-###-XXX'));
console.log();

// Create a demo logger
const demoLogger = new Logger('demo_script', 'INFO');
demoLogger.logSeparator('CALCULATOR OPERATIONS DEMO');

// Create calculator instance (it will automatically initialize with logging)
const calc = new Calculator();

console.log('\n🔢 Basic Calculator Operations with Enhanced Logging:');

// Basic operations
console.log('\n➕ Addition:');
const sum = calc.add(15, 25);

console.log('\n➖ Subtraction:');
const difference = calc.subtract(50, 18);

console.log('\n✖️ Multiplication:');
const product = calc.multiply(7, 8);

console.log('\n➗ Division:');
const quotient = calc.divide(84, 12);

console.log('\n🔢 Advanced Operations:');
const power = calc.power(2, 8);
const squareRoot = calc.sqrt(64);

// Chain calculations demonstration
console.log('\n🔗 Chain Calculations:');
const chainResult = calc
  .startChain(10)
  .chainAdd(5)
  .chainMultiply(2)
  .chainSubtract(3)
  .chainDivide(3)
  .endChain();

// Demonstrate error handling and validation
console.log('\n⚠️ Error Handling and Validation:');
try {
  calc.divide(10, 0);
} catch (error) {
  demoLogger.error('Division by zero caught', 'DEMO_ERROR_HANDLING');
}

try {
  calc.sqrt(-16);
} catch (error) {
  demoLogger.error('Negative square root caught', 'DEMO_ERROR_HANDLING');
}

// Performance logging demonstration
console.log('\n⏱️ Performance Logging:');
const perfStartTime = Date.now();
for (let i = 0; i < 1000; i++) {
  calc.add(Math.random() * 100, Math.random() * 100);
}
const perfEndTime = Date.now();
demoLogger.logPerformance('BULK_OPERATIONS', perfStartTime, perfEndTime, '1000 additions completed');

// Logger features demonstration
console.log('\n📝 Logger Features Demonstration:');

demoLogger.info('This is an informational message', 'sample_result', 'INFO_DEMO');
demoLogger.warn('This is a warning message', 'WARNING_DEMO');
demoLogger.error('This is an error message', 'ERROR_DEMO');

// Debug logging (won't show unless level is DEBUG)
demoLogger.setLogLevel('DEBUG');
demoLogger.debug('This debug message will now be visible', { debug: 'data' }, 'DEBUG_DEMO');

// Operation logging
demoLogger.logOperation('DEMO_OP', [100, 200], 300, '+');

// Object logging
const sampleObject = {
  calculatorId: calc.id,
  operations: calc.getOperationCount(),
  lastResult: calc.getLastResult()
};
demoLogger.logObject(sampleObject, 'Calculator Stats');

// Child logger demonstration
console.log('\n👶 Child Logger Example:');
const childLogger = demoLogger.createChild('child_demo', 'INFO');
childLogger.info('Message from child logger', null, 'CHILD_DEMO');

// Calculator statistics
console.log('\n📊 Calculator Statistics:');
const stats = calc.getStats();
demoLogger.info('Calculator statistics retrieved', JSON.stringify(stats, null, 2), 'STATS');

// Session end
demoLogger.logSessionEnd('DEMO_SESSION', {
  totalOperations: calc.getOperationCount(),
  finalResult: calc.getLastResult(),
  demoCompleted: true
});

demoLogger.logSeparator('DEMO COMPLETED');

console.log('\n✅ Demo completed successfully!');
console.log('🎯 Key Features Demonstrated:');
console.log('   - Secure random ID generation using crypto.randomUUID()');
console.log('   - Structured logging with caller ID and session tracking');
console.log('   - Operation logging with inputs and results');
console.log('   - Error handling and validation logging');
console.log('   - Performance metrics tracking');
console.log('   - Chain calculation logging');
console.log('   - Log level filtering (INFO/DEBUG/WARN/ERROR)');
console.log('   - Child logger creation with session inheritance');
console.log('\n🚀 Ready for production use!');