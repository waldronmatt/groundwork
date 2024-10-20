import { LitOverride } from './lit-override.component.js';

export * from './lit-override.component.js';
export default LitOverride;

customElements.define('lit-override', LitOverride);

declare global {
  interface HTMLElementTagNameMap {
    'lit-override': LitOverride;
  }
}
