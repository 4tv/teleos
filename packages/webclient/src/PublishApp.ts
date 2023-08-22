export { PublishApp };

import { WebClient } from './WebClient';
import { ClientMessage, ClientMode, HostMessage } from './enum';
import {
  PublishEventHandlers,
  PublishQueryPayload,
  ReadyOptions,
  Settings,
  SuccessfulResponse,
} from './types';

/**
 *
 * The PublishApp class extends WebClient and is specifically tailored
 * for handling operations related to the publishing functionality.
 *
 */
class PublishApp extends WebClient {
  constructor(settings: Settings) {
    super(settings);
  }

  /** @inheritdoc */
  public init = (options?: ReadyOptions) => {
    super.init(options, ClientMode.Publish);

    // Register the event handlers
    this.handleIncomingMessages(({ body, message }) => {
      switch (message) {
        case HostMessage.ReadyReceived:
          return this.handlers.readyReceived(body);
        case HostMessage.PublishEntrySuccess:
          return this.handlers.handleSuccess(body);
        case HostMessage.PublishEntryFailed:
          return this.handlers.handleFailure(body);
      }
    });
    return {
      onReady: this.onReady.bind(this),
    };
  };

  /** @inheritdoc */
  public complete() {
    super.complete();
  }

  /** @inheritdoc */
  public onReady(handler: PublishEventHandlers['readyReceived']): this {
    super.onReady(handler);
    return this;
  }

  /**
   * Initiates the process to publish an application based on the provided payload.
   */
  public async publish(
    payload: PublishQueryPayload
  ): Promise<SuccessfulResponse> {
    // Initiate the monitoring of the action. This can be useful in scenarios where
    // the action needs to be cancelled midway due to some condition.
    this.startAction();
    // Send a 'Publish' message to the client with the given payload.
    // Navigation is prevented by default. However, this behavior
    // can be overridden by the payload provided to the method.
    this.postMessage(ClientMessage.Publish, {
      preventNavigation: true,
      ...payload,
    });

    // Return a new Promise that either resolves to a SuccessfulResponse upon successful
    // publishing, or gets rejected in case of any error during the publish action.
    return new Promise((resolve, reject) => {
      const rejectHandler = this.rejectHandler(reject);
      this.handleTimeoutRejection(rejectHandler);
      this.handlers.handleSuccess = resolve;
      this.handlers.handleFailure = reject;
    });
  }
}
