module.exports = {
  preset: 'jest-config',
  testMatch: ['<rootDir>/src/**?(*.)+(spec|test).+(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)\\.js$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
};
