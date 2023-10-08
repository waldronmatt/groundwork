# Demo-UI

A demo react component library.

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/demo-ui
```

## Getting Started

Used named imports to enable `js` and `css` treeshaking:

```tsx
import '@waldronmatt/demo-ui/styles/global.css'; // add global tokens
import { Button } from '@waldronmatt/demo-ui';
// or import the component directly
// import { Button } from '@waldronmatt/demo-ui/components/Button/index.js';

function App() {
  return (
    <>
      <Button>Hello</Button>
    </>
  );
}

export default App;
```

## Styles

This component library was tested and built using [the-new-css-reset/css/reset.css](https://github.com/elad2412/the-new-css-reset) reset library and the [sanitize.css](https://github.com/csstools/sanitize.css/). However, this library **does not** come with these libraries included. To use, import into your app's entrypoint above the app and component imports:

```bash
pnpm add the-new-css-reset sanitize.css
```

```tsx
// reset/normalize styles
import 'the-new-css-reset/css/reset.css';
import 'sanitize.css';
// app styles
import './index.css';
// component styles
import '@waldronmatt/demo-ui/styles/global.css';
import { Button } from '@waldronmatt/demo-ui';
```

Alternatively, you can use your own css reset/normalize libraries.

## License

MIT
