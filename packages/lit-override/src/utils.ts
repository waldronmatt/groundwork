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
