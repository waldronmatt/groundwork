# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.3](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.1.2...@waldronmatt/lit-override@2.1.3) (2024-05-10)

### Bug Fixes

* **package.json:** add lit and lit-html as dev deps ([7430b2f](https://github.com/waldronmatt/groundwork/commit/7430b2f0127e280c74ca7766e01f3fa5494625e9)) - by @waldronmatt

## [2.1.2](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.1.1...@waldronmatt/lit-override@2.1.2) (2024-04-13)

### Bug Fixes

* **package.json:** add sinon types ([cee8c70](https://github.com/waldronmatt/groundwork/commit/cee8c70ea07644093a18f9748bf1edc2f1b07e12)) - by @waldronmatt
* **readme.md:** add missing import in example ([d342132](https://github.com/waldronmatt/groundwork/commit/d3421321152f78a0f23e97ca5ad720b74cc2ae23)) - by @waldronmatt
* **src:** more robust unit tests ([61af60e](https://github.com/waldronmatt/groundwork/commit/61af60e94b4f1e34da9e48030b0f3a2694c82595)) - by @waldronmatt

## [2.1.1](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.1.0...@waldronmatt/lit-override@2.1.1) (2024-04-09)

### Bug Fixes

* **lit-override:** set lit-html as peer dep for package, install lit-html for app ([2751fc3](https://github.com/waldronmatt/groundwork/commit/2751fc30a59edb94c442b1407fcf6c9991d8f299)) - by @waldronmatt

# [2.1.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.0.1...@waldronmatt/lit-override@2.1.0) (2024-04-09)

### Bug Fixes

* **adopted-stylesheets-converter.ts:** remove unnecessary template check for style tag removal ([44d146f](https://github.com/waldronmatt/groundwork/commit/44d146fb705ee2edaa52de90a23ec9235cc50c8d)) - by @waldronmatt

### Features

* **markup.ts:** use lit-html render for markup utility ([202bc27](https://github.com/waldronmatt/groundwork/commit/202bc27e786b80cbb7f03e46d211a3d1d5b88e0c)) - by @waldronmatt

## [2.0.1](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.0.0...@waldronmatt/lit-override@2.0.1) (2024-04-09)

### Bug Fixes

* **styles.ts:** remove old check and test suite for fallback support ([2da0c9a](https://github.com/waldronmatt/groundwork/commit/2da0c9aa5db8ab777417581a375a5456f297f242)) - by @waldronmatt

# [2.0.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.3.0...@waldronmatt/lit-override@2.0.0) (2024-04-08)

### Features

* **lit-override:** create new lit utilities for light dom, revamp exmaple demos ([ce44ad8](https://github.com/waldronmatt/groundwork/commit/ce44ad86c4399fa1fb6226171fd511a1b36ceeb0)) - by @waldronmatt

### BREAKING CHANGES

* **lit-override:** Pathnames are different

# [1.3.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.2.2...@waldronmatt/lit-override@1.3.0) (2024-04-05)

### Bug Fixes

* **index.ts:** expose utilites for direct use ([629345a](https://github.com/waldronmatt/groundwork/commit/629345a1654423fbd8477ba5e32ab0d14f07538f)) - by @waldronmatt
* **lit-override-component.ts:** use when directive as convenience wrapper for ternary ([f335167](https://github.com/waldronmatt/groundwork/commit/f3351679025cc7312905ada928e0569fe020cbd7)) - by @waldronmatt
* **markup.ts:** clean up leftover markup before applying markup overrides ([708a257](https://github.com/waldronmatt/groundwork/commit/708a2577b5b9dbf80c395da8990be2c82a4b6795)) - by @waldronmatt
* **markup.ts:** fix bug so styles aren't removed during dom cleanup ([5e78891](https://github.com/waldronmatt/groundwork/commit/5e78891ba7f88902e1823121760b5c155c0eb4df)) - by @waldronmatt
* **styles:** deprecate style tag injection fallback, adoptedStyleSheets has good browser support ([9c124a5](https://github.com/waldronmatt/groundwork/commit/9c124a5165f9b649c79686e3f0bb61d7daf20d5e)) - by @waldronmatt

### Features

* **style.ts:** add option to completely remove original styles ([a993d80](https://github.com/waldronmatt/groundwork/commit/a993d803ab7f3285684a2973a5f88e753f8a7798)) - by @waldronmatt

## [1.2.2](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.2.1...@waldronmatt/lit-override@1.2.2) (2024-04-01)

**Note:** Version bump only for package @waldronmatt/lit-override

## [1.2.1](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.2.0...@waldronmatt/lit-override@1.2.1) (2024-03-26)

### Bug Fixes

* **lit-override:** add prepare playwright script, add separate test watch scripts, fix readme link ([bb9055e](https://github.com/waldronmatt/groundwork/commit/bb9055e1909a0d06969462548a2a775d400f7acb)) - by @waldronmatt
* **package.json:** revert prepare script, opt for manuall install ([5bf95aa](https://github.com/waldronmatt/groundwork/commit/5bf95aa04ac48295a74cd433421bbe79edbbc674)) - by @waldronmatt

# [1.2.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.1.0...@waldronmatt/lit-override@1.2.0) (2024-03-26)

### Features

* **lit-override:** add lit-override component unit test and set up repo with playwright ([5feec87](https://github.com/waldronmatt/groundwork/commit/5feec87948a51fdafe2d94c4dd7b60d633d020c1)) - by @waldronmatt

# [1.1.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.0.5...@waldronmatt/lit-override@1.1.0) (2024-03-26)

### Bug Fixes

* **examples:** remove example files and update configs ([43f0984](https://github.com/waldronmatt/groundwork/commit/43f09843ea64a932fc6a283a4cc8eec9a6bdb3a5)) - by @

### Features

* **lit-override:** remove example files to dedicated app, remove dev server, config updates ([0d86002](https://github.com/waldronmatt/groundwork/commit/0d86002bff3f816f019a81b9ddc6f3c28a480cdc)) - by @

## [1.0.5](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.0.4...@waldronmatt/lit-override@1.0.5) (2024-03-01)

### Bug Fixes

* **deps:** update eslint ([#147](https://github.com/waldronmatt/groundwork/issues/147)) ([eee8c58](https://github.com/waldronmatt/groundwork/commit/eee8c58660c863f2588ed8a79ddd9259b1942aaf)) - by @renovate[bot]

## [1.0.4](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.0.3...@waldronmatt/lit-override@1.0.4) (2024-03-01)

**Note:** Version bump only for package @waldronmatt/lit-override

## [1.0.3](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.0.2...@waldronmatt/lit-override@1.0.3) (2024-02-27)

### Bug Fixes

* **global:** remove netlify ([c66a47a](https://github.com/waldronmatt/groundwork/commit/c66a47a020530a6c1f809e658c5d4f44ae98bf58)) - by @waldronmatt

## [1.0.2](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.0.1...@waldronmatt/lit-override@1.0.2) (2024-02-13)

### Bug Fixes

* **readme:** minor edits and naming changes ([742b713](https://github.com/waldronmatt/groundwork/commit/742b713484a539f00f4266fda96f6638c1f2d1f4)) - by @waldronmatt

## [1.0.1](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@1.0.0...@waldronmatt/lit-override@1.0.1) (2024-02-13)

**Note:** Version bump only for package @waldronmatt/lit-override

# 1.0.0 (2024-02-12)

**Note:** Version bump only for package @waldronmatt/lit-override
