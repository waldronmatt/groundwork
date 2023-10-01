const mappedModule = process.env.TEST_ENV === 'prod' ? '<rootDir>/dist/$1' : '<rootDir>/src/$1';

module.exports = {
  preset: 'jest-config',
  testMatch: ['<rootDir>/src/**?(*.)+(spec|test).+(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)\\.js$': mappedModule,
  },
  testEnvironment: 'jsdom',
};
