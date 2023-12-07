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

Run tests against compiled files:

**Note**: Run `pnpm build` first

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

**Note**: Run `pnpm build` first

```bash
pnpm preview
```

## Additional Commands

Delete workspace root `node_modules` and `pnpm-lock.yaml` files:

**Note**: Follow the directions [here](SETUP.md#global-packages) to install `rimraf` globally so errors aren't thrown.

```bash
pnpm delete
```

Check for secrets, format files, lint dependency versions, validate published packages, and verify monorepo best practices:

```bash
pnpm lint:mr
```

Visualize the project structure/dependencies:

```bash
pnpm nx:graph
```

## Additional Documentation

Additional monorepo documentation can be [found here](docs/repo/README.md).

## License

MIT
