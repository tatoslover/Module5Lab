const crypto = require('crypto');

/**
 * IdGenerator - A utility library for generating unique, secure identifiers
 * 
 * Features:
 * - Cryptographically secure random generation
 * - Multiple ID formats for different use cases
 * - Collision detection and prevention
 * - Customizable prefixes and lengths
 * - Performance optimized for high-frequency generation
 */
class IdGenerator {
  
  /**
   * Generate a standard UUID v4 format ID
   * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   * @returns {string} UUID v4 format identifier
   */
  static generate() {
    return crypto.randomUUID();
  }

  /**
   * Generate a short random ID (8 characters)
   * Format: abc12def
   * @returns {string} Short alphanumeric identifier
   */
  static generateShort() {
    return crypto.randomBytes(4).toString('hex');
  }

  /**
   * Generate a medium random ID (16 characters)
   * Format: abc123def456789g
   * @returns {string} Medium alphanumeric identifier
   */
  static generateMedium() {
    return crypto.randomBytes(8).toString('hex');
  }

  /**
   * Generate a long random ID (32 characters)
   * Format: abc123def456789ghijk123lmnop456789q
   * @returns {string} Long alphanumeric identifier
   */
  static generateLong() {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Generate an ID with a custom prefix
   * Format: prefix_xxxxxxxx
   * @param {string} prefix - The prefix to add to the ID
   * @param {number} length - Length of random part (default: 8)
   * @returns {string} Prefixed identifier
   */
  static generateWithPrefix(prefix, length = 8) {
    if (!prefix || typeof prefix !== 'string') {
      throw new Error('Prefix must be a non-empty string');
    }
    
    const randomPart = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').substring(0, length);
    return `${prefix}_${randomPart}`;
  }

  /**
   * Generate a timestamp-based ID with random suffix
   * Format: timestamp_randomsuffix
   * @param {boolean} includeTimestamp - Whether to include timestamp (default: true)
   * @returns {string} Timestamp-based identifier
   */
  static generateTimestamped(includeTimestamp = true) {
    const randomSuffix = crypto.randomBytes(4).toString('hex');
    
    if (includeTimestamp) {
      const timestamp = Date.now().toString(36); // Base36 for shorter representation
      return `${timestamp}_${randomSuffix}`;
    }
    
    return randomSuffix;
  }

  /**
   * Generate a calculator-specific ID
   * Format: calc_xxxxxxxx
   * @returns {string} Calculator-specific identifier
   */
  static generateCalculatorId() {
    return this.generateWithPrefix('calc', 8);
  }

  /**
   * Generate a logger-specific ID
   * Format: log_xxxxxxxx
   * @returns {string} Logger-specific identifier
   */
  static generateLoggerId() {
    return this.generateWithPrefix('log', 8);
  }

  /**
   * Generate a session-specific ID
   * Format: session_xxxxxxxxxxxxxxxx
   * @returns {string} Session-specific identifier
   */
  static generateSessionId() {
    return this.generateWithPrefix('session', 16);
  }

  /**
   * Generate a custom format ID based on pattern
   * Pattern examples:
   * - 'XXXX-XXXX' -> 'a1b2-c3d4'
   * - 'XXX_###_XXX' -> 'abc_123_def'
   * @param {string} pattern - Pattern where X = hex char, # = number, others are literal
   * @returns {string} Pattern-based identifier
   */
  static generateWithPattern(pattern) {
    if (!pattern || typeof pattern !== 'string') {
      throw new Error('Pattern must be a non-empty string');
    }

    let result = '';
    for (let char of pattern) {
      switch (char) {
        case 'X':
          result += crypto.randomBytes(1).toString('hex').charAt(0);
          break;
        case '#':
          result += Math.floor(Math.random() * 10).toString();
          break;
        default:
          result += char;
      }
    }
    return result;
  }

  /**
   * Generate multiple unique IDs at once
   * @param {number} count - Number of IDs to generate
   * @param {string} type - Type of ID ('standard', 'short', 'medium', 'long')
   * @returns {string[]} Array of unique identifiers
   */
  static generateBatch(count, type = 'standard') {
    if (count <= 0 || !Number.isInteger(count)) {
      throw new Error('Count must be a positive integer');
    }

    const ids = new Set(); // Use Set to ensure uniqueness
    const generateFunction = this.getGenerateFunction(type);

    while (ids.size < count) {
      ids.add(generateFunction());
    }

    return Array.from(ids);
  }

  /**
   * Validate if an ID matches expected format
   * @param {string} id - The ID to validate
   * @param {string} expectedType - Expected type ('uuid', 'short', 'medium', 'long', 'prefixed')
   * @returns {boolean} Whether ID matches expected format
   */
  static validate(id, expectedType = 'uuid') {
    if (!id || typeof id !== 'string') {
      return false;
    }

    const patterns = {
      uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      short: /^[0-9a-f]{8}$/i,
      medium: /^[0-9a-f]{16}$/i,
      long: /^[0-9a-f]{32}$/i,
      prefixed: /^[a-z]+_[0-9a-f]+$/i,
      timestamped: /^[0-9a-z]+_[0-9a-f]+$/i
    };

    return patterns[expectedType] ? patterns[expectedType].test(id) : false;
  }

  /**
   * Extract information from a timestamped ID
   * @param {string} timestampedId - ID generated with generateTimestamped()
   * @returns {object} Object containing timestamp and random parts
   */
  static parseTimestamped(timestampedId) {
    if (!this.validate(timestampedId, 'timestamped')) {
      throw new Error('Invalid timestamped ID format');
    }

    const [timestampPart, randomPart] = timestampedId.split('_');
    const timestamp = parseInt(timestampPart, 36);
    
    return {
      timestamp: new Date(timestamp),
      timestampRaw: timestamp,
      randomPart,
      fullId: timestampedId,
      age: Date.now() - timestamp
    };
  }

  /**
   * Get statistics about ID generation performance
   * @param {number} iterations - Number of IDs to generate for testing (default: 1000)
   * @returns {object} Performance statistics
   */
  static getPerformanceStats(iterations = 1000) {
    const stats = {
      iterations,
      types: {},
      collisions: 0,
      totalTime: 0
    };

    const types = ['standard', 'short', 'medium', 'long'];
    
    for (const type of types) {
      const startTime = process.hrtime.bigint();
      const ids = new Set();
      
      for (let i = 0; i < iterations; i++) {
        const id = this.getGenerateFunction(type)();
        if (ids.has(id)) {
          stats.collisions++;
        }
        ids.add(id);
      }
      
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
      
      stats.types[type] = {
        duration,
        uniqueIds: ids.size,
        collisionRate: ((iterations - ids.size) / iterations * 100).toFixed(4) + '%',
        idsPerSecond: Math.round(iterations / (duration / 1000))
      };
      
      stats.totalTime += duration;
    }

    return stats;
  }

  /**
   * Helper method to get the appropriate generation function
   * @private
   */
  static getGenerateFunction(type) {
    switch (type) {
      case 'standard':
        return () => this.generate();
      case 'short':
        return () => this.generateShort();
      case 'medium':
        return () => this.generateMedium();
      case 'long':
        return () => this.generateLong();
      default:
        throw new Error(`Unknown ID type: ${type}`);
    }
  }

  /**
   * Generate a secure random string with custom character set
   * @param {number} length - Length of the string to generate
   * @param {string} charset - Character set to use (default: alphanumeric)
   * @returns {string} Random string
   */
  static generateCustom(length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    if (length <= 0 || !Number.isInteger(length)) {
      throw new Error('Length must be a positive integer');
    }

    let result = '';
    const bytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
      result += charset[bytes[i] % charset.length];
    }
    
    return result;
  }
}

module.exports = IdGenerator;