import { TemplateResult } from 'lit';
import { injectTemplate } from './markup.js';

const htmlMock = (strings: TemplateStringsArray): TemplateResult => {
  return {
    strings: strings,
    values: [],
    ['_$litType$']: 1,
  };
};

jest.mock('lit-html', () => ({
  html: jest.fn().mockImplementation(String.raw),
  render: jest.fn((template, container) => {
    // simulate rendering by setting innerHTML of the container
    if (container.shadowRoot) {
      container.shadowRoot.innerHTML = template.strings.join('');
    } else {
      container.innerHTML = template.strings.join('');
    }
  }),
}));

const createMockElement = (tagName: string, isCustom = false): HTMLElement & { renderRoot: ShadowRoot } => {
  let elementClass;
  let element;

  if (isCustom) {
    if (!customElements.get(`${tagName}`)) {
      elementClass = class extends HTMLElement {
        render() {
          // @ts-expect-error - typing check check
          return document.importNode(document.querySelector('template').content, true);
        }
      };
      customElements.define(`${tagName}`, elementClass);
    } else {
      elementClass = customElements.get(`${tagName}`);
    }
    // @ts-expect-error - ignore possibly undefined check
    element = new elementClass() as HTMLElement & { renderRoot: ShadowRoot };
    const h3 = document.createElement('h3');
    h3.setAttribute('slot', 'heading');
    h3.textContent = 'A heading from a template in the light dom';
    // append the slot to the shadow DOM
    element.appendChild(h3);
  } else {
    element = document.createElement(tagName) as HTMLElement & { renderRoot: ShadowRoot };
  }

  element.renderRoot = element.attachShadow({ mode: 'open' });
  document.body.appendChild(element);

  return element;
};

const cleanupMockElement = (element: Element) => {
  document.body.removeChild(element);
};

describe('injectTemplate', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('does nothing if elements or templates are not provided', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    injectTemplate(null as any, null as any);
    // not a huge deal that this silently errors since TS will catch majority of the time
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('logs an error for invalid web components', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockElement = createMockElement('div');
    const mockTemplate = htmlMock`<slot name="heading"></slot>`;

    injectTemplate([mockElement], mockTemplate);

    expect(consoleSpy).toHaveBeenCalledWith('Element div is not a valid web component');
    cleanupMockElement(mockElement);
  });

  test('applies template markup correctly', async () => {
    const mockCustomElement = createMockElement('mock-component', true);
    document.body.appendChild(mockCustomElement);
    const mockTemplate = htmlMock`<slot name="heading"></slot>`;

    // add initial children to the renderRoot
    const initialChild = document.createElement('span');
    initialChild.textContent = 'Initial child';
    mockCustomElement.renderRoot.appendChild(initialChild);

    // ensure the initial child is in the renderRoot
    expect(mockCustomElement.renderRoot.contains(initialChild)).toBe(true);

    injectTemplate([mockCustomElement], mockTemplate);
    // wait for asynchronous tasks in injectTemplate to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    // ensure `render` removes the initial child
    expect(mockCustomElement.renderRoot.contains(initialChild)).toBe(false);
    expect(mockCustomElement.innerHTML).toEqual('<h3 slot="heading">A heading from a template in the light dom</h3>');
    expect(mockCustomElement.shadowRoot?.innerHTML).toEqual('<slot name="heading"></slot>');
    cleanupMockElement(mockCustomElement);
  });

  test('logs an error for failed component registration', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const mockFailedRegistrationWebComponent = createMockElement('mock-component', true);

    document.body.appendChild(mockFailedRegistrationWebComponent);
    const mockTemplate = htmlMock`<slot name="heading"></slot>`;

    window.customElements.whenDefined = jest.fn().mockRejectedValue(new Error('Component registration failed'));
    injectTemplate([mockFailedRegistrationWebComponent], mockTemplate);
    // wait for asynchronous tasks in injectTemplate to complete
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith(
      'There was an error with component registration: Error: Component registration failed',
    );
    cleanupMockElement(mockFailedRegistrationWebComponent);
  });
});
