## Additional Commands

Delete workspace root `node_modules` and `pnpm-lock.yaml` files:

**Note**: Follow the directions [here](docs/repo/SETUP.md#global-packages) to install `rimraf` globally so errors aren't thrown.

```bash
pnpm delete
```

Check for secrets, format files, lint dependency versions, validate published packages, and verify monorepo best practices:

```bash
pnpm lint:mr
```
