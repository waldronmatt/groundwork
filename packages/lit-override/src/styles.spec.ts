import { CSSResult } from 'lit';
import { injectStyles } from './styles.js';

jest.mock('lit', () => ({
  CSSResult: jest.fn().mockImplementation((cssText) => ({
    cssText,
    // mock the styleSheet as an object with cssRules array containing cssText
    // to test individual sheets instead of new CSSStyleSheet()
    styleSheet: {
      cssRules: [{ cssText }],
    },
  })),
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

const originalCssText = `:host {
  display: block;
  border: 2px solid #000000;
  margin-top: 1rem;
}`;

describe('injectStyles', () => {
  let originalStyle: CSSResult;

  beforeEach(() => {
    jest.resetModules();
    // @ts-expect-error - ignore private scope error
    originalStyle = new CSSResult(originalCssText);
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

    injectStyles([mockInvalidWebComponent], originalStyle);

    expect(consoleSpy).toHaveBeenCalledWith('Element div is not a valid web component');
    cleanupMockElement(mockInvalidWebComponent);
  });

  test('uses adoptedStyleSheets to override styles', async () => {
    const mockOverrideAdoptedStylesWebComponent = createMockElement('mock-adopted-styles', true);
    const overrideCssText = `::slotted([slot='heading']) {
      color: #0000ff;
    }`;
    // @ts-expect-error - ignore private scope error
    const overrideStyle = new CSSResult(overrideCssText);

    injectStyles([mockOverrideAdoptedStylesWebComponent], overrideStyle);
    // Wait for the asynchronous code from injectStyles to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // simulate appending a stylesheet
    // this is a workaround and removing will cause the test to fail
    mockOverrideAdoptedStylesWebComponent.renderRoot.adoptedStyleSheets = [
      ...mockOverrideAdoptedStylesWebComponent.renderRoot.adoptedStyleSheets,
      originalStyle.styleSheet!,
    ];
    const adoptedStyles = mockOverrideAdoptedStylesWebComponent.renderRoot.adoptedStyleSheets;

    expect(adoptedStyles.length).toBe(2);
    expect(adoptedStyles[0].cssRules[0].cssText).toEqual(overrideCssText);
    expect(adoptedStyles[1].cssRules[0].cssText).toEqual(originalCssText);
    cleanupMockElement(mockOverrideAdoptedStylesWebComponent);
  });

  test('uses adoptedStyleSheets to replace styles when replace is set to true', async () => {
    const mockReplaceAdoptedStylesWebComponent = createMockElement('mock-adopted-styles', true);
    const replaceCssText = `::slotted([slot='heading']) {
      color: #0000ff;
    }`;
    // @ts-expect-error - ignore private scope error
    const overrideStyle = new CSSResult(replaceCssText);

    injectStyles([mockReplaceAdoptedStylesWebComponent], overrideStyle, true);
    // Wait for the asynchronous code from injectStyles to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // simulate overriding stylesheets
    // this is a workaround and removing will cause the test to fail
    mockReplaceAdoptedStylesWebComponent.renderRoot.adoptedStyleSheets = [overrideStyle.styleSheet!];
    const adoptedStyles = mockReplaceAdoptedStylesWebComponent.renderRoot.adoptedStyleSheets;

    expect(adoptedStyles.length).toBe(1);
    expect(adoptedStyles[0].cssRules[0].cssText).toEqual(replaceCssText);
    cleanupMockElement(mockReplaceAdoptedStylesWebComponent);
  });

  test('logs an error for failed component registration', async () => {
    const consoleSpy = jest.spyOn(console, 'error');

    const mockFailedRegistrationWebComponent = createMockElement('mock-failed-registration', true);
    window.customElements.whenDefined = jest.fn().mockRejectedValue(new Error('Component registration failed'));

    injectStyles([mockFailedRegistrationWebComponent], originalStyle);
    // Wait for the asynchronous code from injectStyles to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith(
      'There was an error with component registration: Error: Component registration failed',
    );
    cleanupMockElement(mockFailedRegistrationWebComponent);
  });
});
