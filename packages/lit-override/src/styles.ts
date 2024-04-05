import { LitElement, CSSResult } from 'lit';

/**
 * Applies the given style using `adoptedStyleSheets`. Behavior adopted from `adoptStyles`:
 * https://github.com/lit/lit/blob/main/packages/reactive-element/src/css-tag.ts#L170
 *
 * **Note**: Appends the style to the `shadowroot` of elements for browser fallback.
 *
 * @param elements iterable of elements to apply styles to
 * @param style CSSResult
 * @param replace replace the original styles or preserve them when overriding. Defaults to `false`.
 */
export const injectStyles = (
  elements: NodeListOf<Element> | Array<Element>,
  style: CSSResult,
  replace: boolean = false,
): void => {
  if (!elements || !elements.length || !style) {
    return;
  }

  if (!style.cssText) {
    console.error("The property 'cssText' on 'style' does not exist. Please check if this is still supported by Lit.");
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
          shadowRoot.adoptedStyleSheets = replace ? [newStyleSheet] : [...shadowRoot.adoptedStyleSheets, newStyleSheet];
        })
        .catch((error) => {
          console.error(`There was an error with component registration: ${error}`);
          return;
        });
    }
  });
};
