module.exports = {
  root: true,
  extends: ['custom/ts.cjs', 'custom/jest.cjs', 'custom/lit.cjs'],
  plugins: ['lit'],
  ignorePatterns: ['dist/**', 'coverage'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['*.cjs'],
      extends: ['custom/js.cjs'],
    },
  ],
  rules: {
    '@typescript-eslint/indent': 'off',
  },
};
