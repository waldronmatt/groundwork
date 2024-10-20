import { html, LitElement } from 'lit';
import { provide } from '@lit/context';
import { litOverrideContext, LitOverrideContextProps } from './key.js';
import { property } from 'lit/decorators.js';

/**
 * LitOverrideProvider - `<lit-override-provider>`
 *
 * Context provider of custom styles and markup.
 *
 * @property {object} override - Set custom `styles` and `markup`.
 * @slot `<slot></slot>` renders `<lit-override-consumer>`.
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
 * html`
 *   <lit-override-provider
 *    .override=${{ styles: customStyles, markup: customMarkup }}
 *   >
 *    <lit-override-consumer>
 *      <h3 slot="heading">Hello World!</h3>
 *    </lit-override-consumer>
 *   </lit-override-provider>
 * `
 * ```
 */
export class LitOverrideProvider extends LitElement {
  @provide({ context: litOverrideContext })
  @property({ attribute: false })
  public override: Partial<LitOverrideContextProps> = {};

  render() {
    return html`<slot></slot>`;
  }
}
