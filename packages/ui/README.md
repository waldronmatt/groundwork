# Demo-UI

A demo react component library. Heavily inspired by [this article](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma).

## Features

- Fully tree shakeable (`js` and `css`)
- Outputs both `esm` and `cjs` bundles
- Component library is written in TypeScript
- Compiled CSS modules (consuming app is not required to support css modules)
- Bundle auto generates declaration files (`.d.ts`), source maps for declaration files (`.d.ts.map`), and source maps for JavaScript files (`.js.map`)
- Subpath exports for explicit path referencing. Will automatically map to the right module system (`esm` and `cjs`)
- Component updates auto reflect (hmr) in monorepos when referenced via the `lib` subpath export and installed via the `workspace:` protocol
- Libraries are externalized for a lighter bundle size (`react`, `react/jsx-runtime`)

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/demo-ui react react-dom
```

Install type definitions:

```bash
pnpm add -D @types/react @types/react-dom
```

## Getting Started

`MyApp.tsx`

```tsx
import { Button } from '@waldronmatt/demo-ui';

function App() {
  return <Button>Hello World</Button>;
}

export default App;
```

## Explicit Paths

You can also declare the path explicitly. Because we are using `import`, the path below will auto map to the `esm` bundle of this library:

`MyApp.tsx`

```tsx
import { Button } from '@waldronmatt/demo-ui/components/Button/index.js';

function App() {
  return <Button>Hello</Button>;
}

export default App;
```

## Styles

This component library relies on a global css file via `styles/global.css` that provides token variables used by components.

This component library was tested using a custom css reset file via `styles/reset.css`.

To use, import into your app's entrypoint above the app and component imports:

`MyApp.tsx`

```tsx
// demo-ui css reset file
import '@waldronmatt/demo-ui/styles/reset.css';
// demo-ui global css variable tokens
import '@waldronmatt/demo-ui/styles/global.css';
// demo-ui Button component js and styles
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/components/Button/index.js';
// your app-specific styles, etc.
import './MyApp.css';
```

## Next.js

Configure your `next.config.js`:

**Note:** Even though Next.js supports importing global stylesheets anywhere as of version 13.4, you still need to tell Next.js to compile this library. Because this library contains css imports in the final bundle, when consumed by a Next.js host application, Next.js will not be able to process those css import statements from `node_modules` unless we tell it to through the `transpilePackages` property.

`next.config.js`

```js
const nextConfig = {
  transpilePackages: ['@waldronmatt/demo-ui'],
};

module.exports = nextConfig;
```

## Monorepo Use

For use inside this monorepo, we import by referencing the `lib` subpath export and install via the `workspace:` protocol.

The advantage is that we can enable auto refresh (hmr) whenever we make updates to the component library.

```bash
pnpm add @waldronmatt/demo-ui --workspace --filter myapp
```

`MyApp.tsx`

```ts
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/index.js';
```

Explict paths:

```ts
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/components/Button/index.js';
```

## License

MIT
