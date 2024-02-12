/**
 * Whether the current browser supports `adoptedStyleSheets`.
 * https://github.com/lit/lit-element/blob/master/src/lib/css-tag.ts#L15
 */
export const supportsAdoptingStyleSheets = (): boolean => {
  return (
    window.ShadowRoot &&
    // @ts-expect-error - ignore typing
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype
  );
};

/**
 * Emits a custom event with more convenient defaults.
 * https://github.com/shoelace-style/shoelace/blob/next/src/internal/event.ts
 */
export const emit = (el: HTMLElement, name: string, options?: CustomEventInit) => {
  const event = new CustomEvent(
    name,
    Object.assign(
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {},
      },
      options,
    ),
  );
  el.dispatchEvent(event);

  return event;
};
