import { property } from 'lit/decorators.js';
import { ReactiveElement } from 'lit';

export interface TemplateIdProperty {
  get templateIdGetter(): HTMLTemplateElement | null;
  set templateIdSetter(value: string | null);
}

export interface ExtendedElement extends ReactiveElement {
  _templateCache?: Record<string, TemplateIdProperty['templateIdGetter']>;
  [key: symbol]: TemplateIdProperty['templateIdSetter'];
}

export interface QueryTemplateByIdParams {
  cache?: boolean;
  fallback?: boolean;
}

/**
 * queryTemplateById
 *
 * Gets a template element by id that is provided to the `templateId` property.
 * Will cache the template element on successful query.
 *
 * @param cache caches the template element between component renders when enabled. Defaults to `true`.
 * @param fallback gets a template element if an id is not provided (not cached). Defaults to `false`.
 */
export const queryTemplateById = ({ cache = true, fallback = false }: QueryTemplateByIdParams = {}) => {
  return <T extends ReactiveElement>(proto: T, propName: string) => {
    // this is a 'wrapper' around a custom property accessor: https://lit.dev/docs/components/properties/#accessors
    const internalKey = Symbol(`_${String(propName)}`);

    property({ reflect: true, type: String })(proto, propName);

    Object.defineProperty(proto, 'templateId', {
      get(this: ExtendedElement): TemplateIdProperty['templateIdGetter'] {
        const id = this[internalKey];

        if (!this._templateCache) {
          this._templateCache = {};
        }

        if (id && this._templateCache[id] && cache) {
          return this._templateCache[id];
        }

        if (typeof id === 'string' && id) {
          const templateElement = document.querySelector(`template#${id}`) as HTMLTemplateElement | null;
          if (!templateElement) {
            console.error(`Template id ${id} could not be found`);
            return null;
          }

          if (cache) {
            this._templateCache[id] = templateElement;
          }
          return templateElement;
        }

        return fallback ? document.querySelector('template') : null;
      },
      set(this: ExtendedElement, value: TemplateIdProperty['templateIdSetter']) {
        const oldValue = this[internalKey];
        this[internalKey] = value;

        if (this._templateCache && oldValue && cache) {
          delete this._templateCache[oldValue];
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
};
