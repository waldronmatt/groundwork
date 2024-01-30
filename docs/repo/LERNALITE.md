# Lerna-Lite Commands

## List Packages

List local packages:

```bash
pnpm list:packages
```

List local packages that have changed:

```bash
pnpm list:changed
```

## Version and Publish From CLI

Version packages via the cli:

**Note**: Follow the directions [here](SETUP.md#lerna) to set up a `GITHUB_TOKEN` environment variable in your operating system.

```bash
npx lerna version
```

Publish packages via the cli:

```bash
npx lerna publish from-package
```

## Preview Versions and Publishes

Preview the output result of the `version` command without actually executing it:

**Note**: Follow the directions [here](SETUP.md#lerna) to set up a `GITHUB_TOKEN` environment variable in your operating system.

```bash
npx lerna version --dry-run
```

Preview the output result of the `publish` command without actually executing it:

```bash
npx lerna publish from-package --dry-run
```
