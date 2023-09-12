module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'airbnb-base'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'linebreak-style': 0,
  },
  ignorePatterns: ['apps/**', 'packages/**'],
};
