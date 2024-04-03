# groundwork

Welcome to my personal monorepo, a curated collection of boilerplate projects and reusable configurations. This repository serves as my go-to resource for quickly setting up new projects and experimenting with emerging technologies. Whether you're a fellow developer or just curious, feel free to explore and utilize these setups.

## Prerequisites

For cloning, follow the directions to install [pnpm](docs/repo/SETUP.md#pnpm), [additional packages](docs/repo/SETUP.md#additional-packages), and [nx](docs/repo/SETUP.md#nx).

For forking, follow all the directions found in the [setup](docs/repo/SETUP.md) page.

## Installation

Install dependencies:

```bash
pnpm i
```

## Getting Started

Run local development servers:

```bash
pnpm dev
```

Lint files:

```bash
pnpm lint
```

Run tests with coverage:

```bash
pnpm test
```

Compile files and build bundle:

```bash
pnpm build
```

Starts local servers that serves the `build` outputs from their respective output folders:

**Note**: Run `pnpm build` first

```bash
pnpm preview
```

## Additional Documentation

Additional documentation for this repo can be [found here](docs/repo/README.md).

## License

MIT
