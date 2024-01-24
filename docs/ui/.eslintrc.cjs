module.exports = {
  root: true,
  extends: ['custom/storybook.cjs', 'custom/vitest.cjs'],
  ignorePatterns: ['dist/**', 'vite.config.ts'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
};
