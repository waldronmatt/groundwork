# Repository Setup

## PNPM

Follow the directions [here](https://pnpm.io/installation) to install pnpm.

## Global Packages

Globally install the `rimraf` package via:

```bash
pnpm i -g rimraf
```

## NX

Create an `nx` account [here](https://cloud.nx.app/).

Create an `NX_CLOUD_ACCESS_TOKEN` token [here](https://cloud.nx.app/) with `Read` permissions by going to your repo and then go to `Settings` -> `Manage Tokens`.

Create an `nx-cloud.env` file at the project root to enable cloud caching locally:

```bash
NX_CLOUD_ACCESS_TOKEN=your-token
```

Set up `NX_CLOUD_ACCESS_TOKEN` in GitHub via `Settings` -> `Secrets` -> `Actions` to enable cloud caching via GitHub Actions.

## Lerna

Follow the directions to set up a `GITHUB_TOKEN` [here](https://github.com/lerna-lite/lerna-lite/blob/main/packages/version/README.md#remote-client-auth-tokens) with permissions of `repo:public_repo` scope to allow Lerna to create GitHub tags and releases.

Next, set up `GITHUB_TOKEN` as an environment variable in your operating system so you can run Lerna commands via the terminal such as `lerna version --dry-run --yes`.

Create an `NPM_TOKEN` [here](https://www.npmjs.com) with permissions of type `Automation` via the `Access Tokens` section to allow Lerna to publish packages to NPM.

Set up your `NPM_TOKEN` in GitHub via `Settings` -> `Secrets` -> `Actions`.

## Github

Enable read and write workflow permissions in your repo via `Settings` -> `Actions` -> `General` -> `Workflow permissions` -> `read and write permissions`.

## Renovate

Follow the directions [here](https://github.com/renovatebot/tutorial) to set up Renovate.

Create an `automerge` PR label. Renovate will apply this label on PRs for Kodiak to merge automatically.

## Security Alerts

Follow the directions [here](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/configuring-dependabot-alerts#enabling-or-disabling-dependabot-alerts-for-new-repositories) to enable dependabot alerts.

Create a `security` PR label. Renovate will automatically create a PR and apply this label when Dependabot detects a security alert.

## Kodiak

Follow the directions [here](https://kodiakhq.com/docs/quickstart) to set up Kodiak.

Create a `wip` PR label. When you set the `wip` label on a PR, Kodiak will not merge it.

Create a `conflict` PR label. When you set the `conflict` label on a PR, Kodiak will update the PR when it is out-of-date with the main branch. Renovate will typically rebase a branch so this label isn't typically needed.

## Initial v1 Package Release

Lerna does not support automation of initial version 1 packages. Follow the directions below to set up a manual version/changelog and publish:

- Add a commit (type of `chore`) changing the version in `package.json` for your package from `0.x.x` to `1.0.0-1` as per this [comment](https://github.com/lerna/lerna/pull/2486#discussion_r389792137)
- Graduate them to a release with `lerna version --conventional-graduate my-package` (will create release notes etc on GitHub)
- Publish them to NPM with `lerna publish from-package`
- Repeat the process for your other packages

## Advanced NX

- Follow the directions [here](https://nx.dev/nx-cloud/recipes/set-up/monorepo-ci-github-actions#distributed-task-execution-with-nx-cloud) to set up NX Distributed Task Execution (DTE).

- Follow the directions [here](https://nx.dev/ci/recipes/source-control-integration/github) to set up NX Version Control Integration (VCS).

**Note**: This repo's CICD is not configured to support DTE and VCS.
