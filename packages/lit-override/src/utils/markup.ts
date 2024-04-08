import { LitElement, TemplateResult } from 'lit';

/**
 * Applies the given template to the `shadowRoot` of elements.
 *
 * @param elements iterable of elements to apply markup to
 * @param template TemplateResult
 *
 * **Note**: Only static markdown is supported.
 *
 */
export const injectTemplate = (elements: NodeListOf<Element> | Array<Element>, template: TemplateResult): void => {
  if (!elements || !elements.length || !template) {
    return;
  }

  if (!template.strings[0]) {
    console.error(
      "The property 'strings[0]' on 'template' does not exist. Please check if this is still supported by Lit.",
    );
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
          const litElement = element as LitElement;
          (litElement.renderRoot as LitElement).innerHTML = '';
          const templateElement = document.createElement('template');
          // template.strings[0] is fragile because this relies on Lit's interal API
          templateElement.innerHTML = template.strings[0];
          const content = document.importNode(templateElement.content, true);
          (element as LitElement).renderRoot.appendChild(content);
        })
        .catch((error) => {
          console.error(`There was an error with component registration: ${error}`);
          return;
        });
    }
  });
};
