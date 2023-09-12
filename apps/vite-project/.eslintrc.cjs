module.exports = {
  root: true,
  extends: ['custom/react.cjs'],
  ignorePatterns: ['dist/**'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.eslint.json', 'tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
