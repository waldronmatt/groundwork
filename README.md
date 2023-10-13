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

Follow the directions [here](https://nx.dev/nx-cloud/intro/what-is-nx-cloud) to set up an nx account and access token.

Create an `nx-cloud.env` file with the following to enable cloud caching:

```bash
NX_CLOUD_ACCESS_TOKEN=your-token
```

Create a `GH_TOKEN` personal access token [here](https://github.com/settings/tokens) and create an `NPM_TOKEN` [here](https://www.npmjs.com/login) via the `Access Tokens` section.

Set up your `NPM_TOKEN` and `NX_CLOUD_ACCESS_TOKEN` via `Settings` -> `Secrets` -> `Actions`.

Enable read and write workflow permissions in your repo via `Settings` -> `Actions` -> `General` -> `Workflow permissions` -> `read and write permissions`.

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

**Note**: Run `pnpm build` first.

```bash
pnpm preview
```

Stub `dist` for project linking without needing to watch and rebuild:

```bash
pnpm stub
```

## NX Distributed Caching

To enable nx distributed caching, refactor the `.github/workflows/release.yml` file via the directions [here](https://nx.dev/recipes/ci/monorepo-ci-github-actions#distributed-ci-with-nx-cloud).

## Additional Documentation

Additional monorepo documentation can be [found here](docs/repo/README.md).

## License

MIT
