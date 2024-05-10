# Monorepo Commands

Lint the monorepo (executes all commands below):

```bash
pnpm lint:mr
```

Check for secrets:

```bash
pnpm lint:secrets
```

Check files for formatting issues:

```bash
pnpm lint:format
```

Validate package publishing best practices (applies to projects in `packages` folder):

```bash
pnpm lint:packages
```

Lint dependency versions:

```bash
pnpm lint:deps
```

Verify monorepo best practice:

```bash
pnpm lint:monorepo
```
