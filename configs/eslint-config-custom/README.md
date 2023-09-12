# eslint-config-custom

## Installation

Install dependencies:

```bash
pnpm add -D eslint-config-custom eslint --filter [package-name] --workspace
```

## Getting Started

`eslintrc.cjs`

```js
module.exports = {
  extends: ['custom/js.cjs'],
};
```

## License

MIT
