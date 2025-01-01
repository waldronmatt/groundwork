# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.5.3](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.5.2...@waldronmatt/lit-override@2.5.3) (2025-01-01)

**Note:** Version bump only for package @waldronmatt/lit-override

## [2.5.2](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.5.1...@waldronmatt/lit-override@2.5.2) (2025-01-01)

**Note:** Version bump only for package @waldronmatt/lit-override

## [2.5.1](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.5.0...@waldronmatt/lit-override@2.5.1) (2024-10-27)

### Bug Fixes

* **mixins:** onConnectedCallback runs only when called, add unit test, refactor event logic ([7d692f6](https://github.com/waldronmatt/groundwork/commit/7d692f61e7f188b34239ff25dd5123d06690b3de)) - by @waldronmatt

# [2.5.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.4.0...@waldronmatt/lit-override@2.5.0) (2024-10-25)

### Features

* **decorators:** add initializer to clear cache on DOM disconnection, add a class to manage cache ([9c31fb5](https://github.com/waldronmatt/groundwork/commit/9c31fb50378829118526fea0772eafe4b8603940)) - by @waldronmatt

# [2.4.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.3.2...@waldronmatt/lit-override@2.4.0) (2024-10-23)

### Bug Fixes

* **lit-override:** ues shoelace component name, refactoring ([6752afd](https://github.com/waldronmatt/groundwork/commit/6752afd3d867308f4ad0e4dc4b08a25a58080f7d)) - by @waldronmatt
* **query-template-by-id.ts:** add cache param, remove unnecessary requestUpdate ([27efc3b](https://github.com/waldronmatt/groundwork/commit/27efc3b78ab7b4e7400d6e42c7025776aff1993e)) - by @waldronmatt
* **utils:** prefer markup util to render a template function ([c10551c](https://github.com/waldronmatt/groundwork/commit/c10551c25187cbfe8a9a87ce28bd319ff55015c4)) - by @waldronmatt

### Features

* **context:** add a context provider and consumer ([6645e0d](https://github.com/waldronmatt/groundwork/commit/6645e0d7e0455ad736f782962f278a45f30a5d67)) - by @waldronmatt

## [2.3.2](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.3.1...@waldronmatt/lit-override@2.3.2) (2024-09-01)

### Bug Fixes

* **query-template-by-id.ts:** fix setter to uncache oldValue, enroll in requestUpdate, improve types ([c4e3974](https://github.com/waldronmatt/groundwork/commit/c4e39746651fbf796ee730c20d3e743080c8bb60)) - by @waldronmatt

## [2.3.1](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.3.0...@waldronmatt/lit-override@2.3.1) (2024-09-01)

### Bug Fixes

* **lit-override:** add decorator interface, naming cleanup, add const in markup example ([e7ec054](https://github.com/waldronmatt/groundwork/commit/e7ec054cfdaa93262fe35963072d8d0f3814668e)) - by @waldronmatt

# [2.3.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.2.3...@waldronmatt/lit-override@2.3.0) (2024-08-31)

### Features

* **lit-override:** add custom decorator to get template element by id ([6a07702](https://github.com/waldronmatt/groundwork/commit/6a07702b6fd5e2974c7c924286e1ec6c9663c362)) - by @waldronmatt

## [2.2.3](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.2.2...@waldronmatt/lit-override@2.2.3) (2024-07-01)

**Note:** Version bump only for package @waldronmatt/lit-override

## [2.2.2](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.2.1...@waldronmatt/lit-override@2.2.2) (2024-06-10)

### Bug Fixes

* **package.json:** use publishConfig for npm package module resolution ([6e866f3](https://github.com/waldronmatt/groundwork/commit/6e866f33c2906c65f085ff98f24e9cae21b0ded6)) - by @waldronmatt
* **packages:** add npm package type linting ([cf10b22](https://github.com/waldronmatt/groundwork/commit/cf10b228d90d1850726ad19013bfa4ced5aff018)) - by @waldronmatt

## [2.2.1](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.2.0...@waldronmatt/lit-override@2.2.1) (2024-05-13)

### Bug Fixes

* **readme.md:** add link to api docs ([2983e3d](https://github.com/waldronmatt/groundwork/commit/2983e3dfe8862bed1afc4ffffc9ff2445d29b560)) - by @waldronmatt

# [2.2.0](https://github.com/waldronmatt/groundwork/compare/@waldronmatt/lit-override@2.1.3...@waldronmatt/lit-override@2.2.0) (2024-05-13)

### Bug Fixes

* **lit-override:** export interfaces, update interface names ([9e0767e](https://github.com/waldronmatt/groundwork/commit/9e0767e3944886027d25649a54ce18bdf388a054)) - by @waldronmatt
* **lit-override:** install playwright as dev dep, fix unit test ([1fb1994](https://github.com/waldronmatt/groundwork/commit/1fb19945cc019e53d7b346bd0d368c21e54e611f)) - by @waldronmatt

### Features

* **emit-connected-callback.ts:** add connectedCallback callback function as alt to emitting event ([490d84c](https://github.com/waldronmatt/groundwork/commit/490d84c0d4e1191b23c7fb7adfb9926445392746)) - by @waldronmatt
* **eslint-config-custom:** add new eslint chai plugins and move to deps from devdeps ([fd48f8d](https://github.com/waldronmatt/groundwork/commit/fd48f8db669d59fcee7306ea9310ac0de78439be)) - by @waldronmatt
* **lit-override:** add manifest packages to generate schema metadata ([8972706](https://github.com/waldronmatt/groundwork/commit/897270638de0a3db44933fb613a95558bc72e348)) - by @waldronmatt

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
