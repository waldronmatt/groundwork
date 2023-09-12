module.exports = {
  env: {
    jest: true,
  },
  plugins: ['jest', 'jest-dom', 'jest-formatting'],
  extends: ['plugin:jest/recommended', 'plugin:jest-dom/recommended', 'plugin:jest-formatting/recommended'],
};
