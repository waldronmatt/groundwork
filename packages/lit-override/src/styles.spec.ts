import { CSSResult } from 'lit';
import { injectStyles } from './styles.js';
import * as utils from './utils.js';

jest.mock('lit', () => ({
  CSSResult: jest.fn().mockImplementation(() => ({
    cssText: 'div { color: red; }',
    styleSheet: new CSSStyleSheet(),
  })),
}));

jest.mock('./utils', () => ({
  supportsAdoptingStyleSheets: jest.fn(),
}));

// must manually mock as it is not available via jest dom
class MockCSSStyleSheet {
  cssRules: { cssText: string }[];

  constructor() {
    this.cssRules = [];
  }

  replaceSync(cssText: string) {
    this.cssRules = [{ cssText }];
  }
}

// @ts-expect-error - ignore typings here
window.CSSStyleSheet = MockCSSStyleSheet;

Object.defineProperty(window.ShadowRoot.prototype, 'adoptedStyleSheets', {
  get() {
    return this._adoptedStyleSheets || [];
  },
  set(styleSheets: CSSStyleSheet[]) {
    this._adoptedStyleSheets = styleSheets;
  },
});

const createMockElement = (tagName: string, isCustom = false): HTMLElement & { renderRoot: ShadowRoot } => {
  let elementClass;
  let element;

  if (isCustom) {
    if (!customElements.get(`${tagName}`)) {
      elementClass = class extends HTMLElement {};
      customElements.define(`${tagName}`, elementClass);
    } else {
      elementClass = customElements.get(`${tagName}`);
    }
    // @ts-expect-error - ignore possibly undefined check
    element = new elementClass() as HTMLElement & { renderRoot: ShadowRoot };
  } else {
    element = document.createElement(tagName) as HTMLElement & { renderRoot: ShadowRoot };
  }

  element.renderRoot = element.attachShadow({ mode: 'open' });
  document.body.appendChild(element);

  return element;
};

function cleanupMockElement(element: Element) {
  document.body.removeChild(element);
}

describe('injectStyles', () => {
  let style: CSSResult;

  beforeEach(() => {
    jest.resetModules();
    // @ts-expect-error - ignore private scope error
    style = new CSSResult();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('does nothing if elements or styles are not provided', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    injectStyles(null as any, null as any);
    // not a huge deal that this silently errors since TS will catch majority of the time
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('logs an error if style.cssText is missing', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockElement = createMockElement('mock-element', true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockInvalidLitStyles = { strings: [] } as any;

    injectStyles([mockElement], mockInvalidLitStyles);

    expect(consoleSpy).toHaveBeenCalledWith(
      "The property 'cssText' on 'style' does not exist. Please check if this is still supported by Lit.",
    );
    cleanupMockElement(mockElement);
  });

  test('logs an error for invalid web components', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockInvalidWebComponent = createMockElement('div');

    injectStyles([mockInvalidWebComponent], style);

    expect(consoleSpy).toHaveBeenCalledWith('Element div is not a valid web component');
    cleanupMockElement(mockInvalidWebComponent);
  });

  test('uses adoptedStyleSheets for browsers that support it', async () => {
    jest.spyOn(utils, 'supportsAdoptingStyleSheets').mockImplementation(() => true);
    const mockAdoptedStylesWebComponent = createMockElement('mock-adopted-styles', true);

    injectStyles([mockAdoptedStylesWebComponent], style);
    // Wait for the asynchronous code from injectStyles to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockAdoptedStylesWebComponent.renderRoot.adoptedStyleSheets).toContain(style.styleSheet);
    cleanupMockElement(mockAdoptedStylesWebComponent);
  });

  test('falls back to appending style tags for unsupported browsers', async () => {
    jest.spyOn(utils, 'supportsAdoptingStyleSheets').mockImplementation(() => false);
    const mockNativeStylesWebComponent = createMockElement('mock-native-styles', true);

    injectStyles([mockNativeStylesWebComponent], style);
    // Wait for the asynchronous code from injectStyles to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    const styleTag = mockNativeStylesWebComponent.renderRoot.querySelector('style')!;

    expect(styleTag).toBeInstanceOf(HTMLStyleElement);
    // eslint-disable-next-line jest-dom/prefer-to-have-text-content
    expect(styleTag.textContent).toBe(style.cssText);
    cleanupMockElement(mockNativeStylesWebComponent);
  });

  test('logs an error for failed component registration', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    jest.spyOn(utils, 'supportsAdoptingStyleSheets').mockImplementation(() => false);

    const mockFailedRegistrationWebComponent = createMockElement('mock-failed-registration', true);
    window.customElements.whenDefined = jest.fn().mockRejectedValue(new Error('Component registration failed'));

    injectStyles([mockFailedRegistrationWebComponent], style);
    // Wait for the asynchronous code from injectStyles to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith(
      'There was an error with component registration: Error: Component registration failed',
    );
    cleanupMockElement(mockFailedRegistrationWebComponent);
  });
});
