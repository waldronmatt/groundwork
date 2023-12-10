module.exports = {
  preset: 'jest-config',
  testMatch: ['<rootDir>/lib/**/*?(*.)+(spec|test).+(ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)\\.js$': '<rootDir>/lib/components/$1',
    '\\.css$': '<rootDir>/identity-obj-proxy-esm.cjs',
  },
  testEnvironment: 'jsdom',
};
