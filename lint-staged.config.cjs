module.exports = {
  '*': [
    'secretlint',
    'prettier --cache --write --ignore-unknown',
    'npx syncpack lint-semver-ranges --config .syncpackrc',
    'npx publint run ./',
    'npx manypkg check',
  ],
  '*.{cjs,js,jsx,ts,tsx}': ['nx affected:lint --fix --files'],
  '*.{ts,tsx}': ['nx affected:test --fix --files'],
};
