import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { emit } from '@waldronmatt/lit-override/src/utils.js';

export class ChildComponent extends LitElement {
  static styles = css`
    ::slotted([slot='heading']) {
      color: teal;
      background-color: lightgray;
    }

    ::slotted([slot='content']) {
      color: teal;
      background-color: black;
    }
  `;

  @property({ reflect: true, type: Boolean })
  emitConnectedCallback = false;

  connectedCallback() {
    super.connectedCallback();

    if (this.emitConnectedCallback) {
      emit(this, 'connected-callback');
    }
  }

  protected render() {
    return html`<div>
      <p>This is default markup from the custom child component!</p>
      <slot name="heading"></slot> <slot name="content"></slot>
    </div>`;
  }
}

customElements.define('child-component', ChildComponent);

declare global {
  interface HTMLElementTagNameMap {
    'child-component': ChildComponent;
  }
}
