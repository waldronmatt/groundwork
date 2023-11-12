# Workspace Commands

## Add Packages

Install an exact version of a dependency to the root of the workspace:

```bash
pnpm add -w -E [package-name]
```

Add a package as a dependency for local package:

```bash
pnpm add react --filter vite-project
```

Add a **local** package and another package as a development dependency for local package:

```bash
pnpm add -D eslint-config-custom --workspace eslint --filter vite-project
```

## Remove Packages

Remove a local package from another local package:

```bash
pnpm remove eslint-config-custom --filter vite-project
```

## Run Commands

Install / run commands for a specific local package:

```bash
pnpm dev --filter vite-project
```
