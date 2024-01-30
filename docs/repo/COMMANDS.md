# Additional Commands

Commit changes using conventional changelog:

```bash
pnpm commit
```

Check for secrets, check files for formatting issues, lint dependency versions, validate published packages, verify monorepo best practice, and find unused exports:

```bash
pnpm lint:mr
```

Clean up bundle artifacts:

```bash
pnpm clean
```

Delete workspace root `node_modules` and `pnpm-lock.yaml` files:

**Note**: Follow the directions [here](docs/repo/SETUP.md#global-packages) to install `rimraf` globally so errors aren't thrown.

```bash
pnpm delete
```

Visualize the project structure/dependencies:

```bash
pnpm nx:graph
```
