import { property } from 'lit/decorators.js';
import { ReactiveElement } from 'lit';

export interface ExtendedElement extends ReactiveElement {
  [key: symbol]: string | null;
  _templateCache?: Record<string, HTMLTemplateElement | null>;
}

/**
 * queryTemplateById
 *
 * Gets a template element by id that is provided to the `templateId` property.
 * Will cache the template element on successful query.
 *
 * @param fallback gets a template element if an id is not provided (not cached). Defaults to `false`.
 */
export const queryTemplateById = ({ fallback = false }: { fallback?: boolean } = {}) => {
  return <T extends ReactiveElement>(proto: T, propName: string) => {
    const internalKey = Symbol(`_${String(propName)}`);

    property({ reflect: true, type: String })(proto, propName);

    Object.defineProperty(proto, 'templateId', {
      get(this: ExtendedElement): HTMLTemplateElement | null {
        const id = this[internalKey];

        if (!this._templateCache) {
          this._templateCache = {};
        }

        if (id && this._templateCache[id]) {
          return this._templateCache[id];
        }

        if (typeof id === 'string' && id) {
          const templateElement = document.querySelector(`template#${id}`) as HTMLTemplateElement | null;

          if (!templateElement) {
            console.error(`Template id ${id} could not be found`);
            return null;
          }

          this._templateCache[id] = templateElement;
          return templateElement;
        }

        return fallback ? (document.querySelector('template') as HTMLTemplateElement | null) : null;
      },
      set(this: ExtendedElement, value: string | null) {
        this[internalKey] = value;

        if (this._templateCache && value) {
          delete this._templateCache[value];
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
};
