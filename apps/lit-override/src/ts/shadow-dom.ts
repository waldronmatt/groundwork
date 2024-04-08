import { html, css, LitElement } from 'lit';
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override/src/utils/index.js';
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

  private renderMarkupOverride() {
    return html`
      <slot name="heading"></slot>
      <slot name="sub-heading"></slot>
    `;
  }

  render() {
    return html`
      <section>
        <h2>Child Component</h2>
        <child-component
          emitConnectedCallback
          @connected-callback=${(event: { target: HTMLElement }) => {
            injectStyles([event.target], this.applyStyleOverride);
            injectTemplate([event.target], this.renderMarkupOverride());
          }}
        >
          <h3 slot="heading">This is a heading from the <em>host app</em>!</h3>
          <p slot="sub-heading">Here is a paragraph below the heading from the <em>host app</em>.</p>
        </child-component>
      </section>
      <section>
        <h2>Lit Override</h2>
        <lit-override
          emitConnectedCallback
          @connected-callback=${(event: { target: HTMLElement }) => {
            injectStyles([event.target], this.applyStyleOverride);
            injectTemplate([event.target], this.renderMarkupOverride());
          }}
        >
          <h3 slot="heading">This is a heading from the <em>host app</em>!</h3>
          <p slot="sub-heading">Here is a paragraph below the heading from the <em>host app</em>.</p>
        </lit-override>
      </section>
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
