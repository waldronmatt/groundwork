# Lit Override

Utility functions for overriding styles and markup in your Lit components.

## Features

- Easily override styles and markup
- Set overrides from the light DOM and shadow DOM
- Apply overrides to child components reliably with no race conditions
- Apply overrides to dynamically loaded/lazy-loaded components

## Installation

Install dependencies:

```bash
pnpm add @waldronmatt/lit-override lit lit-html
```

## Shadow DOM

Add the following to the component you want to override styles and markup on:

`child-component.ts`

```ts
import { EmitConnectedCallback } from '@waldronmatt/lit-override/mixins/emit-connected-callback.js';

export class ChildComponent extends EmitConnectedCallback(LitElement) {}
```

In your lit app, set `emitConnectedCallback` on `child-component` and call the override utility functions inside `@connected-callback`:

`host-app.ts`

```ts
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override/utils/index.js';

render() {
  return html`
    <child-component
      emitConnectedCallback
      @connected-callback=${(event: { target: HTMLElement }) => {
        injectStyles([event.target], css`::slotted([slot='heading']) { color: #fff; }`);
        injectTemplate([event.target], html`<slot name="heading"></slot>`);
      }}
    >
      <h3 slot="heading">Custom markup from the shadow dom!</h3>
    </child-component>
  `;
}
```

Alternatively, you can use the `onConnectedCallback` callback function if performance is a concern with emitting an event on `connectedCallback`:

`host-app.ts`

```ts
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override/utils/index.js';

render() {
  return html`
    <child-component
      .onConnectedCallback=${(thisChild: LitElement) => {
        injectStyles([thisChild], css`::slotted([slot='heading']) { color: #fff; }`);
        injectTemplate([thisChild], html`<slot name="heading"></slot>`);
      }}
    >
      <h3 slot="heading">Custom markup from the shadow dom!</h3>
    </child-component>
  `;
}
```

## Light DOM

Add the following to the component you want to override styles and markup on:

`child-component.ts`

```ts
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { templateContentWithFallback } from '@waldronmatt/lit-override/directives/template-content-with-fallback.js';
import { AdoptedStyleSheetsConverter } from '@waldronmatt/lit-override/controllers/adopted-stylesheets-converter.js';

export class ChildComponent extends LitElement {
  @property({ reflect: true, type: String })
  templateId!: string;

  connectedCallback() {
    super.connectedCallback();
    new AdoptedStyleSheetsConverter(this, { id: this.templateId });
  }

  protected render() {
    return html`${templateContentWithFallback({ fallback: html`<p>Default markup</p>`, id: this.templateId })}`;
  }
}
```

Set `templateId` on `child-component` to point to the template from which to add styles and markup overrides from:

`index.html`

```html
<body>
  <template id="childTemplate">
    <slot name="heading"></slot>
    <style>
      ::slotted([slot='heading']) {
        color: #fff;
      }
    </style>
  </template>
  <host-app>
    <child-component templateId="childTemplate">
      <h3 slot="heading">Custom markup from the light dom!</h3>
    </child-component>
  </host-app>
</body>
```

### Lit Override Component

The `<lit-override>` component provides an all-in-one approach to override markup and styles in the light DOM and shadow DOM:

#### Shadow DOM

`host-app.ts`

```ts
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override/utils/index.js';
import '@waldronmatt/lit-override/components/lit-override.js';

render() {
  return html`
    <lit-override
      emitConnectedCallback
      @connected-callback=${(event: { target: HTMLElement }) => {
        injectStyles([event.target], css`::slotted([slot='heading']) { color: #fff; }`);
        injectTemplate([event.target], html`<slot name="heading"></slot>`);
      }}
    >
      <h3 slot="heading">Custom markup from the shadow dom!</h3>
    </lit-override>
  `;
}
```

#### Light DOM

`index.html`

```html
<body>
  <template id="childTemplate">
    <slot name="heading"></slot>
    <style>
      ::slotted([slot='heading']) {
        color: #fff;
      }
    </style>
  </template>
  <host-app>
    <lit-override templateId="childTemplate">
      <h3 slot="heading">Custom markup from the light dom!</h3>
    </lit-override>
  </host-app>
</body>
```

**Note**: Go to the `lit-override` project via [`apps/lit-override`](../../apps/lit-override) to see more examples.

## Background

When building out a design library, I came across situations where I needed a parent component/app to override child component styles and markup. Use cases included rendering different combinations of `p` tags, `div` tags, images, and other basic elements. Implementing, however, wouldn't be easy for many reasons. Dealing with component `shadowroot`s makes overriding particularly difficult. There are also reliability issues with race conditions when applying overrides to childen components.

Ideally, a design system will atomize everything perfectly to create composable components, but oftentimes, requirements can deviate from an optimal solution. Updating existing components to support new variants would be preferred, but what if we have situations where component variants differ in styles and markup significantly across different component contexts?

One option would be to break this out into a separate component, but this can create unwieldy code if styles and markup differ across many components/apps. Creating new components grouped together with one centralized component/app per use-case creates additional overhead and boilerplate. Another option would be to use regular html and css, but I still wanted to leverage the encapsulation benefits of web components.

With these override utilities, we have a reliable way to define our override styles and markup at the host instead of increasing complexity on the child component(s).

## Styling Difficulties

Originally I planned on using the `::part` css pseudo-element and exposing an api for consumers to customize, but this quickly grew out of hand due to the sheer volume of different requests to customize nearly every aspect of a component. Additionally `::part` has limitations with not being able to style inner elements, no support for pseuod-class combinations like `:hover`, and also doesn't support parent/sibling selectors.

CSS variables work well and they can pierce the shadow dom. The downsides involve needing to carefully plan out every css property and migrate all of them to use variables, but this seemed unsustainable. Additionally, css variables are best suited for propagating design decisions down from a global root rather than encoding them as overrides.

Then I discovered `adoptedStyleSheets` which allows for applying stylesheets to the shadow DOM. This was the solution I was looking for. I could override styles without any of the disadvantages of `::part`. Browsers optimze this by parsing the stylesheet once and store as a single instance that can be used across multiple elements. This is significantly more performant than injecting style tags.

While significantly better than other options, `adoptedStyleSheets` came with a few minor disadvantages. First, not all browsers supported it, so polyfilling it required a less-performant style tag injection method. In recent years, this is less of an issue now that all major browsers support it. This utility no longer supports polyfilling this behavior for older browsers.

Secondly, if you want to preserve the original styles, you might need to use `!important` to override css properties shared between the two stylesheets. This can be mitigated if you remove the original stylesheet entirely. The tools here are built with this option in mind.

## Race Conditions

In order for overriding to work, the parent component needs a reliable way to know when `connectedCallback` has fired for child components. This has been a pressing topic in the web component community as seen in [this thread](https://github.com/WICG/webcomponents/issues/619). Luckily there is an easy workaround.

In the child component's `connectedCallback`, emit an event so the parent component can listen and act on it. This helps prevent race conditions where the parent's `connectedCallback` fires before children `connectedCallback`.

This beahvior follows Lit's recommendations to pass information up the tree to the parent component. Instead of passing information in response to user interaction, this would be when a child component's `connectedCallback` fires.

To avoid too much noise from `connectedCallback` events being emitted, this feature is disabled by default which can be useful in situations where you have default styling and don't intend to override. You must pass in `emitConnectedCallback` prop as `true` to enable overriding. You can also use the `onConnectedCallback` callback function if performance is a concern with emitting an event on `connectedCallback`.

For situations where components are lazy-loaded, the solution above won't be enough. In `injectStyles` and `injectTemplate`, we use `whenDefined` to inject custom styles and markup only when elements become registered. This also helps with error handling.

In situations where we slot in a component with custom styles and markup from the light DOM using the `template` element, the native `slotchange` event will guarantee us access to the child component being slotted in. We can avoid race conditions and also do away with the `emitConnectedCallback` event in this situation.

## Limitations

This project assumes you are overriding styles and markup on initial load via `connectedCallback` and/or `slotchange`. Additional work would need to be done to support overriding if state changes (for example, if you decide to inject styles and markup at a later point in the component's/app's lifecycle or after an action).

## Caution

Before using these utilities for your own use, please note that they are experimental. For production sites, please use at your own risk.

Please also note that you should first try to align with teams on a design system that promotes component composability to avoid overriding in the first place.

## Future Work

I'm always open to new ideas and improvements. PRs welcome!

## Addendum

Below are the issues/proposals/utility work-arounds that I personally find important for the web component community to help solve that will facilitate greater adoption:

### Community Protocols

- [Repo](https://github.com/webcomponents-cg/community-protocols)

### Children Changed Callback Lifecycle

- [GitHub Issue](https://github.com/WICG/webcomponents/issues/809)
- [html-parsed-element](https://github.com/WebReflection/html-parsed-element)

### Web Component Registries and Cleanup

- [Github Issue](https://github.com/WICG/webcomponents/issues/754)
- [Scoped Custom Element Registries](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Scoped-Custom-Element-Registries.md)
- [redefine-custom-elements](https://github.com/caridy/redefine-custom-elements)

### Cross Root Aria Delegation

- [Proposal](https://github.com/leobalter/cross-root-aria-delegation)
- [Technical Spec Document](https://leobalter.github.io/cross-root-aria-delegation/)
