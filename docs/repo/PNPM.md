# PNPM Workspace Commands

## Add Packages

Install an exact version of a dependency to the root of the workspace:

```bash
pnpm add -w -E prettier
```

Add an exact version of a package as a dependency for local package:

```bash
pnpm add -E react --filter vite-project
```

Add an exact version of a specified package version as a dependency for local package:

```bash
pnpm add -E storybook@7.6.8 --filter demo-ui
```

Add an exact version of a **local** package and another package as a development dependency for local package:

```bash
pnpm add -D -E eslint-config-custom --workspace eslint --filter vite-project
```

## Remove Packages

Remove a local package from another local package:

```bash
pnpm remove eslint-config-custom --filter vite-project
```
