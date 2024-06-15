# Architecture

## Introduction

The repository setup and folder structure is heavily inspired by the turborepo [kitchen sink starter monorepo templates](https://github.com/vercel/turbo/tree/main/examples/kitchen-sink) and the [design system monorepo template](https://github.com/vercel/turbo/tree/main/examples/design-system).

## Folder Structure

```plaintext
├── apps
│   └── (Contains standalone applications / SPAs used to demo code in `packages`)
│
├── configs
│   └── (Contains linters / configurations such as `eslint` / `tsconfig`)
│
├── docs
│   └── (Contains documentation for this repo and various programming topics)
│
├── examples
│   └── (Similar to `apps`; contains applications used to demo code in `templates`)
│
├── packages
│   └── (Contains my personal utilities and tools published to `npm`)
│
└── templates
    └── (Similar to `packages`; contains reusable setups published to `npm`)
```

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
3. Lint `package.json` inside the `/packages` folder for package publishing and types best practices (`publint` and `arethetypeswrong`)
4. Lint and fix issues of affected `.ts` and related files (`eslint` and `nx`)
5. Run tests of affected `.ts` and related files (`jest`/`vitest` and `nx`)
6. Lint exports on all `.ts` and related files inside the `/packages` folder (`knip` and `nx`)

We auto format and apply linting fixes when possible. For everything else, we let the user to decide on actions to take if there are errors.

## Versioning

All packages including `peerDependencies` are configured to use exact versions of packages. I prefer to have exact package versions to simplify debugging and reduce the likelihood of compatibility issues. I use `renovate` to automatically handle version updates.

For versioning, we have `excludeDependents` set to `true` in our `lerna` config. This is to override lerna's default behavior for detecting changed packages that includes changes to transitive dependencies. This is to avoid extraneous package bumps when other workspace packages are updated. A common example is when an `eslint` dependency is upgraded by renovate. Since the `eslint-config-custom` package got bumped, so will all other packages in this monorepo that depend on it which can result in a lot of unncessary version bumps. Since all our workspace packages are installed using the `workspace:` protocol, the consuming host packages will always get the latest updates, making lerna's transitive dependency bump behavior completely unneeded.

## Package Usage

Internal packages used in other packages are imported by referencing the `lib` / `src` subpath `export` and installed via `pnpm`'s `workspace:` protocol.

This has the added benefit of [reflecting "live" types across package boundaries](https://colinhacks.com/essays/live-types-typescript-monorepo). For example, when code and types are updated, the effects of that change propagate to all files that import it instantaneously, with no build step. This is easier to set up and requires less overhead than `custom-condition` and `tsconfig-paths`.

An example subpath export setup for a package in this repo will typically look like this:

`package.json`

```json
  "exports": {
    "./lib/*": "./lib/*"
  },
```

For example, I have a react component library package that I reference in the storybook and vite-project apps. If I make updates to the react library, I want those changes and types to automatically refresh in those apps. The `lib` / `src` subpath exports allow us to link to the source files so we can avoid rebuilding the component library to see changes.

**Example**:

```bash
pnpm add @waldronmatt/demo-ui --workspace --filter vite-project
```

`apps/vite-project/src/App.tsx`

```ts
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/index.js';
```

Alternatively, some may choose to refernce them via a registry (`npm`) with specified versions so that changes do not break other apps in the monorepo. This may be preferred for larger teams and organizations.

There are other ways to do this such as symlinking and/or stubbing via third-party packages, but I personally ran into issues using these other methods.

## Types

Published packages use `publishConfig` to define `exports`, `types`, `module`, and `main`. This allows us to use top level `exports` for source files to support "live typing" in the approach above. When a package is published to `npm`, `publishConfig` will overwrite top level `exports` for proper consumption in different module systems.

A single `.` defines the default entrypoint. In the example below we define separate entries for `esm` and `cjs` via `import` and `require`. We do this to support different type declaration files for different module systems. This is a new [TypeScript 5 recommendation](https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext). We can use the `./*` glob to define wildcard exports and map multiple files and directories to corresponding import paths automatically without needing to explicitly define them.

`package.json`

```json
  "publishConfig": {
    "access": "public",
    "types": "./dist/types/esm/index.d.ts",
    "module": "./dist/esm/index.js",
    "main": "./dist/cjs/index.cjs",
    "exports": {
      ".": {
        "import": {
          "types": "./dist/types/esm/index.d.ts",
          "default": "./dist/esm/index.js"
        },
        "require": {
          "types": "./dist/types/cjs/index.d.cts",
          "default": "./dist/cjs/index.cjs"
        }
      },
      "./*": {
        "import": {
          "types": "./dist/types/esm/*",
          "default": "./dist/esm/*"
        },
        "require": {
          "types": "./dist/types/cjs/*",
          "default": "./dist/cjs/*"
        }
      }
    }
  },
```

## ESM and CJS File Naming Conventions

For the rare instances where I have both `esm` and `cjs` bundles, I set specific file extensions like `.cjs` for `cjs` and use the standard `.js` extension for `esm`. ESM is the module system industry standard and I would prefer to not label them specifically with a `.mjs` extension. Labelling `cjs` files differently helps to remind developers to upgrade in the future if both module systems must be supported.
