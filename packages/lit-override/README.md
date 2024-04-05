# Lit Override

Utility functions for overriding styles and markup in your Lit components.

Go to the `lit-override` project via [`apps/lit-override`](../../apps/lit-override) to see examples.

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

Before using the utilities, create a prop called `emitConnectedCallback` and copy the `connectedCallback` logic below in your child component:

`my-component.ts`

```ts
import { emit } from '@waldronmatt/lit-override';

...

@property({ reflect: true, type: Boolean })
emitConnectedCallback = false;

connectedCallback() {
  super.connectedCallback();

  if (this.emitConnectedCallback) {
    emit(this, 'connected-callback');
  }
}

...

```

In your lit app, set `emitConnectedCallback` on `my-component` and call the override utility functions inside `@connected-callback`:

`my-app.ts`

```ts
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override';

render(): TemplateResult {
  return html`
    <my-component
      emitConnectedCallback
      @connected-callback=${(event: { target: HTMLElement }) => {
        injectStyles([event.target], css`:host { border: 2px solid #000000; }`);
        injectTemplate([event.target], html`<slot name="heading"></slot>`);
      }}
    >
      <h3 slot="heading">This is a heading!</h3>
    </my-component>
  `;
}
```

**Note**: This library includes an optional shell `lit-override` component which renders a custom template if found. You can use this in place of `my-component` if you want a generic lit component to do overriding on.

## Background

When building out a design library, I came across situations where I needed a parent component/app to override child component styles and markup. Use cases included rendering different combinations of `p` tags, `div` tags, images, and other basic elements. Implementing, however, wouldn't be easy for many reasons. Dealing with component `shadowroot`s makes overriding particularly difficult. There are also reliability issues with race conditions when applying overrides to childen components.

Ideally, a design system will atomize everything perfectly to create composable components, but oftentimes, requirements can deviate from an optimal solution. Updating existing components to support new variants would be preferred, but what if we have situations where component variants differ in styles and markup significantly across different component contexts?

One option would be to break this out into a separate component, but this can create unwieldy code if styles and markup differ across many components/apps. Creating new components grouped together with one centralized component/app per use-case creates additional overhead and boilerplate. Another option would be to use regular html and css, but I still wanted to leverage the encapsulation benefits of web components.

With these override utilities, we have a reliable way to define our override styles and markup at the host instead of increasing complexity on the child component(s).

## How it Works

### Lit Component and Utilities

The two utilities, `injectStyles` and `injectTemplate`, leverage Lit's internals to inject styles and markup.

The `injectStyles` utility will use the `adoptedStylesheets` API to append styles.

The `injectTemplate` utility will create and append a `<template>` tag injected with the markup to the element root.

If you are using templates to inject custom markup and styles in the light dom, it is up to the component (`lit-override` or your own component) to support `template` detection and rendering it using Lit's `template` directive.

You may notice that we are reliant on Lit's API. This decision was made so that the developer ergonomics of applying styles and markup overrides would be consistent with Lit. You can see this when you pass in your styles and markup into the utility functions, as you will need to wrap overrides in `css` and `html` literal tags. This does have a drawback of making the utility functions tied to Lit's API.

### Styling Difficulties

Originally I planned on using the `::part` css pseudo-element and exposing an api for consumers to customize, but this quickly grew out of hand due to the sheer volume of different requests to customize nearly every aspect of a component. Additionally `::part` has limitations with not being able to style inner elements, no support for pseuod-class combinations like `:hover`, and also doesn't support parent/sibling selectors.

CSS variables work well and they can pierce the shadow dom. The downsides involve needing to carefully plan out every css property and migrate all of them to use variables, but this seemed unsustainable. Additionally, css variables are best suited for propagating design decisions down from a global root rather than encoding them as overrides.

Then I discovered `adoptedStyleSheets` which allows for applying stylesheets to the shadow DOM. This was the solution I was looking for. I could override styles without any of the disadvantages of `::part`. Browsers optimze this by parsing the stylesheet once and store as a single instance that can be used across multiple elements. This is significantly more performant than injecting style tags.

While significantly better than other options, `adoptedStyleSheets` came with a few minor disadvantages. First, not all browsers supported it, so polyfilling it required a less-performant style tag injection method. In recent years, this is less of an issue now that all major browsers support it. This utility no longer supports polyfilling this behavior for older browsers.

Secondly, if you want to preserve the original styles, you might need to use `!important` to override css properties shared between the two stylesheets. This can be mitigated if you remove the original stylesheet entirely.

### The whenDefined Promise and connectedCallback/slotchange Events

In order for overriding to work, the parent component needs a reliable way to know when `connectedCallback` has fired for child components. This has been a pressing topic in the web component community as seen in [this thread](https://github.com/WICG/webcomponents/issues/619). Luckily there is an easy workaround.

In the child component's `connectedCallback`, emit an event so the parent component can listen and act on it. This helps prevent race conditions where the parent's `connectedCallback` fires before children `connectedCallback`.

This beahvior follows Lit's recommendations to pass information up the tree to the parent component. Instead of passing information in response to user interaction, this would be when a child component's `connectedCallback` fires.

To avoid too much noise from `connectedCallback` events being emitted, this feature is disabled by default which can be useful in situations where you have default styling and don't intend to override. You must pass in `emitConnectedCallback` prop as `true` to enable overriding.

For situations where components are lazy-loaded, the solution above won't be enough. In `injectStyles` and `injectTemplate`, we use `whenDefined` to inject custom styles and markup only when elements become registered. This also helps with error handling.

In situations where we slot in a component with custom styles and markup from the light DOM using the `template` element, the native `slotchange` event will guarantee us access to the child component being slotted in. We can avoid race conditions and also do away with the `emitConnectedCallback` event in this situation.

## Limitations

- This project assumes you are overriding styles and markup on initial load via `connectedCallback`. Additional work would need to be done to support overriding if state changes (for example, if you decide to inject styles and markup at a later point in the component's/app's lifecycle or after an action).

- Emitting `connectedCallback` might be considered an anti-pattern, especially when abused. Performance can become an issue when attempting to override an excessive amount of components' styles and markup.

`injectTemplate`

- Props fed into your custom markup will not work. Only static markdown is supported.
- DOM cleanup might become expensive when there are an excessive amount of elements to remove.
- This utility is fragile because it relies on Lit's internal `template` to set the markup overrides.

`injectStyles`

- You may need to use `!important` on your custom css to override styles if you leave `replace` set to the default value of `false`.
- This utility is fragile because the fallback behavior relies on Lit's internal `style` to set the style overrides.

## Native Web Components

For a similar native web component implementation, check out [this article](https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/#aa-the-best-of-both-worlds) and associated [codepen](https://codepen.io/calebdwilliams/pen/rROadR).

## Caution

Before using these utilities for your own use, please note that they are experimental. For production sites, please use at your own risk.

Please also note that you should first try to align with teams on a design system that promotes component composability to avoid overriding in the first place.

## Future Work

I'm always open to new ideas and improvements. PRs welcome!

## Web Component Limitations

I've had the privilege developing a large web component library viewed by millions of people every month. The journey to make a web component library that is design and markup flexible, accessible, i18n enabled, and compatible across all major browsers was a difficult.

In my persuit to make web components work, below are the issues/proposals/utility work-arounds that I personally find important for the web component community to help solve that will facilitate greater adoption:

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
