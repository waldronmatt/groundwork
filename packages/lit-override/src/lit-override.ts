import { LitElement, TemplateResult, html } from 'lit';
import { templateContent } from 'lit/directives/template-content.js';
import { customElement, property, state } from 'lit/decorators.js';
import { emit } from './utils.js';

/**
 * lit-override
 *
 * A generic component that can accept different styles and markup.
 *
 * **Note**: Set `emitConnectedCallback` property and use `connected-callback` event
 * to reliably apply styles and markup when using this inside another Lit component.
 *
 * @slot - defaults to render any content via `<slot>`
 * @template - will auto detect a `<template>` element and render it per instance
 * @fires connected-callback - only if `emitConnectedCallback` prop is set
 */
@customElement('lit-override')
export class LitOverride extends LitElement {
  @property({ reflect: true, type: Boolean })
  // eslint-disable-next-line @typescript-eslint/indent
  emitConnectedCallback = false;

  @state()
  private _template: HTMLTemplateElement | null = null;

  connectedCallback() {
    super.connectedCallback();

    this._template = this.querySelector('template');

    if (this.emitConnectedCallback) {
      emit(this, 'connected-callback');
    }
  }

  protected render() {
    return !this._template ? html`<slot></slot>` : (templateContent(this._template) as TemplateResult);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-override': LitOverride;
  }
}
