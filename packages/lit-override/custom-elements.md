## `src/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package                |
| ---- | ---- | ----------- | ------ | ---------------------- |
| `js` | `*`  | \*          |        | ./components/index.js  |
| `js` | `*`  | \*          |        | ./context/index.js     |
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

## `src/components/lit-override.component.ts`:

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

#### Methods

| Name                       | Privacy | Description | Parameters                             | Return | Inherited From        |
| -------------------------- | ------- | ----------- | -------------------------------------- | ------ | --------------------- |
| `setEmitConnectedCallback` | private |             | `childInfo: EmitConnectedCallbackInfo` |        | EmitConnectedCallback |

#### Events

| Name                 | Type | Description                                 | Inherited From |
| -------------------- | ---- | ------------------------------------------- | -------------- |
| `connected-callback` |      | when \`emitConnectedCallback\` is \`true\`. |                |

#### Attributes

| Name                    | Field                 | Inherited From        |
| ----------------------- | --------------------- | --------------------- |
| `emitConnectedCallback` | emitConnectedCallback | EmitConnectedCallback |

#### Slots

| Name                  | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `` `<slot></slot>` `` | is rendered as fallback if \`\<template>\` element is not found. |

<hr/>

### Exports

| Kind | Name          | Declaration | Module                                   | Package |
| ---- | ------------- | ----------- | ---------------------------------------- | ------- |
| `js` | `LitOverride` | LitOverride | src/components/lit-override.component.ts |         |

## `src/components/lit-override.ts`:

### Exports

| Kind                        | Name           | Declaration | Module                                    | Package                     |
| --------------------------- | -------------- | ----------- | ----------------------------------------- | --------------------------- |
| `js`                        | `*`            | \*          |                                           | ./lit-override.component.js |
| `js`                        | `default`      | LitOverride | src/components/lit-override.ts            |                             |
| `custom-element-definition` | `lit-override` | LitOverride | /src/components/lit-override.component.js |                             |

## `src/context/consumer.component.ts`:

### class: `LitOverrideConsumer`, `lit-override-consumer`

#### Fields

| Name       | Privacy | Type                                            | Default | Description | Inherited From |
| ---------- | ------- | ----------------------------------------------- | ------- | ----------- | -------------- |
| `override` |         | `Partial<LitOverrideContextProps> \| undefined` |         |             |                |

#### Methods

| Name                    | Privacy | Description | Parameters | Return | Inherited From |
| ----------------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `setAdoptedStyleSheets` | private |             |            |        |                |

<hr/>

### Exports

| Kind | Name                  | Declaration         | Module                            | Package |
| ---- | --------------------- | ------------------- | --------------------------------- | ------- |
| `js` | `LitOverrideConsumer` | LitOverrideConsumer | src/context/consumer.component.ts |         |

## `src/context/consumer.ts`:

### Exports

| Kind                        | Name                    | Declaration         | Module                             | Package                 |
| --------------------------- | ----------------------- | ------------------- | ---------------------------------- | ----------------------- |
| `js`                        | `*`                     | \*                  |                                    | ./consumer.component.js |
| `js`                        | `default`               | LitOverrideConsumer | src/context/consumer.ts            |                         |
| `custom-element-definition` | `lit-override-consumer` | LitOverrideConsumer | /src/context/consumer.component.js |                         |

## `src/context/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package       |
| ---- | ---- | ----------- | ------ | ------------- |
| `js` | `*`  | \*          |        | ./provider.js |
| `js` | `*`  | \*          |        | ./consumer.js |
| `js` | `*`  | \*          |        | ./key.js      |

## `src/context/key.ts`:

### Exports

| Kind | Name                 | Declaration        | Module             | Package |
| ---- | -------------------- | ------------------ | ------------------ | ------- |
| `js` | `litOverrideContext` | litOverrideContext | src/context/key.ts |         |

## `src/context/provider.component.ts`:

### class: `LitOverrideProvider`, `lit-override-provider`

#### Fields

| Name       | Privacy | Type                               | Default | Description | Inherited From |
| ---------- | ------- | ---------------------------------- | ------- | ----------- | -------------- |
| `override` |         | `Partial<LitOverrideContextProps>` | `{}`    |             |                |

<hr/>

### Exports

| Kind | Name                  | Declaration         | Module                            | Package |
| ---- | --------------------- | ------------------- | --------------------------------- | ------- |
| `js` | `LitOverrideProvider` | LitOverrideProvider | src/context/provider.component.ts |         |

## `src/context/provider.ts`:

### Exports

| Kind                        | Name                    | Declaration         | Module                             | Package                 |
| --------------------------- | ----------------------- | ------------------- | ---------------------------------- | ----------------------- |
| `js`                        | `*`                     | \*                  |                                    | ./provider.component.js |
| `js`                        | `default`               | LitOverrideProvider | src/context/provider.ts            |                         |
| `custom-element-definition` | `lit-override-provider` | LitOverrideProvider | /src/context/provider.component.js |                         |

## `src/decorators/cache.ts`:

### class: `TemplateCacheManager`

#### Fields

| Name    | Privacy | Type                                                     | Default | Description | Inherited From |
| ------- | ------- | -------------------------------------------------------- | ------- | ----------- | -------------- |
| `cache` | private | `Record<string, TemplateIdProperty['templateIdGetter']>` | `{}`    |             |                |

#### Methods

| Name                 | Privacy | Description | Parameters                                                                  | Return                                   | Inherited From |
| -------------------- | ------- | ----------- | --------------------------------------------------------------------------- | ---------------------------------------- | -------------- |
| `getTemplate`        |         |             | `id: string`                                                                | `TemplateIdProperty['templateIdGetter']` |                |
| `cacheTemplate`      |         |             | `id: TemplateIdProperty['templateIdSetter'], template: HTMLTemplateElement` |                                          |                |
| `removeTemplate`     |         |             | `id: string`                                                                |                                          |                |
| `clearTemplateCache` |         |             |                                                                             |                                          |                |

<hr/>

### Exports

| Kind | Name                   | Declaration          | Module                  | Package |
| ---- | ---------------------- | -------------------- | ----------------------- | ------- |
| `js` | `TemplateCacheManager` | TemplateCacheManager | src/decorators/cache.ts |         |

## `src/decorators/index.ts`:

### Exports

| Kind | Name | Declaration | Module | Package                   |
| ---- | ---- | ----------- | ------ | ------------------------- |
| `js` | `*`  | \*          |        | ./query-template-by-id.js |
| `js` | `*`  | \*          |        | ./cache.js                |
| `js` | `*`  | \*          |        | ./types.js                |

## `src/decorators/query-template-by-id.ts`:

### Functions

| Name                | Description                                                                                               | Parameters                                                                     | Return |
| ------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------ |
| `queryTemplateById` | queryTemplateById&#xA;&#xA;Gets a template element by id that is provided to the \`templateId\` property. | `{ cache = true, fallback = false }: QueryTemplateByIdParams, cache, fallback` |        |

<hr/>

### Exports

| Kind | Name                | Declaration       | Module                                 | Package |
| ---- | ------------------- | ----------------- | -------------------------------------- | ------- |
| `js` | `queryTemplateById` | queryTemplateById | src/decorators/query-template-by-id.ts |         |

## `src/controllers/adopted-stylesheets-converter.ts`:

### class: `AdoptedStyleSheetsConverter`

#### Fields

| Name          | Privacy | Type                                               | Default                                | Description | Inherited From |
| ------------- | ------- | -------------------------------------------------- | -------------------------------------- | ----------- | -------------- |
| `host`        |         | `ReactiveControllerHost`                           | `host`                                 |             |                |
| `clearStyles` |         | `AdoptedStyleSheetsConverterParams['clearStyles']` | `clearStyles`                          |             |                |
| `templateEl`  |         | `AdoptedStyleSheetsConverterParams['templateEl']`  | `templateEl`                           |             |                |
| `_shadowRoot` | private | `ShadowRoot`                                       | `(this.host as LitElement).renderRoot` |             |                |

#### Methods

| Name                      | Privacy | Description | Parameters                       | Return | Inherited From |
| ------------------------- | ------- | ----------- | -------------------------------- | ------ | -------------- |
| `updateStylesheet`        | private |             |                                  |        |                |
| `setAdoptedStyleSheets`   | private |             | `styleElement: HTMLStyleElement` |        |                |
| `removeComponentStyleTag` | private |             |                                  |        |                |
| `hostConnected`           |         |             |                                  |        |                |
| `hostUpdated`             |         |             |                                  |        |                |

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

| Name             | Description                                                   | Parameters                                                                        | Return |
| ---------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------ |
| `injectTemplate` | Applies the given template to the \`shadowRoot\` of elements. | `elements: NodeListOf<Element> \| Array<Element>, template: () => TemplateResult` | `void` |

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

## `src/context/__fixtures__/context-data.ts`:

### Functions

| Name           | Description | Parameters | Return |
| -------------- | ----------- | ---------- | ------ |
| `customMarkup` |             |            |        |

<hr/>

### Exports

| Kind | Name           | Declaration  | Module                                       | Package |
| ---- | -------------- | ------------ | -------------------------------------------- | ------- |
| `js` | `customStyles` | customStyles | src/context/\_\_fixtures\_\_/context-data.ts |         |
| `js` | `customMarkup` | customMarkup | src/context/\_\_fixtures\_\_/context-data.ts |         |
