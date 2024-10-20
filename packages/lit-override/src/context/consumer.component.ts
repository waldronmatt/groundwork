import { LitElement, nothing } from 'lit';
import { consume } from '@lit/context';
import { litOverrideContext, LitOverrideContextProps } from './key.js';
import { property } from 'lit/decorators.js';

/**
 * LitOverrideConsumer - `<lit-override-consumer>`
 *
 * Context consumer of custom styles and markup. Renders `nothing` by default.
 *
 * Example:
 *
 * ```js
 * const customStyles = css`
 *  ::slotted([slot='heading']) {
 *    text-decoration: underline;
 *  }
 * `;
 *
 * const customMarkup = () => {
 *  return html`<slot name="heading"></slot>`;
 * };
 *
 * render() {
 *  return html`
 *    <lit-override-provider
 *      .override=${{ styles: customStyles, markup: customMarkup }}
 *    >
 *      <lit-override-consumer>
 *        <h3 slot="heading">Hello World!</h3>
 *      </lit-override-consumer>
 *    </lit-override-provider>
 *  `
 * }
 * ```
 */
export class LitOverrideConsumer extends LitElement {
  @consume({ context: litOverrideContext, subscribe: true })
  @property({ attribute: false })
  override?: Partial<LitOverrideContextProps>;

  private setAdoptedStyleSheets() {
    if (this.override?.styles) {
      (this.shadowRoot as ShadowRoot).adoptedStyleSheets = this.override.clearStyles
        ? [this.override.styles.styleSheet!]
        : [...this.shadowRoot!.adoptedStyleSheets, this.override.styles.styleSheet!];
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.setAdoptedStyleSheets();
  }

  render() {
    if (this.override?.markup) {
      return this.override.markup?.();
    }
    return nothing;
  }
}
