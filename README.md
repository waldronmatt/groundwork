# groundwork

Welcome to my personal monorepo, a curated collection of boilerplate projects and reusable configurations. This repository serves as my go-to resource for quickly setting up new projects and experimenting with emerging technologies. Whether you're a fellow developer or just curious, feel free to explore and utilize these setups.

## Installation

Install dependencies:

**Note**: Will set up husky and hooks automatically via `prepare` lifecycle script.

```bash
pnpm i
```

## Getting Started

Run local development servers:

```bash
pnpm dev
```

Lint files:

**Note**: Append `--fix` to have `eslint` automatically fix issues

```bash
pnpm lint
```

Run tests with coverage:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Compile files and build bundle:

**Note**: It is recommended to run `pnpm clean` before `pnpm build`

```bash
pnpm build
```

Starts local servers that serves the `build` outputs from their respective output folders:

**Note**: Run `pnpm build` first

```bash
pnpm preview
```

## Additional Documentation

Additional project setup, commands and documentation can be [found here](docs/repo/README.md).

## License

MIT
