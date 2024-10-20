import { LitOverrideConsumer } from './consumer-component.js';

export * from './consumer-component.js';
export default LitOverrideConsumer;

customElements.define('lit-override-consumer', LitOverrideConsumer);

declare global {
  interface HTMLElementTagNameMap {
    'lit-override-consumer': LitOverrideConsumer;
  }
}
