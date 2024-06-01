# Architecture

## Introduction

The repository setup and folder structure is heavily inspired by the turborepo [kitchen sink starter monorepo templates](https://github.com/vercel/turbo/tree/main/examples/kitchen-sink) and the [design system monorepo template](https://github.com/vercel/turbo/tree/main/examples/design-system).

## Folder Structure

```bash
apps/
configs/
docs/
packages/
...
package.json
pnpm-workspace.yaml
```

**`apps`** - Contains standalone applications / SPAs that can consume modules in `packages`

**`configs`** - Contains linters / configurations such as `eslint` / `tsconfig` shared across the monorepo

**`docs`** - Contains documentation for ui components and workspace documentation

**`packages`** - Contains utilities and tools published to `npm` that are used across the monorepo

## Turborepo Differences

- Tooling and configurations such as `eslint` and `tsconfig` are included in their own `config` folder. This is a personal preference to separate from the `packages` folder where reusable packages and utilities shared across projects are stored.
- Configurations such as `eslint` and `tsconfig` in the `config` folder do not reference other shareable configurations, for example, my own personal `eslint` config I use across projects. This is a personal preference so that configuration complexity and inheritence is kept to a minimum. This keeps configuration code more readable and self contained to the monorepo.
- Package naming for public packages published to `npm` have the `@` alias scoping while private packages do not have an alias. This is a personal preference to maintain the distinction between published and non-published packages more easily.
- The `apps` and `docs` folders remain separate and both are top-level folders. This is a personal preference to make the distinction between SPA and UI component documentation code / other documentation. I opt for more top-level folders.

## Turborepo Similarities

- Under `docs` is where `storybook` component code is stored, however it is common to house this along with the UI component for simplicity. If kept together, you would need to update the project to ignore `storybook` files when building and publishing the UI components to `npm`.

## Staged Files

We are using `lint-staged` to run linting and tests on staged files. This is the ordering:

1. Check for secrets (`secretlint`) and fix file formatting (`prettier`) on all files
2. Lint `package.json` files for dependency and monorepo best practices (`syncpack` and `manypkg`)
3. Lint `package.json` inside the `/packages` folder for package publishing best practices (`publint`)
4. Lint and fix issues of affected `.ts` and related files (`eslint` and `nx`)
5. Run tests of affected `.ts` and related files (`jest`/`vitest` and `nx`)
6. Lint exports on all `.ts` and related files inside the `/packages` folder (`knip` and `nx`)

We auto format and apply linting fixes when possible. For everything else, we let the user to decide on actions to take if there are errors.

## Versioning

All packages including `peerDependencies` are configured to use exact versions of packages. I prefer to have exact package versions to simplify debugging and reduce the likelihood of compatibility issues. I use `renovate` to automatically handle version updates.

For versioning, we have `excludeDependents` set to `true` in our `lerna` config. This is to override lerna's default behavior for detecting changed packages that includes changes to transitive dependencies. This is to avoid extraneous package bumps when other workspace packages are updated. A common example is when an `eslint` dependency is upgraded by renovate. Since the `eslint-config-custom` package got bumped, so will all other packages in this monorepo that depend on it which can result in a lot of unncessary version bumps. Since all our workspace packages are installed using the `workspace:` protocol, the consuming host packages will always get the latest updates, making lerna's transitive dependency bump behavior completely unneeded.

## Package Testing

Internal packages used in other packages are imported by referencing the `lib` / `src` subpath export and installed via `pnpm`'s `workspace:` protocol. An example subpath export setup for a package in this repo will typically look like this:

`package.json`

```json
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./*": "./dist/*",
    "./lib/*": "./lib/*"
  },
```

For example, I have a react component library package that I reference in the storybook and vite-project apps. If I make updates to the react library, I want those changes to automatically refresh (hmr) in those apps. The `lib` / `src` subpath exports allow us to link to the source files so we can avoid rebuilding the component library to see changes.

**Example**:

```bash
pnpm add @waldronmatt/demo-ui --workspace --filter vite-project
```

`apps/vite-project/src/App.tsx`

```ts
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/index.js';
```

There are other ways to do this such as symlinking and/or stubbing via third-party packages, but I personally ran into issues using these other methods. Alternatively, some may choose to refernce them via a registry (`npm`) with specified versions so that changes do not break other apps in the monorepo. This may be preferred for larger teams and organizations.

## ESM and CJS File Naming Conventions

For the rare instances where I have both `esm` and `cjs` bundles, I set specific file extensions like `.cjs` for `cjs` and use the standard `.js` extension for `esm`. ESM is the module system industry standard and I would prefer to not label them specifically with a `.mjs` extension. Labelling `cjs` files differently helps to remind developers to upgrade in the future if both module systems must be supported.
