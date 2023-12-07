# Demo-UI

A demo react component library. Heavily inspired by [this article](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma)

## Features

- Fully tree shakeable (`js` and `css`)
- Compiled CSS modules (consuming app is not required to support css modules)
- Bundle auto generates declaration files (`.d.ts`), source maps for declaration files (`.d.ts.map`), and source maps for JavaScript files (`.js.map`)
- Submodules setup for explicit path referencing. Will automatically map to the right module system (`esm` and `cjs`)
- Libraries are externalized for a lighter bundle size (`react`, `react/jsx-runtime`)

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/demo-ui
```

## Getting Started

```tsx
import { Button } from '@waldronmatt/demo-ui';

function App() {
  return <Button>Hello World</Button>;
}

export default App;
```

## Explicit Paths

You can also declare the path explicitly. Because we are using `import`, the path below will auto map to the `esm` bundle of this library:

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

```tsx
// demo-ui css reset file
import '@waldronmatt/demo-ui/styles/reset.css';
// demo-ui global css variable tokens
import '@waldronmatt/demo-ui/styles/global.css';
// demo-ui Button component js and styles
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/components/Button/index.js';
// your app-specific styles, etc.
import './App.css';
```

## Monorepo Use

For use inside this monorepo, we import by referencing the `lib` folder so we can map directly from source files.

The advantage is that we can enable auto refresh (hmr) whenever we make updates to components.

```ts
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/index.js';
```

Explict paths:

```ts
import { Button, type ButtonProps } from '@waldronmatt/demo-ui/lib/components/Button/index.js';
```

## License

MIT
