const mappedModule = process.env.TEST_ENV === 'prod' ? '<rootDir>/dist/$1' : '<rootDir>/src/$1';

module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['<rootDir>/src/**?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
  moduleNameMapper: {
    '^@/(.*)\\.js$': mappedModule,
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
};
