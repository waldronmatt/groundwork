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

## Getting Started

Follow the directions [here](https://nx.dev/nx-cloud/intro/what-is-nx-cloud) to set up an nx account and access token.

Create an `nx-cloud.env` file with the following to enable cloud caching:

```bash
NX_CLOUD_ACCESS_TOKEN=your-token
```

Create a `GH_TOKEN` personal access token [here](https://github.com/settings/tokens) and create an `NPM_TOKEN` [here](https://www.npmjs.com/login) via the `Access Tokens` section.

Set up your `NPM_TOKEN` and `NX_CLOUD_ACCESS_TOKEN` via `Settings` -> `Secrets` -> `Actions`.

Enable read and write workflow permissions in your repo via `Settings` -> `Actions` -> `General` -> `Workflow permissions` -> `read and write permissions`.

## Commands

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

Clean up bundle artifacts:

```bash
pnpm clean
```

Compile files and build bundle:

```bash
pnpm build
```

Starts local servers that serves the `build` outputs from their respective from `dist/` folders:

**Note**: Run `pnpm build` first.

```bash
pnpm preview
```

Stub `dist` for project linking without needing to watch and rebuild:

```bash
pnpm stub
```

### Workspace Commands

Install dependecies to the root of the workspace:

```bash
pnpm add -w [package-name]
```

Add a local package as a dependency for another local package:

```bash
pnpm add -D eslint-config-custom --filter vite-project --workspace
```

Remove a local package from another local package:

```bash
pnpm remove eslint-config-custom --filter vite-project
```

Install / run commands for a specific sub-package:

```bash
pnpm --filter vite-project dev
```

### Other Commands

Commit changes using conventional changelog:

```bash
pnpm commit
```

Delete workspace root `node_modules` and `pnpm-lock.yaml` files:

**Note**: Install `rimraf` globally and make sure it is not installed in the workspace root so errors aren't thrown.

```bash
pnpm clear
```

Lint root and `configs/` `js/cjs` files, check for secrets, validate published packages, and verify monorepo best practices:

```bash
pnpm lint:mr
```

Visualize the project structure/dependencies:

```bash
pnpm nx:graph
```

List local packages that have changed since the last tagged release:

```bash
pnpm changed
```

Preview the output result of the `version` command without actually executing it:

**Note**: Set your personal access token as an environment variable in your operating system as `GH_TOKEN` with the token unique identifier as the value.

```bash
pnpm preview:version
```

Preview the output result of the `publish` command without actually executing it:

```bash
pnpm preview:version
```

## NX Distributed Caching

To enable nx distributed caching, refactor the `.github/workflows/release.yml` file via the directions [here](https://nx.dev/recipes/ci/monorepo-ci-github-actions#distributed-ci-with-nx-cloud).

## License

MIT
