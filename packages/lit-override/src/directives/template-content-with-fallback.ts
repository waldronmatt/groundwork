import { Directive, PartInfo, PartType, directive } from 'lit/directive.js';
import { templateContent } from 'lit/directives/template-content.js';
import { ChildPart, html, TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';

export interface TemplateContentWithFallbackParams {
  fallback?: TemplateResult;
  id?: string;
}

class TemplateContentWithFallbackDirective extends Directive {
  private _template: HTMLTemplateElement | null = null;

  constructor(partInfo: PartInfo) {
    super(partInfo);

    if (partInfo.type !== PartType.CHILD) {
      throw new Error('templateContentWithFallback can only be used in child bindings.');
    }
  }

  private getTemplateElement(id: string): HTMLTemplateElement | null {
    return document.querySelector(`template${id ? '#' + id : ''}`) || document.querySelector('template');
  }

  // @ts-expect-error - ignore typing error
  override update(part: ChildPart, [params]: [TemplateContentWithFallbackParams?] = []) {
    const { fallback = html`<slot></slot>`, id = '' } = params || {};
    this._template = this.getTemplateElement(id);
    return this.render(fallback);
  }

  render(fallback: TemplateResult) {
    return when(
      this._template,
      () => templateContent(this._template!),
      () => fallback,
    );
  }
}

/**
 * TemplateContentWithFallbackDirective
 *
 * Detects a `template` element from the light DOM and renders it.
 * Will fallback to your component's markup provided as an argument.
 *
 *
 * @param fallback renders markup if a `template` element is not found. Defaults to `<slot></slot>`.
 * @param id unique identifier that points to the id of a `template` element. Defaults to empty string.
 */
// @ts-expect-error - ignore typing error
export const templateContentWithFallback = directive(TemplateContentWithFallbackDirective);
export type { TemplateContentWithFallbackDirective };
