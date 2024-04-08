import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export declare class EmitConnectedCallbackInterface {
  emitConnectedCallback: boolean;
}

/**
 * LitOverrideMixin
 *
 * Enables your component to emit `connected-callback` if `emitConnectedCallback` prop is set.
 *
 * @fires connected-callback when `emitConnectedCallback` is `true`
 * @property {boolean} emitConnectedCallback - Set prop to use `connected-callback` event. Defaults to `false`.
 */
export const EmitConnectedCallback = <T extends Constructor<LitElement>>(superClass: T) => {
  class EmitConnectedCallbackMixin extends superClass {
    @property({ reflect: true, type: Boolean })
    emitConnectedCallback = false;

    connectedCallback() {
      super.connectedCallback();

      if (this.emitConnectedCallback) {
        const detail = {
          isConnected: this.isConnected,
        };

        const event = new CustomEvent('connected-callback', {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: detail,
        });

        this.dispatchEvent(event);
      }
    }
  }

  return EmitConnectedCallbackMixin as Constructor<EmitConnectedCallbackInterface> & T;
};
