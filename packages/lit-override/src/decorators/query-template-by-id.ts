import { property } from 'lit/decorators.js';
import { ReactiveElement } from 'lit';
import { TemplateCacheManager } from './cache.js';
import type { TemplateIdProperty } from './types.js';

const templateCacheManager = new TemplateCacheManager();

export interface ExtendedElement extends ReactiveElement {
  cache?: Record<string, TemplateIdProperty['templateIdGetter']>;
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
 *
 * @param cache caches the template element between component renders when enabled. Defaults to `true`.
 * @param fallback gets a template element if an id is not provided (not cached). Defaults to `false`.
 */
export const queryTemplateById = ({ cache = true, fallback = false }: QueryTemplateByIdParams = {}) => {
  return <T extends ReactiveElement>(proto: T, propName: string) => {
    const ctor = proto.constructor as typeof ReactiveElement;

    ctor.addInitializer((element: ReactiveElement) => {
      const controller = {
        hostDisconnected() {
          if (cache) {
            // we should clear cache when element is disconnected from the DOM
            templateCacheManager.clearTemplateCache();
          }
        },
      };

      element.addController(controller);
    });

    const internalKey = Symbol(`_${String(propName)}`);

    // supports reactivity and attribute reflection for our custom setter/getter
    property({ reflect: true, type: String })(proto, propName);

    Object.defineProperty(proto, 'templateId', {
      // this is a 'wrapper' around a custom property accessor
      // https://lit.dev/docs/components/properties/#accessors-custom
      get(this: ExtendedElement): TemplateIdProperty['templateIdGetter'] {
        const id = this[internalKey];

        if (id && cache) {
          const cachedTemplate = templateCacheManager.getTemplate(id);
          if (cachedTemplate) {
            return cachedTemplate;
          }
        }

        if (typeof id === 'string' && id) {
          const templateElement = document.querySelector(`template#${id}`) as HTMLTemplateElement | null;
          if (!templateElement) {
            console.error(`Template id ${id} could not be found`);
            return null;
          }

          if (cache) {
            templateCacheManager.cacheTemplate(id, templateElement);
          }
          return templateElement;
        }

        return fallback ? document.querySelector('template') : null;
      },
      set(this: ExtendedElement, value: TemplateIdProperty['templateIdSetter']) {
        const oldValue = this[internalKey];
        this[internalKey] = value;

        if (oldValue && cache) {
          templateCacheManager.removeTemplate(oldValue);
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
};
