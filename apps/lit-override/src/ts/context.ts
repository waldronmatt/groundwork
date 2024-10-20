import { html, LitElement } from 'lit';
import '@waldronmatt/lit-override/src/components/index.js';
import '@waldronmatt/lit-override/src/context/index.js';
import { customStyles, customMarkup } from './context-data.js';

export class HostApp extends LitElement {
  render() {
    return html`
      <lit-override-provider .override=${{ styles: customStyles, markup: customMarkup }}>
        <lit-override-consumer>
          <h3 slot="heading">This is a heading from the <em>host app</em>!</h3>
          <p slot="sub-heading">Here is a paragraph below the heading from the <em>host app</em>.</p>
        </lit-override-consumer>
      </lit-override-provider>
    `;
  }
}

customElements.define('host-app', HostApp);

declare global {
  interface HTMLElementTagNameMap {
    'host-app': HostApp;
  }
}
