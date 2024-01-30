# Syncpack Commands

## List Dependencies

List all dependencies required by your packages:

```bash
pnpm list:deps
```

## Update Dependencies

Update dependencies for all packages:

```bash
pnpm update:deps
```

## Update by Source

Update only the root `package.json`:

```bash
npx syncpack update --source 'package.json'
```

Update only packages matching a glob:

```bash
npx syncpack update --source 'packages/*'
```

Update both the root `package.json` file and only packages matching a glob:

```bash
npx syncpack update --source 'package.json' --source 'packages/*'
```

## Update by Dependency

Only update react, react-dom etc:

```bash
npx syncpack update --filter 'react'
```
