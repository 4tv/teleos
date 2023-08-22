export { ReviseApp };

import { WebClient } from './WebClient';
import { ClientMessage, ClientMode, HostMessage } from './enum';
import {
  PublishQueryPayload,
  ReadyOptions,
  ReviseEventHandlers,
  Settings,
  SuccessfulResponse,
} from './types';

/**
 * Class ReviseApp is an extension of the WebClient class,
 * specifically designed for revising content.
 * This class inherits the functionalities of the WebClient,
 * and further adds additional methods relevant for the revision process.
 *
 * @param settings {Settings} - Contains settings for the WebClient
 */
class ReviseApp extends WebClient {
  constructor(settings: Settings) {
    super(settings);
  }

  /** @inheritdoc */
  public init = (options?: ReadyOptions) => {
    super.init(options, ClientMode.Revise);

    this.handleIncomingMessages(({ body, message }) => {
      switch (message) {
        case HostMessage.ReadyReceived:
          return this.handlers.readyReceived(body);
        case HostMessage.ReviseEntrySuccess:
          return this.handlers.handleSuccess(body);
        case HostMessage.ReviseEntryFailed:
          return this.handlers.handleFailure(body);
      }
    });
    return {
      onReady: this.onReady,
    };
  };

  /** @inheritdoc */
  public complete() {
    super.complete();
  }

  /** @inheritdoc */
  public onReady(handler: ReviseEventHandlers['readyReceived']): this {
    this.handlers.readyReceived = handler;
    return this;
  }

  /**
   * Updates an existing entry.
   * @example
   * ```js
   * reviseApp.revise({
   *    url: string;
   *    preventNavigation: true;
   *    reloadIntervalSec: 60;
   *    injectCSS:'body{background:red}';
   *    injectJS:  alert('Hello world');
   * })
   * ```
   * @returns {Point} The response object contains App ID, Client ID, Entry ID, URL,
   * and JSON Web Token to verify the authenticity of the response.
   */
  public async revise(
    payload: PublishQueryPayload
  ): Promise<SuccessfulResponse> {
    this.startAction();
    this.postMessage(ClientMessage.Revise, payload);
    return new Promise((resolve, reject) => {
      const rejectHandler = this.rejectHandler(reject);
      this.handleTimeoutRejection(rejectHandler);
      this.handlers.handleSuccess = resolve;
      this.handlers.handleFailure = reject;
    });
  }
}
