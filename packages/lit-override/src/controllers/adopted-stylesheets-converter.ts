import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';

export interface AdoptedStyleSheetsConverterParams {
  clearStyles?: boolean;
  templateEl?: HTMLTemplateElement | null;
}

/**
 * AdoptedStyleSheetsConverter
 *
 * Detects a `style` tag inside a `template` element from the light DOM, converts the styles,
 * and adds it to the component's `adoptedStyleSheets`.
 *
 * @param clearStyles replace or preserve original styles. Defaults to `false`.
 * @param templateEl a `template` element. Defaults to null.
 */
export class AdoptedStyleSheetsConverter implements ReactiveController {
  host: ReactiveControllerHost;

  clearStyles: AdoptedStyleSheetsConverterParams['clearStyles'];

  templateEl: AdoptedStyleSheetsConverterParams['templateEl'];

  _shadowRoot: ShadowRoot;

  constructor(
    host: ReactiveControllerHost,
    { clearStyles = false, templateEl = null }: AdoptedStyleSheetsConverterParams = {},
  ) {
    this.host = host;
    this.clearStyles = clearStyles;
    this.templateEl = templateEl;
    this._shadowRoot = (this.host as LitElement).renderRoot as ShadowRoot;

    this.host.addController(this);
  }

  hostConnected() {
    this.updateStylesheet();
  }

  hostUpdated() {
    // clean up style tags if template is injected in component root
    // by the templateContentWithFallback directive
    this.removeComponentStyleTag();
  }

  private updateStylesheet() {
    if (!this.templateEl) {
      return;
    }

    const styleElement = this.templateEl.content.querySelector('style');
    if (!styleElement) {
      return;
    }

    this.setAdoptedStyleSheets(styleElement);
  }

  private setAdoptedStyleSheets(styleElement: HTMLStyleElement) {
    const styleContent = styleElement.textContent || '';
    const newStyleSheet = new CSSStyleSheet();
    newStyleSheet.replaceSync(styleContent);

    this._shadowRoot.adoptedStyleSheets = this.clearStyles
      ? [newStyleSheet]
      : [...this._shadowRoot.adoptedStyleSheets, newStyleSheet];
  }

  private removeComponentStyleTag() {
    const styleElement = this._shadowRoot.querySelector('style');
    if (!styleElement) {
      return;
    }

    this._shadowRoot.removeChild(styleElement);
  }
}
