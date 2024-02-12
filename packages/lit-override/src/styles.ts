import { LitElement, CSSResult } from 'lit';
import { supportsAdoptingStyleSheets } from './utils.js';

/**
 * Applies the given style using `adoptedStyleSheets`. Behavior adopted from `adoptStyles`:
 * https://github.com/lit/lit/blob/main/packages/reactive-element/src/css-tag.ts#L170
 *
 * **Note**: Appends the style to the `shadowroot` of elements for browser fallback.
 *
 * @param elements iterable of elements to apply styles to
 * @param style CSSResult
 */
export const injectStyles = (elements: NodeListOf<Element> | Array<Element>, style: CSSResult): void => {
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
          if (supportsAdoptingStyleSheets()) {
            ((element as LitElement).renderRoot as ShadowRoot).adoptedStyleSheets = [
              ...((element as LitElement).renderRoot as ShadowRoot).adoptedStyleSheets,
              style.styleSheet!,
            ];
          } else {
            const styleEl = document.createElement('style');
            // style.cssText is fragile because this relies on Lit's interal API
            styleEl.textContent = style.cssText;
            (element as LitElement).renderRoot.appendChild(styleEl);
          }
        })
        .catch((error) => {
          console.error(`There was an error with component registration: ${error}`);
          return;
        });
    }
  });
};
