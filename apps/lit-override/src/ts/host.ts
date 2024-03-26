import { html, css, LitElement } from 'lit';
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override/src/index.js';

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

    ::slotted([slot='content']) {
      color: #ff0000;
    }
  `;

  private renderMarkupOverride() {
    return html`
      <slot name="heading"></slot>
      <slot name="content"></slot>
    `;
  }

  render() {
    return html`
      <lit-override
        emitConnectedCallback
        @connected-callback=${(event: { target: HTMLElement }) => {
          injectStyles([event.target], this.applyStyleOverride);
          injectTemplate([event.target], this.renderMarkupOverride());
        }}
      >
        <h3 slot="heading">This is a heading from the <em>host app</em>!</h3>
        <p slot="content">Here is a paragraph below the heading from the <em>host app</em>.</p>
      </lit-override>
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
