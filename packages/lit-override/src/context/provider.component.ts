import { html, LitElement } from 'lit';
import { provide } from '@lit/context';
import { litOverrideContext, LitOverrideContextProps } from './key.js';
import { property } from 'lit/decorators.js';

/**
 * LitOverrideProvider - `<lit-override-provider>`
 *
 * Context provider of custom styles and markup.
 *
 * **Note**: Set `clearStyles` to `true` to replace existing styles.
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
export class LitOverrideProvider extends LitElement {
  @provide({ context: litOverrideContext })
  @property({ attribute: false })
  override: Partial<LitOverrideContextProps> = {};

  render() {
    return html`<slot></slot>`;
  }
}
