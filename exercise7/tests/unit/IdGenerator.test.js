const IdGenerator = require('../../libraries/IdGenerator');

describe('IdGenerator Library Unit Tests', () => {
  
  describe('Basic ID Generation', () => {
    test('should generate standard UUID v4 format', () => {
      const id = IdGenerator.generate();
      expect(typeof id).toBe('string');
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    test('should generate unique UUIDs', () => {
      const id1 = IdGenerator.generate();
      const id2 = IdGenerator.generate();
      expect(id1).not.toBe(id2);
    });

    test('should generate short IDs (8 characters)', () => {
      const id = IdGenerator.generateShort();
      expect(typeof id).toBe('string');
      expect(id).toHaveLength(8);
      expect(id).toMatch(/^[0-9a-f]{8}$/i);
    });

    test('should generate medium IDs (16 characters)', () => {
      const id = IdGenerator.generateMedium();
      expect(typeof id).toBe('string');
      expect(id).toHaveLength(16);
      expect(id).toMatch(/^[0-9a-f]{16}$/i);
    });

    test('should generate long IDs (32 characters)', () => {
      const id = IdGenerator.generateLong();
      expect(typeof id).toBe('string');
      expect(id).toHaveLength(32);
      expect(id).toMatch(/^[0-9a-f]{32}$/i);
    });
  });

  describe('Prefixed ID Generation', () => {
    test('should generate ID with custom prefix', () => {
      const id = IdGenerator.generateWithPrefix('test');
      expect(id).toMatch(/^test_[0-9a-f]{8}$/i);
    });

    test('should generate ID with custom prefix and length', () => {
      const id = IdGenerator.generateWithPrefix('custom', 12);
      expect(id).toMatch(/^custom_[0-9a-f]{12}$/i);
    });

    test('should throw error for invalid prefix', () => {
      expect(() => {
        IdGenerator.generateWithPrefix('');
      }).toThrow('Prefix must be a non-empty string');

      expect(() => {
        IdGenerator.generateWithPrefix(null);
      }).toThrow('Prefix must be a non-empty string');
    });

    test('should generate calculator-specific IDs', () => {
      const id = IdGenerator.generateCalculatorId();
      expect(id).toMatch(/^calc_[0-9a-f]{8}$/i);
    });

    test('should generate logger-specific IDs', () => {
      const id = IdGenerator.generateLoggerId();
      expect(id).toMatch(/^log_[0-9a-f]{8}$/i);
    });

    test('should generate session-specific IDs', () => {
      const id = IdGenerator.generateSessionId();
      expect(id).toMatch(/^session_[0-9a-f]{16}$/i);
    });
  });

  describe('Timestamped ID Generation', () => {
    test('should generate timestamped ID', () => {
      const id = IdGenerator.generateTimestamped();
      expect(id).toMatch(/^[0-9a-z]+_[0-9a-f]{8}$/i);
    });

    test('should generate ID without timestamp', () => {
      const id = IdGenerator.generateTimestamped(false);
      expect(id).toMatch(/^[0-9a-f]{8}$/i);
    });

    test('should be able to parse timestamped ID', () => {
      const id = IdGenerator.generateTimestamped();
      const parsed = IdGenerator.parseTimestamped(id);
      
      expect(parsed.timestamp).toBeInstanceOf(Date);
      expect(parsed.timestampRaw).toBeGreaterThan(0);
      expect(parsed.randomPart).toMatch(/^[0-9a-f]{8}$/i);
      expect(parsed.fullId).toBe(id);
      expect(parsed.age).toBeGreaterThanOrEqual(0);
    });

    test('should throw error when parsing invalid timestamped ID', () => {
      expect(() => {
        IdGenerator.parseTimestamped('invalid-id');
      }).toThrow('Invalid timestamped ID format');
    });
  });

  describe('Pattern-based ID Generation', () => {
    test('should generate ID from pattern with X (hex) placeholders', () => {
      const id = IdGenerator.generateWithPattern('XXX-XXX');
      expect(id).toMatch(/^[0-9a-f]{3}-[0-9a-f]{3}$/i);
    });

    test('should generate ID from pattern with # (number) placeholders', () => {
      const id = IdGenerator.generateWithPattern('###-###');
      expect(id).toMatch(/^\d{3}-\d{3}$/);
    });

    test('should generate ID from mixed pattern', () => {
      const id = IdGenerator.generateWithPattern('XX##XX');
      expect(id).toMatch(/^[0-9a-f]{2}\d{2}[0-9a-f]{2}$/i);
    });

    test('should preserve literal characters in pattern', () => {
      const id = IdGenerator.generateWithPattern('ABC-XXX-123');
      expect(id).toMatch(/^ABC-[0-9a-f]{3}-123$/i);
    });

    test('should throw error for invalid pattern', () => {
      expect(() => {
        IdGenerator.generateWithPattern('');
      }).toThrow('Pattern must be a non-empty string');

      expect(() => {
        IdGenerator.generateWithPattern(null);
      }).toThrow('Pattern must be a non-empty string');
    });
  });

  describe('Batch ID Generation', () => {
    test('should generate multiple unique IDs', () => {
      const ids = IdGenerator.generateBatch(5, 'short');
      expect(ids).toHaveLength(5);
      
      // Check uniqueness
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(5);
      
      // Check format
      ids.forEach(id => {
        expect(id).toMatch(/^[0-9a-f]{8}$/i);
      });
    });

    test('should generate batch of different types', () => {
      const shortIds = IdGenerator.generateBatch(3, 'short');
      const mediumIds = IdGenerator.generateBatch(3, 'medium');
      const longIds = IdGenerator.generateBatch(3, 'long');
      
      shortIds.forEach(id => expect(id).toHaveLength(8));
      mediumIds.forEach(id => expect(id).toHaveLength(16));
      longIds.forEach(id => expect(id).toHaveLength(32));
    });

    test('should throw error for invalid count', () => {
      expect(() => {
        IdGenerator.generateBatch(0);
      }).toThrow('Count must be a positive integer');

      expect(() => {
        IdGenerator.generateBatch(-1);
      }).toThrow('Count must be a positive integer');

      expect(() => {
        IdGenerator.generateBatch(1.5);
      }).toThrow('Count must be a positive integer');
    });
  });

  describe('ID Validation', () => {
    test('should validate UUID format', () => {
      const validUuid = IdGenerator.generate();
      expect(IdGenerator.validate(validUuid, 'uuid')).toBe(true);
      
      expect(IdGenerator.validate('invalid-uuid', 'uuid')).toBe(false);
      expect(IdGenerator.validate('12345678-1234-1234-1234-123456789012', 'uuid')).toBe(false);
    });

    test('should validate short ID format', () => {
      const validShort = IdGenerator.generateShort();
      expect(IdGenerator.validate(validShort, 'short')).toBe(true);
      
      expect(IdGenerator.validate('12345', 'short')).toBe(false);
      expect(IdGenerator.validate('123456789', 'short')).toBe(false);
    });

    test('should validate prefixed ID format', () => {
      const validPrefixed = IdGenerator.generateWithPrefix('test');
      expect(IdGenerator.validate(validPrefixed, 'prefixed')).toBe(true);
      
      expect(IdGenerator.validate('invalid', 'prefixed')).toBe(false);
      expect(IdGenerator.validate('test-123', 'prefixed')).toBe(false);
    });

    test('should validate timestamped ID format', () => {
      const validTimestamped = IdGenerator.generateTimestamped();
      expect(IdGenerator.validate(validTimestamped, 'timestamped')).toBe(true);
      
      expect(IdGenerator.validate('invalid', 'timestamped')).toBe(false);
    });

    test('should return false for invalid inputs', () => {
      expect(IdGenerator.validate(null, 'uuid')).toBe(false);
      expect(IdGenerator.validate(undefined, 'uuid')).toBe(false);
      expect(IdGenerator.validate(123, 'uuid')).toBe(false);
      expect(IdGenerator.validate('', 'uuid')).toBe(false);
    });

    test('should return false for unknown validation type', () => {
      const id = IdGenerator.generate();
      expect(IdGenerator.validate(id, 'unknown')).toBe(false);
    });
  });

  describe('Custom ID Generation', () => {
    test('should generate custom string with default charset', () => {
      const id = IdGenerator.generateCustom(10);
      expect(id).toHaveLength(10);
      expect(id).toMatch(/^[A-Za-z0-9]{10}$/);
    });

    test('should generate custom string with custom charset', () => {
      const id = IdGenerator.generateCustom(5, 'ABC123');
      expect(id).toHaveLength(5);
      expect(id).toMatch(/^[ABC123]{5}$/);
    });

    test('should throw error for invalid length', () => {
      expect(() => {
        IdGenerator.generateCustom(0);
      }).toThrow('Length must be a positive integer');

      expect(() => {
        IdGenerator.generateCustom(-1);
      }).toThrow('Length must be a positive integer');

      expect(() => {
        IdGenerator.generateCustom(1.5);
      }).toThrow('Length must be a positive integer');
    });
  });

  describe('Performance and Statistics', () => {
    test('should provide performance statistics', () => {
      const stats = IdGenerator.getPerformanceStats(100);
      
      expect(stats.iterations).toBe(100);
      expect(stats.totalTime).toBeGreaterThan(0);
      expect(stats.collisions).toBeGreaterThanOrEqual(0);
      
      // Check that all types are tested
      expect(stats.types.standard).toBeDefined();
      expect(stats.types.short).toBeDefined();
      expect(stats.types.medium).toBeDefined();
      expect(stats.types.long).toBeDefined();
      
      // Check statistics format
      Object.values(stats.types).forEach(typeStats => {
        expect(typeStats.duration).toBeGreaterThan(0);
        expect(typeStats.uniqueIds).toBeGreaterThan(0);
        expect(typeStats.collisionRate).toMatch(/^\d+\.\d{4}%$/);
        expect(typeStats.idsPerSecond).toBeGreaterThan(0);
      });
    });

    test('should handle performance test with custom iterations', () => {
      const stats = IdGenerator.getPerformanceStats(50);
      expect(stats.iterations).toBe(50);
    });
  });

  describe('Uniqueness and Collision Testing', () => {
    test('should generate unique IDs in high-frequency scenario', () => {
      const ids = new Set();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        ids.add(IdGenerator.generate());
      }
      
      // Should have no collisions with UUID generation
      expect(ids.size).toBe(iterations);
    });

    test('should have minimal collisions with short IDs', () => {
      const ids = new Set();
      const iterations = 100;
      
      for (let i = 0; i < iterations; i++) {
        ids.add(IdGenerator.generateShort());
      }
      
      // Short IDs might have some collisions, but should be rare
      const collisionRate = (iterations - ids.size) / iterations;
      expect(collisionRate).toBeLessThan(0.05); // Less than 5% collision rate
    });

    test('should generate different IDs with same prefix', () => {
      const id1 = IdGenerator.generateWithPrefix('test');
      const id2 = IdGenerator.generateWithPrefix('test');
      
      expect(id1).not.toBe(id2);
      expect(id1.startsWith('test_')).toBe(true);
      expect(id2.startsWith('test_')).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty charset gracefully', () => {
      expect(() => {
        IdGenerator.generateCustom(5, '');
      }).not.toThrow(); // Should handle empty charset by using modulo
    });

    test('should handle very large batch requests', () => {
      const ids = IdGenerator.generateBatch(1000, 'medium');
      expect(ids).toHaveLength(1000);
      
      // Check uniqueness
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(1000);
    });

    test('should handle concurrent ID generation', async () => {
      const promises = Array(100).fill().map(() => 
        Promise.resolve(IdGenerator.generate())
      );
      
      const ids = await Promise.all(promises);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(100);
    });
  });
});