# Parity

A utility helper to check if a number is even or odd.

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/parity
```

## Getting Started

```ts
import { isEven } from '@waldronmatt/parity/even.js';

console.log(isEven(4)); // Output: true
```

## Monorepo Use

For use inside this monorepo, we import via below so we can use directly from source files.

```ts
import { isEven } from '@waldronmatt/parity/src/even.js';
```

## License

MIT
