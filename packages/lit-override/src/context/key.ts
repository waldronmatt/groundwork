import { createContext } from '@lit/context';
import { CSSResult, TemplateResult } from 'lit';

export interface LitOverrideContextProps {
  styles: CSSResult;
  clearStyles: boolean;
  markup: () => TemplateResult;
}

const contextKey = Symbol('lit-override-context');

export const litOverrideContext = createContext<Partial<LitOverrideContextProps>>(contextKey);
