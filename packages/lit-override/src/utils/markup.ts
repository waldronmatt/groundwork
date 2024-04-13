import { LitElement, TemplateResult } from 'lit';
import { render } from 'lit-html';

/**
 * Applies the given template to the `shadowRoot` of elements.
 *
 * @param elements iterable of elements to apply markup to
 * @param template TemplateResult
 *
 * **Note**: Only static markdown is supported.
 */
export const injectTemplate = (elements: NodeListOf<Element> | Array<Element>, template: TemplateResult): void => {
  if (!elements || !elements.length || !template) {
    return;
  }

  elements.forEach((element: Element) => {
    if (element) {
      const name = element.tagName.toLowerCase();
      if (!customElements.get(name)) {
        console.error(`Element ${name} is not a valid web component`);
        return;
      }
      customElements
        .whenDefined(name)
        .then(() => {
          const shadowRoot = (element as LitElement).renderRoot;
          render(template, shadowRoot);
        })
        .catch((error) => {
          console.error(`There was an error with component registration: ${error}`);
          return;
        });
    }
  });
};
