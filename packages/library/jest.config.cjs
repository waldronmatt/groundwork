module.exports = {
  preset: 'jest-config',
  testMatch: ['<rootDir>/src/core/**?(*.)+(spec|test).+(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)\\.js$': '<rootDir>/src/core/$1',
    '^@localTypes/(.*)\\.js$': '<rootDir>/src/types/$1',
  },
  testEnvironment: 'jsdom',
};
