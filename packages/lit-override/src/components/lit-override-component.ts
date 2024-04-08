import { LitElement, html } from 'lit';
import { EmitConnectedCallback } from '../mixins/emit-connected-callback.js';
import { templateContentWithFallback } from '../directives/template-content-with-fallback.js';
import { AdoptedStyleSheetsConverter } from '../controllers/adopted-stylesheets-converter.js';
import { property } from 'lit/decorators.js';

/**
 * LitOverride - `<lit-override>`
 *
 * A shell component for overriding styles and markup.
 *
 * @fires connected-callback when `emitConnectedCallback` is `true`
 * @property {boolean} emitConnectedCallback - Set prop to use `connected-callback` event. Defaults to `false`.
 * @property {string} id - unique identifier that points to the id of a `template` element. Defaults to empty string.
 * @slot `<slot></slot>` is rendered as fallback if `<template>` element is not found
 */
export class LitOverride extends EmitConnectedCallback(LitElement) {
  @property({ reflect: true, type: String })
  templateId!: string;

  connectedCallback() {
    super.connectedCallback();
    new AdoptedStyleSheetsConverter(this, { id: this.templateId });
  }

  protected render() {
    return html`${templateContentWithFallback({ id: this.templateId })}`;
  }
}
