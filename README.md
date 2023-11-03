# pnpm | nx | lerna-lite

A monorepo boilerplate using `pnpm` (installer), `nx` (task-runner), and `lerna lite` (publisher).

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

Token setup and repository settings can be [found here](docs/repo/SETUP.md).

## Getting Started

**Note**: Append `--no-cache` at the end of cached commands **directly** to disable nx cloud caching and append `--skip-nx-cache` to disable cache connection to `nx cloud`. Example: `npx nx run-many -t test --no-cache`

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

Run tests against compiled files:

**Note**: Run `pnpm build` first.

```bash
pnpm test:prod
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

**Note**: Run `pnpm build` first.

```bash
pnpm preview
```

## Additional Documentation

Additional monorepo documentation can be [found here](docs/repo/README.md).

## License

MIT
