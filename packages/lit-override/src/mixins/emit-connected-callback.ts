import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export interface EmitConnectedCallbackInfo {
  name: string;
  isConnected: boolean;
}

export declare class EmitConnectedCallbackProps {
  emitConnectedCallback: boolean;
}

/**
 * LitOverrideMixin
 *
 * Enables your component to emit `connected-callback` if `emitConnectedCallback` prop is set.
 * Alternatively, use `onConnectedCallback` if performance is a concern.
 *
 * @fires connected-callback when `emitConnectedCallback` is `true`.
 * @property {boolean} emitConnectedCallback - Set prop to use `connected-callback` event. Defaults to `false`.
 * @property {function} onConnectedCallback - A callback function called when connected to the DOM.
 */
export const EmitConnectedCallback = <T extends Constructor<LitElement>>(superClass: T) => {
  class EmitConnectedCallbackMixin extends superClass {
    @property({ reflect: true, type: Boolean })
    emitConnectedCallback = false;

    @property({ reflect: false })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onConnectedCallback = (_thisChild: LitElement, _childInfo: EmitConnectedCallbackInfo) => {};

    connectedCallback() {
      super.connectedCallback();

      const childInfo: EmitConnectedCallbackInfo = {
        name: this.constructor.name,
        isConnected: this.isConnected,
      };

      this.onConnectedCallback(this, childInfo);

      if (this.emitConnectedCallback) {
        const event = new CustomEvent('connected-callback', {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: { ...childInfo },
        });

        this.dispatchEvent(event);
      }
    }
  }

  return EmitConnectedCallbackMixin as Constructor<EmitConnectedCallbackProps> & T;
};
