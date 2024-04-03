<img src="https://raw.githubusercontent.com/waldronmatt/groundwork/main/docs/repo/assets/pnpm-nx-lerna-dragon-logo.png" alt="blue dragon" width="384" height="384" />

# groundwork

Welcome to my personal monorepo, a curated collection of boilerplate projects and reusable configurations. This repository serves as my go-to resource for quickly setting up new projects and experimenting with emerging technologies. Whether you're a fellow developer or just curious, feel free to explore and utilize these setups.

## Installation

Install dependencies:

```bash
pnpm i
```

Install additional required dependencies

```bash
npx playwright install
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

**Note**: Run `pnpm clean` before `pnpm build` to clear `dist` output

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
