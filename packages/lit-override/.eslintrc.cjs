module.exports = {
  root: true,
  extends: ['custom/ts.cjs', 'custom/jest.cjs', 'custom/lit.cjs'],
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['lit'],
  overrides: [
    {
      files: ['*.cjs'],
      extends: ['custom/js.cjs'],
    },
  ],
  ignorePatterns: ['dist/**', 'coverage'],
};
