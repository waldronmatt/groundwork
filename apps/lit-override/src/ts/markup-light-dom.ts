import { html, css, LitElement } from 'lit';
import { injectStyles } from '@waldronmatt/lit-override/src/utils/index.js';
import '@waldronmatt/lit-override/src/components/index.js';
import './child-component.js';

export class HostApp extends LitElement {
  private applyStyleOverride = css`
    :host {
      display: block;
      border: 2px solid #000000;
      margin-top: 1rem;
    }

    ::slotted([slot='heading']) {
      color: #0000ff;
    }

    ::slotted([slot='sub-heading']) {
      color: #ff0000;
    }
  `;

  render() {
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

customElements.define('host-app', HostApp);

declare global {
  interface HTMLElementTagNameMap {
    // @ts-expect-error - ignore duplicate declaration warning
    'host-app': HostApp;
  }
}
