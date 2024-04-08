import { fixture, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './lit-override.js';
import type LitOverride from './lit-override.js';

describe('lit-override', () => {
  it('renders default slot content when no template is provided', async () => {
    const el = await fixture<LitOverride>(html`<lit-override><p>Default Content</p></lit-override>`);

    await expect(el).to.be.accessible();
    expect(el.innerHTML).to.contain('<p>Default Content</p>');
    expect(el.shadowRoot!.innerHTML).to.contain('<slot></slot>');
  });

  it('renders content from the template when provided', async () => {
    document.body.innerHTML = `
      <template id="overrideTemplate">
        <slot name="content"></slot>
      </template>
    `;

    const el = await fixture<LitOverride>(html`
      <lit-override templateId="overrideTemplate">
        <p slot="content">A paragraph coming from a custom template</p>
      </lit-override>
    `);

    await expect(el).to.be.accessible();
    expect(el.innerHTML).to.contain('<p slot="content">A paragraph coming from a custom template</p>');
    expect(el.shadowRoot!.innerHTML).to.contain('<slot name="content"></slot>');
  });

  it('applies style tag styles as adoptedStyleSheets', async () => {
    document.body.innerHTML = `
      <template id="overrideTemplate">
        <style>
          :host {
            color: red;
          }
        </style>
      </template>
    `;

    const el = await fixture<LitOverride>(html`<lit-override templateId="overrideTemplate"></lit-override>`);

    const adoptedStyles = el.shadowRoot?.adoptedStyleSheets;

    expect(adoptedStyles?.length).to.equal(1);
    expect(el.innerHTML).to.not.contain('<style></style>');
  });

  it('emits connected-callback event if emitConnectedCallback is true', async () => {
    const el = await fixture<LitOverride>(html`<lit-override emitConnectedCallback></lit-override>`);

    setTimeout(() => el.connectedCallback());
    const ev = await oneEvent(el, 'connected-callback', true);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(ev).to.exist;
  });
});
