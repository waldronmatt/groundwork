# Basic Math

A demo package implementing modern defaults and tooling for publishing a package to `npm`.

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/library
```

## Getting Started

```ts
import { addition } from '@waldronmatt/library/addition.js';

console.log(addition(1, 2)); // Output: 3
```

## Monorepo Use

For use inside this monorepo, we import via below so we can use directly from source files.

```ts
import { addition } from '@waldronmatt/library/src/addition.js';
```

## License

MIT
