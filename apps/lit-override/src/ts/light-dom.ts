import { html, LitElement } from 'lit';
import '@waldronmatt/lit-override/src/components/index.js';
import './child-component.js';

export class HostApp extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('host-app', HostApp);

declare global {
  interface HTMLElementTagNameMap {
    // @ts-expect-error - ignore duplicate declaration warning
    'host-app': HostApp;
  }
}
