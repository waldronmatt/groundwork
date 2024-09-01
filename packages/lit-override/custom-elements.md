## `src/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package                |
| ---- | ---- | ----------- | ------ | ---------------------- |
| `js` | `*`  | \*          |        | ./components/index.js  |
| `js` | `*`  | \*          |        | ./controllers/index.js |
| `js` | `*`  | \*          |        | ./decorators/index.js  |
| `js` | `*`  | \*          |        | ./directives/index.js  |
| `js` | `*`  | \*          |        | ./mixins/index.js      |
| `js` | `*`  | \*          |        | ./utils/index.js       |

## `src/components/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package           |
| ---- | ---- | ----------- | ------ | ----------------- |
| `js` | `*`  | \*          |        | ./lit-override.js |

## `src/components/lit-override-component.ts`:

### class: `LitOverride`, `lit-override`

#### Mixins

| Name                    | Module                                 | Package |
| ----------------------- | -------------------------------------- | ------- |
| `EmitConnectedCallback` | /src/mixins/emit-connected-callback.js |         |

#### Fields

| Name                    | Privacy | Type       | Default | Description                                                                               | Inherited From        |
| ----------------------- | ------- | ---------- | ------- | ----------------------------------------------------------------------------------------- | --------------------- |
| `templateId`            |         | `string`   |         | Set an id referencing a \`template\` element. Defaults to a generic \`template\` element. |                       |
| `emitConnectedCallback` |         | `boolean`  | `false` | Set prop to use \`connected-callback\` event. Defaults to \`false\`.                      | EmitConnectedCallback |
| `onConnectedCallback`   |         | `function` |         | A callback function called when connected to the DOM.                                     | EmitConnectedCallback |

#### Events

| Name                 | Type | Description                                 | Inherited From |
| -------------------- | ---- | ------------------------------------------- | -------------- |
| `connected-callback` |      | when \`emitConnectedCallback\` is \`true\`. |                |

#### Attributes

| Name                    | Field                 | Inherited From        |
| ----------------------- | --------------------- | --------------------- |
| `emitConnectedCallback` | emitConnectedCallback | EmitConnectedCallback |
| `onConnectedCallback`   | onConnectedCallback   | EmitConnectedCallback |

#### Slots

| Name                  | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `` `<slot></slot>` `` | is rendered as fallback if \`\<template>\` element is not found. |

<hr/>

### Exports

| Kind | Name          | Declaration | Module                                   | Package |
| ---- | ------------- | ----------- | ---------------------------------------- | ------- |
| `js` | `LitOverride` | LitOverride | src/components/lit-override-component.ts |         |

## `src/components/lit-override.ts`:

### Exports

| Kind                        | Name           | Declaration | Module                                    | Package                     |
| --------------------------- | -------------- | ----------- | ----------------------------------------- | --------------------------- |
| `js`                        | `*`            | \*          |                                           | ./lit-override-component.js |
| `js`                        | `default`      | LitOverride | src/components/lit-override.ts            |                             |
| `custom-element-definition` | `lit-override` | LitOverride | /src/components/lit-override-component.js |                             |

## `src/controllers/adopted-stylesheets-converter.ts`:

### class: `AdoptedStyleSheetsConverter`

#### Fields

| Name          | Privacy | Type                                               | Default                                | Description | Inherited From |
| ------------- | ------- | -------------------------------------------------- | -------------------------------------- | ----------- | -------------- |
| `host`        |         | `ReactiveControllerHost`                           | `host`                                 |             |                |
| `clearStyles` |         | `AdoptedStyleSheetsConverterParams['clearStyles']` | `clearStyles`                          |             |                |
| `templateEl`  |         | `AdoptedStyleSheetsConverterParams['templateEl']`  | `templateEl`                           |             |                |
| `_shadowRoot` |         | `ShadowRoot`                                       | `(this.host as LitElement).renderRoot` |             |                |

#### Methods

| Name                      | Privacy | Description | Parameters                       | Return | Inherited From |
| ------------------------- | ------- | ----------- | -------------------------------- | ------ | -------------- |
| `hostConnected`           |         |             |                                  |        |                |
| `hostUpdated`             |         |             |                                  |        |                |
| `updateStylesheet`        | private |             |                                  |        |                |
| `setAdoptedStyleSheets`   | private |             | `styleElement: HTMLStyleElement` |        |                |
| `removeComponentStyleTag` | private |             |                                  |        |                |

<hr/>

### Exports

| Kind | Name                          | Declaration                 | Module                                           | Package |
| ---- | ----------------------------- | --------------------------- | ------------------------------------------------ | ------- |
| `js` | `AdoptedStyleSheetsConverter` | AdoptedStyleSheetsConverter | src/controllers/adopted-stylesheets-converter.ts |         |

## `src/controllers/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package                            |
| ---- | ---- | ----------- | ------ | ---------------------------------- |
| `js` | `*`  | \*          |        | ./adopted-stylesheets-converter.js |

## `src/directives/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package                             |
| ---- | ---- | ----------- | ------ | ----------------------------------- |
| `js` | `*`  | \*          |        | ./template-content-with-fallback.js |

## `src/directives/template-content-with-fallback.ts`:

### class: `TemplateContentWithFallbackDirective`

<hr/>

### Exports

| Kind | Name                                   | Declaration                          | Module                                           | Package |
| ---- | -------------------------------------- | ------------------------------------ | ------------------------------------------------ | ------- |
| `js` | `templateContentWithFallback`          | templateContentWithFallback          | src/directives/template-content-with-fallback.ts |         |
| `js` | `TemplateContentWithFallbackDirective` | TemplateContentWithFallbackDirective | src/directives/template-content-with-fallback.ts |         |

## `src/decorators/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package                   |
| ---- | ---- | ----------- | ------ | ------------------------- |
| `js` | `*`  | \*          |        | ./query-template-by-id.js |

## `src/decorators/query-template-by-id.ts`:

### Functions

| Name                | Description                                                                                                                                                        | Parameters                                                | Return |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | ------ |
| `queryTemplateById` | queryTemplateById&#xA;&#xA;Gets a template element by id that is provided to the \`templateId\` property.&#xA;Will cache the template element on successful query. | `{ fallback = false }: QueryTemplateByIdParams, fallback` |        |

<hr/>

### Exports

| Kind | Name                | Declaration       | Module                                 | Package |
| ---- | ------------------- | ----------------- | -------------------------------------- | ------- |
| `js` | `queryTemplateById` | queryTemplateById | src/decorators/query-template-by-id.ts |         |

## `src/mixins/emit-connected-callback.ts`:

### class: `EmitConnectedCallbackProps`

#### Fields

| Name                    | Privacy | Type      | Default | Description | Inherited From |
| ----------------------- | ------- | --------- | ------- | ----------- | -------------- |
| `emitConnectedCallback` |         | `boolean` |         |             |                |

<hr/>

### Exports

| Kind | Name                         | Declaration                | Module                                | Package |
| ---- | ---------------------------- | -------------------------- | ------------------------------------- | ------- |
| `js` | `EmitConnectedCallbackProps` | EmitConnectedCallbackProps | src/mixins/emit-connected-callback.ts |         |
| `js` | `EmitConnectedCallback`      | EmitConnectedCallback      | src/mixins/emit-connected-callback.ts |         |

## `src/mixins/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package                      |
| ---- | ---- | ----------- | ------ | ---------------------------- |
| `js` | `*`  | \*          |        | ./emit-connected-callback.js |

## `src/utils/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package     |
| ---- | ---- | ----------- | ------ | ----------- |
| `js` | `*`  | \*          |        | ./styles.js |
| `js` | `*`  | \*          |        | ./markup.js |

## `src/utils/markup.ts`:

### Functions

| Name             | Description                                                   | Parameters                                                                  | Return |
| ---------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- | ------ |
| `injectTemplate` | Applies the given template to the \`shadowRoot\` of elements. | `elements: NodeListOf<Element> \| Array<Element>, template: TemplateResult` | `void` |

<hr/>

### Exports

| Kind | Name             | Declaration    | Module              | Package |
| ---- | ---------------- | -------------- | ------------------- | ------- |
| `js` | `injectTemplate` | injectTemplate | src/utils/markup.ts |         |

## `src/utils/styles.ts`:

### Functions

| Name           | Description                                           | Parameters                                                                                | Return |
| -------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------ |
| `injectStyles` | Applies the given style using \`adoptedStyleSheets\`. | `elements: NodeListOf<Element> \| Array<Element>, style: CSSResult, clearStyles: boolean` | `void` |

<hr/>

### Exports

| Kind | Name           | Declaration  | Module              | Package |
| ---- | -------------- | ------------ | ------------------- | ------- |
| `js` | `injectStyles` | injectStyles | src/utils/styles.ts |         |
