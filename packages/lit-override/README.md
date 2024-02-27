# Lit Override

Utility functions for overriding styles and template markup in your Lit components.

Run `pnpm dev` to see the demo locally.

## Features

- Easily override styles and markup
- Set overrides from a Lit component or from the Light DOM
- Apply overrides to child components reliably with no race conditions
- Apply overrides to dynamically loaded/lazy-loaded components

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/lit-override lit
```

## Getting Started

Use `injectStyles` and `injectTemplate` for styles and markup overriding.

This library includes a generic `lit-override` component which renders the custom template content.

**Note**: If you want to replace `<lit-override>` with your own component, you can copy the logic from there and integrate into your component.

```ts
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override';

render(): TemplateResult {
  return html`
    <lit-override
      emitConnectedCallback
      @connected-callback=${(event: { target: HTMLElement }) => {
        injectStyles([event.target], css`:host { border: 2px solid #000000; }`);
        injectTemplate([event.target], html`<slot name="heading"></slot>`);
      }}
    >
      <h3 slot="heading">This is a heading!</h3>
    </lit-override>
  `;
}
```

## Recipes

### Custom Styles and Markup Applied by Host App

`index.html`

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="./dist/index.ts" type="module"></script>
  </head>

  <body>
    <my-component></my-component>
  </body>
</html>
```

`app.ts`

```ts
import { html, css, TemplateResult, CSSResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override';

@customElement('my-component')
export class App extends LitElement {
  private applyStyleOverride: CSSResult = css`
    :host {
      display: block;
      border: 2px solid #000000;
      margin-top: 1rem;
    }

    ::slotted([slot='heading']) {
      color: #0000ff;
    }

    ::slotted([slot='content']) {
      color: #ff0000;
    }
  `;

  private renderMarkupOverride(): TemplateResult {
    return html`
      <slot name="heading"></slot>
      <slot name="content"></slot>
    `;
  }

  render(): TemplateResult {
    return html`
      <lit-override
        emitConnectedCallback
        @connected-callback=${(event: { target: HTMLElement }) => {
          injectStyles([event.target], this.applyStyleOverride);
          injectTemplate([event.target], this.renderMarkupOverride());
        }}
      >
        <h3 slot="heading">This is a heading!</h3>
        <p slot="content">Here is a paragraph below the heading.</p>
      </lit-override>
    `;
  }
}
```

### Custom Styles and Markup Slotted from Light DOM

`index.html`

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="./dist/index.ts" type="module"></script>
  </head>

  <body>
    <my-component>
      <lit-override>
        <h3 slot="heading">A heading from a template in the light dom</h3>
        <p slot="content">A paragraph from a template in the light dom.</p>
        <template>
          <slot name="heading"></slot>
          <slot name="content"></slot>
          <style>
            :host {
              display: block;
              background-color: #000000;
              margin-top: 1rem;
            }

            ::slotted([slot='heading']) {
              color: #ffffff;
            }

            ::slotted([slot='content']) {
              color: #ffd700;
            }
          </style>
        </template>
      </lit-override>
    </my-component>
  </body>
</html>
```

`app.ts`

```ts
import { html, TemplateResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@waldronmatt/lit-override';

@customElement('my-component')
export class App extends LitElement {
  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
```

### Hybrid Approach - Custom Markup Slotted from Light DOM and Styles Applied by Host App

`index.html`

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="./dist/index.ts" type="module"></script>
  </head>

  <body>
    <my-component>
      <lit-override>
        <h3 slot="heading">A heading from a template in the light dom</h3>
        <p slot="content">A paragraph from a template in the light dom.</p>
        <template>
          <slot name="heading"></slot>
          <slot name="content"></slot>
        </template>
      </lit-override>
    </my-component>
  </body>
</html>
```

`app.ts`

```ts
import { html, css, TemplateResult, CSSResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { injectStyles } from '@waldronmatt/lit-override';

@customElement('my-component')
export class App extends LitElement {
  private applyStyleOverride: CSSResult = css`
    :host {
      display: block;
      border: 2px solid #000000;
      margin-top: 1rem;
    }

    ::slotted([slot='heading']) {
      color: #0000ff;
    }

    ::slotted([slot='content']) {
      color: #ff0000;
    }
  `;

  render(): TemplateResult {
    return html`
      <slot
        @slotchange=${(event: { target: HTMLSlotElement }) => {
          injectStyles(event.target.assignedElements(), this.applyStyleOverride);
        }}
      >
      </slot>
    `;
  }
}
```

## Background

When building out a design library, I came across situations where I needed a parent component/app to override child component styles and markup. Use cases included rendering different combinations of `p` tags, `div` tags, images, and other basic elements. Implementing, however, wouldn't be easy for many reasons. Dealing with component `shadowroot`s makes overriding particularly difficult. There are also reliability issues with race conditions when applying overrides to childen components.

Ideally, a design system will atomize everything perfectly to create composable components, but oftentimes, requirements can deviate from an optimal solution. Updating existing components to support new variants would be preferred, but what if we have situations where component variants differ in styles and markup significantly across different component contexts?

One option would be to break this out into a separate component, but this can create unwieldy code if styles and markup differ across many components/apps. Creating new components grouped together with one centralized component/app per use-case creates additional overhead and boilerplate. Another option would be to use regular html and css, but I still wanted to leverage the encapsulation benefits of web components.

With these override utilities, we have a reliable way to define our override styles and markup at the host instead of increasing complexity on the child component(s).

## How it Works

### Lit Component and Utilities

The two utilities, `injectStyles` and `injectTemplate`, leverage Lit's internals to inject styles and markup.

The `injectStyles` utility will use the `adoptedStylesheets` API to append styles and fall back to appending a `<style>` tag injected with the styles to the element root if browsers do not support the API. This behavior matches the Lit library.

The `injectTemplate` utility will create and append a `<template>` tag injected with the markup to the element root. It is up to the component (`lit-override` or your own component) to support `template` detection and rendering it using Lit's `template` directive.

You may notice that we are reliant on Lit's API. This decision was made so that the developer ergonomics of applying styles and markup overrides would be consistent with Lit. You can see this when you pass in your styles and markup into the utility functions, as you will need to wrap overrides in `css` and `html` literal tags. This does have a drawback of making the utility functions tied to Lit's API.

The `lit-override` component will grab the `template` element if it exists; whether that is set in the light DOM by declaring the `<template></template>` element or programmatically via the `injectTemplate` utility.

### The whenDefined Promise and connectedCallback/slotchange Events

In order for overriding to work, the parent component needs a reliable way to know when `connectedCallback` has fired for child components. This has been a pressing topic in the web component community as seen in [this thread](https://github.com/WICG/webcomponents/issues/619). Luckily there is an easy workaround.

In the child component's `connectedCallback`, emit an event so the parent component can listen and act on it. This helps prevent race conditions where the parent's `connectedCallback` fires before children `connectedCallback`.

To avoid too much noise from `connectedCallback` events being emitted, this feature is disabled by default which can be useful in situations where you have default styling and don't intend to override. You must pass in `emitConnectedCallback` prop as `true` to enable overriding.

For situations where components are lazy-loaded, the solution above won't be enough. In `injectStyles` and `injectTemplate`, we use `whenDefined` to inject custom styles and markup only when elements become registered. This also helps with error handling.

In situations where we slot in a component with custom styles and markup from the light DOM using the `template` element, the native `slotchange` event will guarantee us access to the child component being slotted in. We can avoid race conditions and also do away with the `emitConnectedCallback` event in this situation.

## Limitations

- This project assumes you are overriding styles and markup on initial load via `connectedCallback`. Additional work would need to be done to support overriding if state changes (for example, if you decide to inject styles and markup at a later point in the component's/app's lifecycle or after an action).

- Another possible approach to this could be to leverage [Lit Context](https://lit.dev/docs/data/context/) to make available the point in which the component is ready to accept custom styles and markup.

- As described in more detail below, this project uses Lit for overriding. For a native web component implementation, check out [this article](https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/#aa-the-best-of-both-worlds) and associated [codepen](https://codepen.io/calebdwilliams/pen/rROadR).

`injectTemplate`

- Props fed into your custom markup will not work. Only static markdown is supported.
- This utility is fragile because it relies on Lit's internal `template` to set the markup overrides.
- Custom elements such as `lit-override` must be configured to detect template elements for this utility to work.

`injectStyles`

- `adoptedStylesheets` will append your custom styles after the component's default styling. This is a spec built into the API; see [this thread](https://github.com/WICG/construct-stylesheets/issues/45) for more info. In this repo, this isn't a problem because `lit-override` comes with no stylings by default. If you do include this functionality in a component with default styles, you may need to use `!important` to override which isn't ideal.

- This utility is fragile because the fallback behavior relies on Lit's internal `style` to set the style overrides.

## Caution

Before using these utilities for your own use, please note that they are experimental. For production sites, please use at your own risk.

Please also note that you should first try to align with teams on a design system that promotes component composability to avoid overriding in the first place.

## Future Work

I'm always open to new ideas and improvements. PRs welcome!
