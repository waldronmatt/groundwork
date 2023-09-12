module.exports = {
  root: true,
  extends: ['custom/js.cjs'],
  // only lint monorepo root and configs files
  ignorePatterns: ['apps/**', 'packages/**'],
};
