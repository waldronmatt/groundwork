# Additional Commands

## Making Commits

Commit changes using conventional changelog:

```bash
pnpm commit
```

## Cleanup

### Artifacts

Clean up bundle artifacts:

```bash
pnpm clean
```

### Dependencies

Delete workspace root `node_modules` and `pnpm-lock.yaml` files:

**Note**: Follow the directions [here](docs/repo/SETUP.md#global-packages) to install `rimraf` globally so errors aren't thrown.

```bash
pnpm delete
```

## Linting

Check for secrets, format files, lint dependency versions, validate published packages, and verify monorepo best practices:

```bash
pnpm lint:mr
```

## Listing

### List Packages

List local packages:

```bash
pnpm list:packages
```

### List Dependencies

List all dependencies required by your packages:

```bash
pnpm list:deps
```

### View Project Graph

Visualize the project structure/dependencies:

```bash
pnpm nx:graph
```

## Versioning and Publishing

### Preview Version

Preview the output result of the `version` command without actually executing it:

**Note**: Follow the directions [here](SETUP.md#lerna) to set up a `GITHUB_TOKEN` environment variable in your operating system.

```bash
pnpm preview:version
```

### Preview Publish

Preview the output result of the `publish` command without actually executing it:

```bash
pnpm preview:publish
```

### Version

Version packages via the cli:

**Note**: Follow the directions [here](SETUP.md#lerna) to set up a `GITHUB_TOKEN` environment variable in your operating system.

```bash
pnpm version
```

### Publish

Publish packages via the cli:

```bash
pnpm publish
```
