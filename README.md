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

**Note**: Append `--skip-nx-cache` at the end of cached commands to disable nx cloud caching

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

**Note**: It is recommended to run `pnpm clean` before `pnpm build`

```bash
pnpm build
```

Clean up bundle artifacts:

```bash
pnpm clean
```

## Additional Documentation

Additional monorepo documentation can be [found here](docs/repo/README.md).

## License

MIT
