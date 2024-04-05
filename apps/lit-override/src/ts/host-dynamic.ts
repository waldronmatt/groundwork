import { html, css, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { until } from 'lit/directives/until.js';
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override/src/index.js';
import './child-component.js';

export class HostApp extends LitElement {
  private list = fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .catch((error) => console.error(error));

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

  protected render() {
    return html`
      ${until(
        this.list.then((data) => {
          return html`${repeat(
            data,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => item.id,
            (item) => html`
              <child-component
                emitConnectedCallback
                @connected-callback=${(event: { target: LitElement }) => {
                  injectStyles([event.target], this.applyStyleOverride, item.id % 2 === 0 ? false : true);
                  if (item.id % 2 === 0) {
                    injectTemplate([event.target], this.renderMarkupOverride());
                  }
                }}
              >
                <h3 slot="heading">${item.name}</h3>
                <p slot="content">${item.company.catchPhrase}</p>
              </child-component>
            `,
          )}`;
        }),
        html`<p>Loading...</p>`,
      )}
    `;
  }
}

customElements.define('host-app', HostApp);

declare global {
  interface HTMLElementTagNameMap {
    'host-app': HostApp;
  }
}
