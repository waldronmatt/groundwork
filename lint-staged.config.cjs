module.exports = {
  '*': ['secretlint', 'prettier --cache --write --ignore-unknown'],
  '{packages,templates}/**/package.json': ['npx syncpack lint --config .syncpackrc', 'manypkg check'],
  '{packages,templates}/**/package.json': ['node ./publint.js', 'npx nx run-many -t lint:types'],
  '*.{cjs,js,jsx,ts,tsx}': ['nx affected -t lint --fix --files'],
  '*.{ts,tsx}': ['nx affected -t test --files'],
  '{packages,templates}/**/*.{ts,tsx}': ['npx nx run-many -t lint:knip'],
};
