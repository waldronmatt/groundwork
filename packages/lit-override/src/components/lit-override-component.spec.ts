import { fixture, expect, oneEvent, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit/static-html.js';
import './lit-override.js';
import type LitOverride from './lit-override.js';

describe('lit-override', () => {
  let sandbox: { restore: () => void };
  let testContainer: HTMLDivElement;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    testContainer = document.createElement('div');
    document.body.appendChild(testContainer);
  });

  afterEach(() => {
    sandbox.restore();
    testContainer.remove();
  });

  it('renders default slot content when no template is provided', async () => {
    const el = await fixture<LitOverride>(html`<lit-override><p>Default Content</p></lit-override>`);
    await expect(el).to.be.accessible();
    expect(el.innerHTML).to.contain('<p>Default Content</p>');
    expect(el.shadowRoot!.innerHTML).to.contain('<slot></slot>');
  });

  it('renders content from the template when provided', async () => {
    const template = document.createElement('template');
    template.id = 'overrideTemplate';
    template.innerHTML = '<slot name="content"></slot>';
    testContainer.appendChild(template);

    const el = await fixture<LitOverride>(html`
      <lit-override templateId="overrideTemplate">
        <p slot="content">A paragraph coming from a custom template</p>
      </lit-override>
    `);

    await expect(el).to.be.accessible();
    expect(el.innerHTML).to.contain('<p slot="content">A paragraph coming from a custom template</p>');
    expect(el.shadowRoot!.innerHTML).to.contain('<slot name="content"></slot>');
  });

  it('handles invalid template IDs gracefully', async () => {
    const el = await fixture(html`<lit-override templateId="nonexistentTemplateId"></lit-override>`);
    expect(el.shadowRoot?.innerHTML).to.contain('<slot></slot>');
  });

  it('applies style tag styles as adoptedStyleSheets', async () => {
    const template = document.createElement('template');
    template.id = 'styleTemplate';
    template.innerHTML = '<style>:host { color: red; }</style>';
    testContainer.appendChild(template);

    const el = await fixture<LitOverride>(html`<lit-override templateId="overrideTemplate"></lit-override>`);

    const adoptedStyles = el.shadowRoot?.adoptedStyleSheets;
    expect(adoptedStyles?.length).to.equal(1);
    expect(el.innerHTML).to.not.contain('<style></style>');
    expect(el.shadowRoot?.querySelector('style')).to.not.exist;
  });

  it('calls onConnectedCallback appropriately', async () => {
    const callbackSpy = sinon.spy();
    const el = await fixture<LitOverride>(html`<lit-override></lit-override>`);
    // @ts-expect-error - this is already defined on the component
    el.onConnectedCallback = callbackSpy;
    el.connectedCallback();
    await aTimeout(50);
    expect(callbackSpy).to.have.been.calledOnce;
  });

  it('does not emit connected-callback event when emitConnectedCallback is false', async () => {
    const el = await fixture<LitOverride>(html`<lit-override></lit-override>`);
    const eventSpy = sinon.spy();
    el.addEventListener('connected-callback', eventSpy);
    setTimeout(() => el.connectedCallback());
    await aTimeout(50);
    expect(eventSpy).not.to.have.been.called;
  });

  it('emits connected-callback event when emitConnectedCallback is true', async () => {
    const el = await fixture<LitOverride>(html`<lit-override emitConnectedCallback></lit-override>`);
    setTimeout(() => el.connectedCallback());
    const ev = await oneEvent(el, 'connected-callback', true);
    expect(ev).to.exist;
  });
});
