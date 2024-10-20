import { html, LitElement } from 'lit';
import { injectTemplate } from '@waldronmatt/lit-override/src/utils/index.js';
import '@waldronmatt/lit-override/src/components/index.js';
import './child-component.js';

export class HostApp extends LitElement {
  private renderMarkupOverride() {
    return html`
      <slot name="heading"></slot>
      <slot name="sub-heading"></slot>
    `;
  }

  protected render() {
    return html`
      <slot
        @slotchange=${(event: { target: HTMLSlotElement }) => {
          injectTemplate(event.target.assignedElements(), this.renderMarkupOverride);
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
