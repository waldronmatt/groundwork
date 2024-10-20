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

  it('renders content from the template when provided', async () => {
    const template = document.createElement('template');
    template.id = 'markupTemplate';
    template.innerHTML = '<slot name="content"></slot>';
    testContainer.appendChild(template);

    const el = await fixture<LitOverride>(html`
      <lit-override templateId="markupTemplate">
        <p slot="content">A paragraph coming from a custom template</p>
      </lit-override>
    `);

    await expect(el).to.be.accessible();
    expect(el.innerHTML).to.contain('<p slot="content">A paragraph coming from a custom template</p>');
    expect(el.shadowRoot!.innerHTML).to.contain('<slot name="content"></slot>');
  });

  it('renders default slot content when no template is provided', async () => {
    const el = await fixture<LitOverride>(html`<lit-override><p>Default Content</p></lit-override>`);
    await expect(el).to.be.accessible();
    expect(el.innerHTML).to.contain('<p>Default Content</p>');
    expect(el.shadowRoot!.innerHTML).to.contain('<slot></slot>');
  });

  it('applies style tag styles as adoptedStyleSheets', async () => {
    const template = document.createElement('template');
    template.id = 'styleTemplate';
    template.innerHTML = '<style>:host { color: red; }</style>';
    testContainer.appendChild(template);

    const el = await fixture<LitOverride>(html`<lit-override templateId="styleTemplate"></lit-override>`);

    await expect(el).to.be.accessible();
    const adoptedStyles = el.shadowRoot?.adoptedStyleSheets;
    expect(adoptedStyles?.length).to.equal(1);
    expect(el.innerHTML).to.not.contain('<style></style>');
    expect(el.shadowRoot?.querySelector('style')).to.not.exist;
  });

  it('logs an error on invalid template ID', async () => {
    const consoleErrorSpy = sinon.spy(console, 'error');
    await fixture(html`<lit-override templateId="nonexistentTemplateId"></lit-override>`);
    expect(consoleErrorSpy).to.have.been.calledWith('Template id nonexistentTemplateId could not be found');
  });

  it('gets a template element as a fallback when templateId is not provided', async () => {
    const template = document.createElement('template');
    template.id = 'aTemplate';
    template.innerHTML = '<slot name="text"></slot>';
    testContainer.appendChild(template);

    const el = await fixture(html`<lit-override></lit-override>`);

    expect(el.shadowRoot!.innerHTML).to.contain('<slot name="text"></slot>');
  });

  it('calls onConnectedCallback on connectedCallback', async () => {
    const el = await fixture<LitOverride>(html`<lit-override></lit-override>`);

    const callbackSpy = sinon.spy();
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
    const ev = await oneEvent(el, 'connected-callback');

    expect(ev).to.exist;
  });
});
