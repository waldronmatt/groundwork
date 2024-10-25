import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { LitElement } from 'lit';
import { html } from 'lit/static-html.js';
import './provider.js';
import './consumer.js';
import { customMarkup, customStyles } from './__fixtures__/context-data.js';

describe('lit-override', () => {
  let sandbox: { restore: () => void };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders markup and styles when provided', async () => {
    const elConsumer = await fixture<LitElement>(html`
      <lit-override-consumer>
        <h3 slot="heading">Hello World!</h3>
      </lit-override-consumer>
    `);

    const elProvider = await fixture<LitElement>(html`
      <lit-override-provider .override=${{ styles: customStyles, markup: customMarkup }}>
        ${elConsumer}
      </lit-override-provider>
    `);

    await expect(elProvider).to.be.accessible();

    expect(elConsumer.shadowRoot!.innerHTML).to.contain('<slot name="heading"></slot>');

    const adoptedStyleSheets = elConsumer.shadowRoot?.adoptedStyleSheets;
    const sheet = adoptedStyleSheets![0];
    const cssText = Array.from(sheet!.cssRules)
      .map((rule) => rule.cssText)
      .join(' ');

    expect(adoptedStyleSheets?.length).to.equal(1);
    expect(cssText).to.contain('::slotted([slot="heading"]) { text-decoration: underline; }');
  });

  it('renders nothing when styles and markup are not provided', async () => {
    const elConsumer = await fixture<LitElement>(html`
      <lit-override-consumer>
        <h3 slot="heading">Hello World!</h3>
      </lit-override-consumer>
    `);

    await fixture<LitElement>(html`<lit-override-provider>${elConsumer}</lit-override-provider>`);

    expect(elConsumer.shadowRoot!.innerHTML).to.contain('');
    expect(elConsumer.shadowRoot?.adoptedStyleSheets?.length).to.equal(0);
  });
});
