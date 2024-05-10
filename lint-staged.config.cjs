module.exports = {
  '*': ['secretlint', 'prettier --cache --write --ignore-unknown'],
  '**/package.json': ['node ./publint.js', 'npx syncpack lint --config .syncpackrc', 'manypkg check'],
  '*.{cjs,js,jsx,ts,tsx}': ['nx affected -t lint --fix --files'],
  '*.{ts,tsx}': ['nx affected -t test --files', 'npx nx run-many -t lint:knip'],
};
