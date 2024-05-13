module.exports = {
  plugins: ['chai-expect', 'chai-friendly'],
  extends: ['plugin:chai-expect/recommended', 'plugin:chai-friendly/recommended'],
  rules: {
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
  },
};
