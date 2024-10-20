import { LitElement, html } from 'lit';
import { EmitConnectedCallback } from '../mixins/emit-connected-callback.js';
import { templateContentWithFallback } from '../directives/template-content-with-fallback.js';
import { AdoptedStyleSheetsConverter } from '../controllers/adopted-stylesheets-converter.js';
import { queryTemplateById, TemplateIdProperty } from '../decorators/query-template-by-id.js';

/**
 * LitOverride - `<lit-override>`
 *
 * A shell component for overriding styles and markup.
 *
 * @fires connected-callback when `emitConnectedCallback` is `true`.
 * @property {boolean} emitConnectedCallback - Set prop to use `connected-callback` event. Defaults to `false`.
 * @property {function} onConnectedCallback - A callback function called when connected to the DOM.
 * @property {string} templateId - Set an id referencing a `template` element. Defaults to a generic `template` element.
 * @slot `<slot></slot>` is rendered as fallback if `<template>` element is not found.
 */
export class LitOverride extends EmitConnectedCallback(LitElement) {
  @queryTemplateById({ fallback: true })
  templateId!: TemplateIdProperty['templateIdGetter'];

  connectedCallback() {
    super.connectedCallback();
    new AdoptedStyleSheetsConverter(this, { templateEl: this.templateId });
  }

  render() {
    return html`${templateContentWithFallback({ templateEl: this.templateId })}`;
  }
}
