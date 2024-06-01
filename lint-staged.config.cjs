module.exports = {
  '*': ['secretlint', 'prettier --cache --write --ignore-unknown'],
  '**/package.json': ['npx syncpack lint --config .syncpackrc', 'manypkg check'],
  'packages/**/package.json': ['node ./publint.js'],
  '*.{cjs,js,jsx,ts,tsx}': ['nx affected -t lint --fix --files'],
  '*.{ts,tsx}': ['nx affected -t test --files'],
  'packages/**/*.{ts,tsx}': ['npx nx run-many -t lint:knip'],
};
