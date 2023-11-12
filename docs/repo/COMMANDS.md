# Additional Commands

Delete workspace root `node_modules` and `pnpm-lock.yaml` files:

**Note**: Install `rimraf` globally and make sure it is not installed in the workspace root so errors aren't thrown.

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

List local packages that have changed since the last tagged release:

```bash
pnpm preview:changed
```

Diff all packages or a single package since the last release:

```bash
pnpm preview:diff
```

Preview the output result of the `version` command without actually executing it:

**Note**: Set your GitHub access token as a system/os-level environment variable in your operating system as `GH_TOKEN` with the token unique identifier as the value.

```bash
pnpm preview:version
```

Preview the output result of the `publish` command without actually executing it:

```bash
pnpm preview:publish
```
