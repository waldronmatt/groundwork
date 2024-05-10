# CICD Commands

Installer command to ensure that the exact versions of dependencies specified in the lock file are installed:

```bash
pnpm bootstrap:ci
```

Found in the workflow `.yml` cicd files, this command will run all three tasks in parallel for only affected files:

```bash
npx nx affected -t build,lint,test,lint:knip --parallel=4
```

Lint the monorepo:

```bash
pnpm lint:mr
```

Versioning command that will bypass prompts for avoiding manual intervention:

```bash
pnpm version:ci
```

Publishing command that will bypass prompts for avoiding manual intervention:

```bash
pnpm publish:ci
```
