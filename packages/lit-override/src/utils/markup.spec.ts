import { LitElement } from 'lit';
import { render, html, TemplateResult } from 'lit-html';
import { injectTemplate } from './markup.js';

jest.mock('lit-html', () => ({
  html: jest.fn().mockImplementation((strings) => ({
    strings: strings,
    values: [],
  })),
  render: jest.fn(),
}));

const createMockElement = (tagName: string, isCustom = false) => {
  class MockElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  }

  if (isCustom && !customElements.get(tagName)) {
    customElements.define(tagName, MockElement);
  }

  const element = document.createElement(tagName) as LitElement & { renderRoot: ShadowRoot };
  document.body.appendChild(element);
  return element;
};

describe('injectTemplate', () => {
  let overrideMarkup: TemplateResult;

  beforeEach(() => {
    jest.resetModules();

    overrideMarkup = html`<slot name="heading"></slot>`;
  });

  afterEach(() => {
    jest.clearAllMocks();

    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('does nothing if elements or templates are not provided', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    injectTemplate(null as any, null as any);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('logs an error for invalid web components', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockElement = createMockElement('div');
    injectTemplate([mockElement], overrideMarkup);
    expect(consoleSpy).toHaveBeenCalledWith('Element div is not a valid web component');
  });

  test('applies template markup correctly to custom elements', async () => {
    const mockElement = createMockElement('mock-element', true);
    injectTemplate([mockElement], overrideMarkup);
    await customElements.whenDefined('mock-element');
    expect(render).toHaveBeenCalledWith(overrideMarkup, mockElement.renderRoot);
  });

  test('logs an error for failed component registration', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockElement = createMockElement('mock-failed-registration', true);
    jest.spyOn(customElements, 'whenDefined').mockRejectedValue(new Error('Component registration failed'));

    injectTemplate([mockElement], overrideMarkup);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith(
      'There was an error with component registration: Error: Component registration failed',
    );
  });
});
