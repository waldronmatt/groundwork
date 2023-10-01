const mappedModule = process.env.TEST_ENV === 'prod' ? '<rootDir>/dist/components/$1' : '<rootDir>/lib/components/$1';

module.exports = {
  preset: 'jest-config',
  testMatch: ['<rootDir>/lib/**/*?(*.)+(spec|test).+(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)\\.js$': mappedModule,
    '\\.css$': '<rootDir>/identity-obj-proxy-esm.cjs',
  },
  testEnvironment: 'jsdom',
};
