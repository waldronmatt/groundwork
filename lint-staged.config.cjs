module.exports = {
  '*': ['secretlint', 'prettier --cache --write --ignore-unknown'],
  '*.{cjs,js,jsx,ts,tsx}': ['nx affected -t lint --fix --files'],
  '*.{ts,tsx}': ['nx affected -t test --files'],
};
