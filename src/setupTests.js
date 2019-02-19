expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    if (received >= floor && received <= ceiling) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
  toBeInSet(received, set) {
    if (set.includes(received)) {
      return {
        message: () => `expected ${received} not to be in set ${set}`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to be in set ${set}`,
        pass: false
      }
    }
  },
  toHave(received, key) {
    if (received.has(key)) {
      return {
        message: () => `expected ${received} not to have ${key}`,
        pass: true
      };
    } else {
      return {
        message: () => `expected ${received} to have ${key}`,
        pass: false
      };
    }
  }
});
