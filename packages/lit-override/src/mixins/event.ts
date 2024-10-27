import { EmitConnectedCallbackInfo } from './types.js';

export class ConnectedCallbackEvent extends CustomEvent<EmitConnectedCallbackInfo> {
  constructor(childInfo: EmitConnectedCallbackInfo) {
    super('connected-callback', {
      bubbles: true,
      composed: true,
      detail: { ...childInfo },
    });
  }
}
