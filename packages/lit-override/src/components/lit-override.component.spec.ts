import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit/static-html.js';
import { TemplateCacheManager } from '../decorators/cache.js';
import './lit-override.js';
import type LitOverride from './lit-override.js';

let cacheTemplateStub: sinon.SinonStub;
let clearTemplateCacheStub: sinon.SinonStub;

describe('query-template-by-id', () => {
  let sandbox: { restore: () => void };
  let testContainer: HTMLDivElement;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    testContainer = document.createElement('div');
    document.body.appendChild(testContainer);
    cacheTemplateStub = sinon.stub(TemplateCacheManager.prototype, 'cacheTemplate');
    clearTemplateCacheStub = sinon.stub(TemplateCacheManager.prototype, 'clearTemplateCache');
  });

  afterEach(() => {
    sandbox.restore();
    testContainer.remove();
    sinon.restore();
  });

  it('logs an error when an invalid templateId is provided', async () => {
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

  it('caches the template when the component is connected to the DOM', async () => {
    const template = document.createElement('template');
    template.id = 'testingTemplateCaching';
    testContainer.appendChild(template);

    const el = await fixture<LitOverride>(html`<lit-override templateId="testingTemplateCaching"></lit-override>`);

    el.connectedCallback();

    expect(cacheTemplateStub.called).to.be.true;
    expect(cacheTemplateStub.calledWith('testingTemplateCaching')).to.be.true;
  });

  it('clears the template cache when the component is disconnected from the DOM', async () => {
    const template = document.createElement('template');
    template.id = 'testingTemplateCaching';
    testContainer.appendChild(template);

    const el = await fixture<LitOverride>(html`<lit-override templateId="testingTemplateCaching"></lit-override>`);

    el.disconnectedCallback();

    expect(clearTemplateCacheStub.calledOnce).to.be.true;
  });

  it('does not cache if a template is not found based on the provided templateID', async () => {
    const el = await fixture<LitOverride>(html`<lit-override templateId="nullTemplateId"></lit-override>`);

    el.connectedCallback();

    expect(cacheTemplateStub.called).to.be.false;
  });
});

describe('template-content-with-fallback', () => {
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

  it('renders content from the template element when provided', async () => {
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

  it('renders default slot content when a template element does not exist', async () => {
    const el = await fixture<LitOverride>(html`<lit-override><p>Default Content</p></lit-override>`);
    await expect(el).to.be.accessible();
    expect(el.innerHTML).to.contain('<p>Default Content</p>');
    expect(el.shadowRoot!.innerHTML).to.contain('<slot></slot>');
  });
});

describe('adopted-stylesheets-converter', () => {
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

  it('applies style tag styles as adoptedStyleSheets on the component', async () => {
    const template = document.createElement('template');
    template.id = 'styleTemplate';
    template.innerHTML = '<style>:host { color: red; }</style>';
    testContainer.appendChild(template);

    const el = await fixture<LitOverride>(html`<lit-override templateId="styleTemplate"></lit-override>`);

    await expect(el).to.be.accessible();

    const adoptedStyleSheets = el.shadowRoot?.adoptedStyleSheets;
    const sheet = adoptedStyleSheets![0];
    const cssText = Array.from(sheet!.cssRules)
      .map((rule) => rule.cssText)
      .join(' ');

    expect(adoptedStyleSheets?.length).to.equal(1);
    expect(cssText).to.contain(':host { color: red; }');

    expect(el.innerHTML).to.not.contain('<style></style>');
    expect(el.shadowRoot?.querySelector('style')).to.not.exist;
  });
});

describe('emit-connected-callback', () => {
  let sandbox: { restore: () => void };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('does not call onConnectedCallback if not defined', async () => {
    const el = await fixture<LitOverride>(html`<lit-override></lit-override>`);

    const callbackSpy = sinon.spy();
    el.connectedCallback();

    expect(callbackSpy).not.to.have.been.called;
  });

  it('calls onConnectedCallback on connectedCallback lifecycle', async () => {
    const el = await fixture<LitOverride>(html`<lit-override></lit-override>`);

    const callbackSpy = sinon.spy();
    // @ts-expect-error - this is already defined on the component
    el.onConnectedCallback = callbackSpy;
    el.connectedCallback();

    expect(callbackSpy).to.have.been.calledOnce;
  });

  it('does not emit connected-callback event when emitConnectedCallback is false', async () => {
    const el = await fixture<LitOverride>(html`<lit-override></lit-override>`);

    const eventSpy = sinon.spy();
    el.addEventListener('connected-callback', eventSpy);
    el.connectedCallback();

    expect(eventSpy.called).to.be.false;
  });

  it('emits connected-callback event when emitConnectedCallback is true', async () => {
    const el = await fixture<LitOverride>(html`<lit-override emitConnectedCallback></lit-override>`);

    const eventSpy = sinon.spy();
    el.addEventListener('connected-callback', eventSpy);
    el.connectedCallback();

    expect(eventSpy.called).to.be.true;
  });
});
