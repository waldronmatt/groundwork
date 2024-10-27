import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ConnectedCallbackEvent } from './event.js';
import { EmitConnectedCallbackInfo } from './types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T;

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
    get childInfo(): EmitConnectedCallbackInfo {
      return {
        name: this.constructor.name,
        isConnected: this.isConnected,
      };
    }

    @property({ reflect: true, type: Boolean })
    emitConnectedCallback = false;

    @property({ attribute: false })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onConnectedCallback? = (_thisChild: LitElement, _childInfo: EmitConnectedCallbackInfo) => {};

    connectedCallback() {
      super.connectedCallback();

      if (this.onConnectedCallback) {
        this.onConnectedCallback(this, this.childInfo);
      }

      if (this.emitConnectedCallback) {
        this.dispatchEvent(new ConnectedCallbackEvent(this.childInfo));
      }
    }
  }

  return EmitConnectedCallbackMixin as Constructor<EmitConnectedCallbackProps> & T;
};
