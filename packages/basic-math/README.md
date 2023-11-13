# Basic Math

A utility helper to do addition and subtraction.

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/basic-math
```

## Getting Started

```ts
import { addition } from '@waldronmatt/basic-math/addition.js';

console.log(addition(1, 2)); // Output: 3
```

## Monorepo Use

For use inside this monorepo, we import via below so we can use directly from source files.

```ts
import { addition } from '@waldronmatt/basic-math/src/addition.js';
```

## License

MIT
