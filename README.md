# groundwork

Welcome to my personal monorepo, a curated collection of boilerplate projects and reusable configurations. This repository serves as my go-to resource for quickly setting up new projects and experimenting with emerging technologies. Whether you're a fellow developer or just curious, feel free to explore and utilize these setups.

## Sites

Below is a list of boilerplate sites:

- [Vite](https://groundwork-vite.netlify.app/)
- [Storybook](https://groundwork-storybook.netlify.app/)

## Installation

Install dependencies:

```bash
pnpm i
```

Install hooks:

```bash
pnpm prepare
```

## Setup

Repository setup can be [found here](docs/repo/SETUP.md).

## Getting Started

Commit changes using conventional changelog:

```bash
pnpm commit
```

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

Clean up bundle artifacts:

```bash
pnpm clean
```

Starts local servers that serves the `build` outputs from their respective output folders:

**Note**: Run `pnpm build` first

```bash
pnpm preview
```

## Additional Documentation

Additional monorepo documentation can be [found here](docs/repo/README.md).

## License

MIT
