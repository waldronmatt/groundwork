import { LitElement, CSSResult } from 'lit';

/**
 * Applies the given style using `adoptedStyleSheets`.
 *
 * @param elements iterable of elements to apply styles to
 * @param style CSSResult
 * @param clearStyles replace or preserve original styles. Defaults to `false`.
 */
export const injectStyles = (
  elements: NodeListOf<Element> | Array<Element>,
  style: CSSResult,
  clearStyles: boolean = false,
): void => {
  if (!elements || !elements.length || !style) {
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
          const shadowRoot = litElement.renderRoot as ShadowRoot;
          const newStyleSheet = style.styleSheet!;
          shadowRoot.adoptedStyleSheets = clearStyles
            ? [newStyleSheet]
            : [...shadowRoot.adoptedStyleSheets, newStyleSheet];
        })
        .catch((error) => {
          console.error(`There was an error with component registration: ${error}`);
          return;
        });
    }
  });
};
