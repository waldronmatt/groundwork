import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';

interface AdoptedStyleSheetsConverterParams {
  clearStyles?: boolean;
  id?: string;
}

/**
 * AdoptedStyleSheetsConverter
 *
 * Detects a `style` tag inside a `template` element from the light DOM, converts the styles,
 * and adds it to the component's `adoptedStyleSheets`.
 *
 * @param clearStyles replace or preserve original styles. Defaults to `false`.
 * @param id unique identifier that points to the id of a `template` element. Defaults to empty string.
 */
export class AdoptedStyleSheetsConverter implements ReactiveController {
  host: ReactiveControllerHost;

  private _template: HTMLTemplateElement | null = null;

  clearStyles: boolean;

  id: string;

  constructor(host: ReactiveControllerHost, { clearStyles = false, id = '' }: AdoptedStyleSheetsConverterParams = {}) {
    this.host = host;
    this.clearStyles = clearStyles;
    this.id = id;
    this.host.addController(this);
  }

  hostConnected() {
    this._template = this.getTemplateElement();
    this.updateStylesheet();
  }

  hostUpdated() {
    // clean up style tags if template is injected in component root
    // by the templateContentWithFallback directive
    this.removeComponentStyleTag();
  }

  private getTemplateElement(): HTMLTemplateElement | null {
    return document.querySelector(`template${this.id ? '#' + this.id : ''}`) || document.querySelector('template');
  }

  private removeComponentStyleTag() {
    const shadowRoot = (this.host as LitElement).renderRoot;
    const styleElement = shadowRoot.querySelector('style');
    if (!styleElement) {
      return;
    }

    shadowRoot.removeChild(styleElement);
  }

  private handleAdoptedStyleSheets(styleElement: HTMLStyleElement) {
    const litElement = this.host as LitElement;
    const shadowRoot = litElement.renderRoot as ShadowRoot;
    const styleContent = styleElement.textContent || '';

    const newStyleSheet = new CSSStyleSheet();
    newStyleSheet.replaceSync(styleContent);

    shadowRoot.adoptedStyleSheets = this.clearStyles
      ? [newStyleSheet]
      : [...shadowRoot.adoptedStyleSheets, newStyleSheet];
  }

  private updateStylesheet() {
    if (!this._template) {
      return;
    }

    const styleElement = this._template.content.querySelector('style');
    if (!styleElement) {
      return;
    }

    this.handleAdoptedStyleSheets(styleElement);
  }
}
