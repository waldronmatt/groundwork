module.exports = {
  '*': [
    'secretlint',
    'prettier --cache --write --ignore-unknown',
    'npx syncpack lint --config .syncpackrc',
    'npx publint run ./',
    'npx manypkg check',
  ],
  '*.{cjs,js,jsx,ts,tsx}': ['nx affected -t lint --fix --files'],
  '*.{ts,tsx}': ['nx affected -t test --files'],
};
