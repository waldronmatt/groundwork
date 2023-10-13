# Workspace Commands

pnpm workspace commands

## Add Packages

Install dependecies to the root of the workspace:

```bash
pnpm add -w [package-name]
```

Add a package as a dependency for another local package:

```bash
pnpm add react --filter vite-project --workspace
```

Add a **local** package as a development dependency for another local package:

```bash
pnpm add -D eslint-config-custom --filter vite-project --workspace
```

## Remove Packages

Remove a local package from another local package:

```bash
pnpm remove eslint-config-custom --filter vite-project
```

## Run Commands

Install / run commands for a specific sub-package:

```bash
pnpm dev --filter vite-project
```
