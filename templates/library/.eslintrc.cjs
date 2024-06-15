module.exports = {
  root: true,
  extends: ['custom/ts.cjs', 'custom/jest.cjs'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['*.cjs'],
      extends: ['custom/js.cjs'],
    },
  ],
  ignorePatterns: ['dist/**', 'coverage'],
};
