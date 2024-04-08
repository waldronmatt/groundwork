module.exports = {
  preset: 'jest-config',
  testMatch: ['<rootDir>/src/utils/**?(*.)+(spec|test).+(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/src/lit-override.spec.ts'],
};
