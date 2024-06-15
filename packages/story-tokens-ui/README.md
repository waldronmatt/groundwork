# Story-Tokens-UI

A react component library built to work with Storybook to render design tokens in `mdx` docs. Documentation look-and-feel inspired by the [Shoelace library](https://shoelace.style/tokens/typography).

See a live demo [here](https://groundwork-storybook.netlify.app/).

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/story-tokens-ui react react-dom
```

Install type definitions:

```bash
pnpm add -D @types/react @types/react-dom
```

## Getting Started

Define your css tokens under `:root` and import into Storybook:

`tokens.css`

```css
:root {
  --sl-color-red-50: #ffccd9;
  --sl-color-red-100: #ffb3c1;
  --sl-color-red-200: #ff99a4;
  --sl-color-red-300: #ff7a8f;
  --sl-color-red-400: #ff5c75;
  --sl-color-red-500: #ff3957;
  --sl-color-red-600: #f92640;
  --sl-color-red-700: #eb1f3a;
  --sl-color-red-800: #b9002e;
  --sl-color-red-900: #9a0025;
  --sl-color-red-950: #4c0014;
}
```

In your `.mdx` files, import the component and use:

`colors.mdx`

```mdx
import { Meta } from '@storybook/blocks';
import { Colors } from '@waldronmatt/story-tokens-ui/lib/index';

<Meta title="Design Tokens/Colors" />

<Colors token={{ prefix: 'sl', category: 'color' }} />
```

See [these storybook doc pages](https://github.com/waldronmatt/groundwork/tree/main/docs/ui/src/docs) for examples on how to use each component.

## License

MIT
