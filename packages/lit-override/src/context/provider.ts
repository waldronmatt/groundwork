import { LitOverrideProvider } from './provider-component.js';

export * from './provider-component.js';
export default LitOverrideProvider;

customElements.define('lit-override-provider', LitOverrideProvider);

declare global {
  interface HTMLElementTagNameMap {
    'lit-override-provider': LitOverrideProvider;
  }
}
