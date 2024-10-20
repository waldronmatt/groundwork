import { html, css, LitElement } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { until } from 'lit/directives/until.js';
import { choose } from 'lit/directives/choose.js';
import { injectStyles, injectTemplate } from '@waldronmatt/lit-override/src/utils/index.js';
import '@waldronmatt/lit-override/src/components/index.js';
import '@waldronmatt/lit-override/src/context/index.js';
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

  protected render() {
    return html`
      ${until(
        this.list.then((data) => {
          return html`${repeat(
            data,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => item.id,
            (item) =>
              choose(item.id % 3, [
                [
                  0,
                  () => html`
                    <section>
                      <h2>From Child Component:</h2>
                      <child-component
                        emitConnectedCallback
                        @connected-callback=${(event: { target: LitElement }) => {
                          injectStyles([event.target], this.applyStyleOverride);
                          injectTemplate([event.target], this.renderMarkupOverride());
                        }}
                      >
                        <h3 slot="heading">${item.name}</h3>
                        <p slot="sub-heading">${item.company.catchPhrase}</p>
                      </child-component>
                    </section>
                  `,
                ],
                [
                  1,
                  () => html`
                    <section>
                      <h2>From Lit Override:</h2>
                      <lit-override
                        emitConnectedCallback
                        @connected-callback=${(event: { target: LitElement }) => {
                          injectStyles([event.target], this.applyStyleOverride);
                          injectTemplate([event.target], this.renderMarkupOverride());
                        }}
                      >
                        <h3 slot="heading">${item.name}</h3>
                        <p slot="sub-heading">${item.company.catchPhrase}</p>
                      </lit-override>
                    </section>
                  `,
                ],
                [
                  2,
                  () => html`
                    <section>
                      <h2>From Context Provider:</h2>
                      <lit-override-provider
                        .override=${{
                          styles: this.applyStyleOverride,
                          markup: this.renderMarkupOverride,
                        }}
                      >
                        <lit-override-consumer>
                          <h3 slot="heading">${item.name}</h3>
                          <p slot="sub-heading">${item.company.catchPhrase}</p>
                        </lit-override-consumer>
                      </lit-override-provider>
                    </section>
                  `,
                ],
              ]),
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
    // @ts-expect-error - ignore duplicate declaration warning
    'host-app': HostApp;
  }
}
