import { html, LitElement } from 'lit';
import { injectTemplate } from '@waldronmatt/lit-override/src/index.js';

export class HostApp extends LitElement {
  private renderMarkupOverride() {
    return html`
      <slot name="heading"></slot>
      <slot name="content"></slot>
    `;
  }

  protected render() {
    return html`
      <slot
        @slotchange=${(event: { target: HTMLSlotElement }) => {
          injectTemplate(event.target.assignedElements(), this.renderMarkupOverride());
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
