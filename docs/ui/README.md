# Demo UI Storybook

[![Netlify Status](https://api.netlify.com/api/v1/badges/33565ac2-d430-4fc1-b50e-8da1c2d6b393/deploy-status)](https://app.netlify.com/sites/groundwork-storybook/deploys)

Demo UI Storybook repo. Design token documentation inspired and tokens lifted from the [Shoelace library](https://shoelace.style/tokens/typography). See it in action [here](https://groundwork-storybook.netlify.app/).

## Installation

Install dependencies:

```bash
pnpm i
```

Install hooks:

```bash
pnpm prepare
```

## Getting Started

Commit changes using conventional changelog:

```bash
pnpm commit
```

Run local development server:

```bash
pnpm dev
```

Lint files:

```bash
pnpm lint
```

Compile files and build bundle:

```bash
pnpm build
```

Clean up bundle artifacts:

```bash
pnpm clean
```

Starts the [local server](http://localhost:3000/) that serves the `build` output from `dist/` folder:

**Note**: Run `pnpm build` first

```bash
pnpm preview
```

## License

MIT
