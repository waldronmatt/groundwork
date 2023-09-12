module.exports = {
  '**/*': ['secretlint', 'prettier --cache --write --ignore-unknown', 'manypkg check', 'npx publint'],
};
