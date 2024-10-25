import type { TemplateIdProperty } from './types.js';

export class TemplateCacheManager {
  private cache: Record<string, TemplateIdProperty['templateIdGetter']> = {};

  getTemplate(id: string): TemplateIdProperty['templateIdGetter'] {
    return this.cache[id] || null;
  }

  cacheTemplate(id: TemplateIdProperty['templateIdSetter'], template: HTMLTemplateElement) {
    this.cache[id] = template;
  }

  removeTemplate(id: string) {
    delete this.cache[id];
  }

  clearTemplateCache() {
    this.cache = {};
  }
}
