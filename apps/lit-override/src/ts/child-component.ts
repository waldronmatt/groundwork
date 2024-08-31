import { LitElement, css, html } from 'lit';
import { EmitConnectedCallback } from '@waldronmatt/lit-override/src/mixins/index.js';
import { templateContentWithFallback } from '@waldronmatt/lit-override/src/directives/index.js';
import { AdoptedStyleSheetsConverter } from '@waldronmatt/lit-override/src/controllers/index.js';
import { queryTemplateById } from '@waldronmatt/lit-override/src/decorators/index.js';

export class ChildComponent extends EmitConnectedCallback(LitElement) {
  static styles = css`
    ::slotted([slot='heading']) {
      color: blue;
      background-color: gray;
    }

    ::slotted([slot='content']) {
      color: red;
      background-color: black;
    }
  `;

  @queryTemplateById()
  templateId!: HTMLTemplateElement | null;

  connectedCallback() {
    super.connectedCallback();
    new AdoptedStyleSheetsConverter(this, { templateEl: this.templateId });
  }

  markup() {
    return html`<section>
      <slot name="heading"></slot>
      <slot name="content"></slot>
      <small>This is default markup from the custom child component!</small>
    </section>`;
  }

  protected render() {
    return html`${templateContentWithFallback({ fallback: this.markup(), templateEl: this.templateId })}`;
  }
}

customElements.define('child-component', ChildComponent);

declare global {
  interface HTMLElementTagNameMap {
    'child-component': ChildComponent;
  }
}
