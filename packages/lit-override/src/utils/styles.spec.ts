import { LitElement, CSSResult } from 'lit';
import { injectStyles } from './styles.js';

jest.mock('lit', () => ({
  CSSResult: jest.fn().mockImplementation((cssText) => ({
    cssText,
    styleSheet: {
      cssRules: [{ cssText }],
    },
  })),
}));

class MockCSSStyleSheet {
  cssRules = [];

  replaceSync(cssText: string) {
    // @ts-expect-error - test
    this.cssRules = [{ cssText }];
  }
}

// @ts-expect-error - test
window.CSSStyleSheet = MockCSSStyleSheet;

Object.defineProperty(window.ShadowRoot.prototype, 'adoptedStyleSheets', {
  get() {
    return this._adoptedStyleSheets || [];
  },
  set(styleSheets) {
    this._adoptedStyleSheets = styleSheets;
  },
});

const originalStyles = ':host { display: none; }';

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
  // Ensure the shadowRoot is correctly attached and returned.
  if (!element.renderRoot) {
    element.renderRoot = element.shadowRoot as ShadowRoot;
    if (isCustom) {
      // @ts-expect-error - ignore private scope error
      const mockOverrideStyles = new CSSResult(originalStyles);
      element.renderRoot.adoptedStyleSheets = [mockOverrideStyles];
    }
  }
  document.body.appendChild(element);
  return element;
};

const overrideStyles = "::slotted([slot='heading']) { color: #000; }";

describe('injectStyles', () => {
  let mockOverrideStyles: CSSResult;

  beforeEach(() => {
    jest.resetModules();
    // @ts-expect-error - ignore private scope error
    mockOverrideStyles = new CSSResult(overrideStyles);
  });

  afterEach(() => {
    jest.clearAllMocks();

    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test('does nothing if elements or styles are not provided', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    injectStyles(null as any, null as any);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('logs an error for invalid web components', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockElement = createMockElement('div');
    injectStyles([mockElement], mockOverrideStyles);
    expect(consoleSpy).toHaveBeenCalledWith('Element div is not a valid web component');
  });

  test('applies styles using adoptedStyleSheets', async () => {
    const mockElement = createMockElement('mock-element', true);
    injectStyles([mockElement], mockOverrideStyles);
    await customElements.whenDefined('mock-element');
    expect(mockElement.renderRoot.adoptedStyleSheets.length).toBe(2);
    expect(mockElement.renderRoot.adoptedStyleSheets[1].cssRules[0].cssText).toEqual(mockOverrideStyles.cssText);
  });

  test('clears existing styles when clearStyles is true', async () => {
    const mockElement = createMockElement('mock-element', true);
    injectStyles([mockElement], mockOverrideStyles, true);
    await customElements.whenDefined('mock-element');
    expect(mockElement.renderRoot.adoptedStyleSheets.length).toBe(1);
    expect(mockElement.renderRoot.adoptedStyleSheets[0].cssRules[0].cssText).toEqual(mockOverrideStyles.cssText);
  });

  test('logs an error for failed component registration', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockElement = createMockElement('mock-failed-registration', true);
    jest.spyOn(customElements, 'whenDefined').mockRejectedValue(new Error('Component registration failed'));

    injectStyles([mockElement], mockOverrideStyles);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith(
      'There was an error with component registration: Error: Component registration failed',
    );
  });
});
