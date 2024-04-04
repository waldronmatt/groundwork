import { LitElement, TemplateResult } from 'lit';

/**
 * Applies the given template to the `shadowRoot` of elements. Behavior adopted from `TemplateContentDirective`:
 * https://github.com/lit/lit/blob/main/packages/lit-html/src/directives/template-content.ts#L10
 *
 * **Note**: Custom elements provided must be configured to accept templates via the
 * `templateContent` directive: `templateContent(this.querySelector("template"))`
 *
 * @param elements iterable of elements to apply markup to
 * @param template TemplateResult
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
          // making sure we clean out any existing elements for a cleaner DOM
          while ((element as LitElement).renderRoot.firstChild) {
            (element as LitElement).renderRoot.removeChild((element as LitElement).renderRoot.firstChild!);
          }
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
