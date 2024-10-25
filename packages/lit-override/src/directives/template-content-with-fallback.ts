import { Directive, PartInfo, PartType, directive } from 'lit/directive.js';
import { templateContent } from 'lit/directives/template-content.js';
import { html, TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';

export interface TemplateContentWithFallbackParams {
  fallback?: TemplateResult;
  templateEl?: HTMLTemplateElement | null;
}

class TemplateContentWithFallbackDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);

    if (partInfo.type !== PartType.CHILD) {
      throw new Error('templateContentWithFallback can only be used in child bindings.');
    }
  }

  render({ fallback = html`<slot></slot>`, templateEl = null }: TemplateContentWithFallbackParams = {}) {
    return when(
      templateEl,
      () => templateContent(templateEl!),
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
 * @param fallback renders markup if a `template` element is not found. Defaults to `<slot></slot>`.
 * @param templateEl a `template` element. Defaults to null.
 */
export const templateContentWithFallback = directive(TemplateContentWithFallbackDirective);
export type { TemplateContentWithFallbackDirective };
