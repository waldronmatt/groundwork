# Additional Commands

Delete workspace root `node_modules` and `pnpm-lock.yaml` files:

**Note**: Install `rimraf` globally and make sure it is not installed in the workspace root so errors aren't thrown.

```bash
pnpm delete
```

Format files, check for secrets, lint dependency versions, validate published packages, and verify monorepo best practices:

```bash
pnpm lint:mr
```

Visualize the project structure/dependencies:

```bash
pnpm nx:graph
```

Preview the output result of the `version` command without actually executing it:

**Note**: Set your personal access token as an environment variable in your operating system as `GH_TOKEN` with the token unique identifier as the value.

```bash
pnpm preview:version
```

Preview the output result of the `publish` command without actually executing it:

```bash
pnpm preview:publish
```
