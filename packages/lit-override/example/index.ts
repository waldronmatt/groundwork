/* eslint-disable @typescript-eslint/indent */
import { html, css, TemplateResult, CSSResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { until } from 'lit/directives/until.js';
import { injectStyles, injectTemplate } from '../src/index.js';

@customElement('my-promo')
export class Promo extends LitElement {
  static styles: CSSResult = css`
    :host {
      display: block;
    }
  `;

  private list = fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .catch((error) => console.error(error));

  private applyStyleOverride: CSSResult = css`
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

  private renderMarkupOverride(): TemplateResult {
    return html`
      <slot name="heading"></slot>
      <slot name="content"></slot>
    `;
  }

  protected render(): TemplateResult {
    return html`
      <h2>A default box component</h2>
      <section>
        <lit-override>
          <ul>
            <li>Renders a generic slot</li>
            <li>No styles are included</li>
            <li>Emitting connectedCallback is disabled</li>
          </ul>
        </lit-override>
      </section>
      <h2>A box component with customized markup and styles</h2>
      <section>
        <h3>Customization applied by the host app!</h3>
        <lit-override
          emitConnectedCallback
          @connected-callback=${(event: { target: LitElement }) => {
            injectStyles([event.target], this.applyStyleOverride);
            injectTemplate([event.target], this.renderMarkupOverride());
          }}
        >
          <h3 slot="heading">This is a heading!</h3>
          <p slot="content">Here is a paragraph below the heading.</p>
        </lit-override>
      </section>
      <section>
        <h3>Customization slotted from the light dom!</h3>
        <slot></slot>
      </section>
      <section>
        <h3>Markup slotted from the light dom and styles applied by the host app!</h3>
        <slot
          name="test-markup"
          @slotchange=${(event: { target: HTMLSlotElement }) => {
            injectStyles(event.target.assignedElements(), this.applyStyleOverride);
          }}
        >
        </slot>
      </section>
      <section>
        <h3>Markup applied by the host app and styles slotted from the light dom!</h3>
        <slot
          name="test-styles"
          @slotchange=${(event: { target: HTMLSlotElement }) => {
            injectTemplate(event.target.assignedElements(), this.renderMarkupOverride());
          }}
        >
        </slot>
      </section>
      <section>
        <h3>Box components with custom markup and styles generated dynamically from an API endpoint!</h3>
        ${until(
          this.list.then((data) => {
            return html`${repeat(
              data,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (item: any) => item.id,
              (item) => html`
                <lit-override
                  emitConnectedCallback
                  @connected-callback=${(event: { target: LitElement }) => {
                    injectStyles([event.target], this.applyStyleOverride);
                    injectTemplate([event.target], this.renderMarkupOverride());
                  }}
                >
                  <h3 slot="heading">${item.name}</h3>
                  <p slot="content">${item.company.catchPhrase}</p>
                </lit-override>
              `,
            )}`;
          }),
          html`<p>Loading...</p>`,
        )}
      </section>
    `;
  }
}
