# Repository Setup

## PNPM

Follow the directions [here](https://pnpm.io/installation) to install pnpm.

## NX

Create an `nx` account [here](https://cloud.nx.app/).

Create an `NX_CLOUD_ACCESS_TOKEN` token [here](https://cloud.nx.app/) via `Settings` -> `Manage Tokens`.

Create an `nx-cloud.env` file at the project root to enable cloud caching locally:

```bash
NX_CLOUD_ACCESS_TOKEN=your-token
```

Set up `NX_CLOUD_ACCESS_TOKEN` in GitHub via `Settings` -> `Secrets` -> `Actions` to enable cloud caching via GitHub Actions.

## Lerna

Create a `GH_TOKEN` with `read/write` access [here](https://github.com/settings/tokens) to allow Lerna to create GitHub tags and releases.

Create an `NPM_TOKEN` [here](https://www.npmjs.com/login) as type `Automation` via the `Access Tokens` section to allow Lerna to publish packages.

Set up your `NPM_TOKEN` in GitHub via `Settings` -> `Secrets` -> `Actions`.

## Github

Enable read and write workflow permissions in your repo via `Settings` -> `Actions` -> `General` -> `Workflow permissions` -> `read and write permissions`.

## Renovate

Follow the directions [here](https://github.com/renovatebot/tutorial) to set up Renovate.

## Kodiak

Follow the directions [here](https://kodiakhq.com/docs/quickstart) to set up Kodiak.

Additionally create `wip` and `conflict` labels.

## NX Distributed Task Execution

(Optional): Follow the directions [here](https://nx.dev/nx-cloud/recipes/set-up/monorepo-ci-github-actions#distributed-task-execution-with-nx-cloud) to set up NX DTE.
