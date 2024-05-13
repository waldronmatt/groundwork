module.exports = {
  root: true,
  extends: ['custom/ts.cjs', 'custom/lit.cjs'],
  ignorePatterns: ['dist/**'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/indent': 'off',
  },
};
