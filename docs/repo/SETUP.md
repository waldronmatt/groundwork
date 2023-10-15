# Repository Setup

## Tokens

### NX

Follow the directions [here](https://nx.dev/nx-cloud/set-up) to set up an `nx` account and [here](https://nx.dev/nx-cloud/account/access-tokens) to set up an `nx` access token.

Create an `nx-cloud.env` file with the following to enable cloud caching:

```bash
NX_CLOUD_ACCESS_TOKEN=your-token
```

### Github and NPM

Create a `GH_TOKEN` personal access token [here](https://github.com/settings/tokens) and create an `NPM_TOKEN` [here](https://www.npmjs.com/login) via the `Access Tokens` section.

Set up your `NPM_TOKEN` and `NX_CLOUD_ACCESS_TOKEN` via `Settings` -> `Secrets` -> `Actions`.

## Repository Permissions

### Github

Enable read and write workflow permissions in your repo via `Settings` -> `Actions` -> `General` -> `Workflow permissions` -> `read and write permissions`.

### Renovate Automerge

Go to `Option` and activate at least `Allow auto-merge` and `Automatically delete head branches`.

Go to `Branches` and add a branch protection rule for your `main` branch. Activate `Require status checks to pass before merging` and `Require branches to be up to date before merging`.

### Dependabot Integration

Have Renovate delegate vulnerability checks to Dependabot by enabling `Dependabot Alerts` via `Settings`. For private repositoies, enable `Dependency Graph` via `Settings` -> `Code security and analysis`.

## NX Distributed Caching

To enable nx distributed caching, refactor the `.github/workflows/release.yml` file via the directions [here](https://nx.dev/recipes/ci/monorepo-ci-github-actions#distributed-ci-with-nx-cloud).
