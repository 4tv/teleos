export { WebClient };

import { ClientMessage, HostMessage } from './enum';
import { ClientMode, WebClientReadonlyProperty } from './enum';

import { EventHandlers, ReadyOptions, Settings } from './types';

abstract class WebClient {
  protected actionStartedAt: number | null = null;

  // Prevents the application from being initialized more than once.
  protected initialized = false;

  private readonly properties = {
    baseOrigin: WebClientReadonlyProperty.BaseOrigin,
    hostSource: WebClientReadonlyProperty.HostSource,
    clientSource: WebClientReadonlyProperty.ClientSource,
  };

  protected handlers: EventHandlers = {
    readyReceived: () => {},
    handleSuccess: () => {},
    handleFailure: () => {},
  };

  public abortActionTimeoutMs = 10000;

  constructor(private readonly settings: Settings) {
    if (typeof window === 'undefined') {
      throw new Error('Must be run in browser');
    }
    // helps to create chains like: (new webClient).revise(payload)
    return this;
  }

  /**
   * The method sends a message to the host to display a loading indicator.
   * This is typically used when an operation that might take some time is in progress
   *
   * @example
   * this.showLoading(); // Calls the method to show loading state on the client side.
   *
   * @remarks
   * Be sure to handle the hiding of loading state appropriately,
   * a long absence of a call `hideLoading` leads to close the application.
   */
  public showLoading() {
    this.postMessage(ClientMessage.ShowLoading);
  }

  /** The method sends a message to the host to hide the loading indicator. */
  public hideLoading() {
    this.postMessage(ClientMessage.HideLoading);
  }

  /**
   * Sends an error message to the client.
   * This method is generally invoked when an unexpected error occurs on the client side.
   * @param {string} [message] - An optional error message that provides additional
   * details about the error.
   *
   * @example
   * this.closeWithError("An unexpected error occurred"); // Sends an error message to the client.
   *
   * @remarks
   * Ensure that your client-side code is designed to handle error messages appropriately,
   * such as displaying them to the user or logging them for debugging purposes.
   */
  public closeWithError(message?: string) {
    this.postMessage(ClientMessage.ClientError, { message });
  }

  /**
   * Retrieves the current mode: revise, publish or undefined.
   * It specifically looks for a `mode` parameter in the current URL.
   * If no `mode` parameter is found or if it is not recognized, the method returns `undefined`.
   *
   * This method is typically used to adjust the behavior
   * of the client app depending on the mode in which it is running.
   */
  public static getMode(): ClientMode | undefined {
    const urlParams = new URLSearchParams(window.location.search);

    switch (urlParams.get('mode')) {
      case 'revise':
        return ClientMode.Revise;

      case 'publish':
        return ClientMode.Publish;

      default:
        return;
    }
  }

  /**
   * Method `complete` communicates to the host that the client interaction
   * has successfully completed.
   * It uses the `postMessage` method with the `ClientMessage.Complete` const
   * to indicate the successful completion of the interaction.
   * After this message is sent, the host should close the connection.
   *
   * @remarks
   * Ensure that this method is only called when the client is in a state where
   * it is safe to close the connection.
   * This method is optional after publishing or revising the application,
   * the host automatically closes the connection.
   */
  protected complete() {
    this.postMessage(ClientMessage.Complete);
  }

  protected rejectHandler(reject: () => void) {
    return () => {
      this.actionStartedAt = null;
      reject();
    };
  }

  /**
   * Called when the application is ready to accept user interaction.
   */
  protected sendReady(options?: ReadyOptions) {
    this.postMessage(ClientMessage.AppReady, {
      height: document.body.scrollHeight,
      ...options,
    });
    this.debug('Host notified that the application is ready');
  }

  /**
   * Tracks the start of an action fromEventHandlers options,
   * throws an error if another action is already in progress.
   */
  protected startAction() {
    if (this.actionStartedAt) {
      throw new Error('Another action in progress');
    }
    this.actionStartedAt = Date.now();
  }

  /**
   * The method is responsible for initializing the application for use,
   * typically called when the application is ready to accept user interaction.
   *
   * The loading animation will be shown on the host side
   * until this method is called.
   */
  protected init(options?: ReadyOptions, mode = WebClient.getMode()): void {
    if (this.initialized) {
      throw new Error('App already initialized');
    }

    if (WebClient.getMode() !== mode) {
      throw new Error(`The class can only be used in ${mode} mode`);
    }

    this.sendReady(options);

    this.initialized = true;
  }

  /**
   * Register an event handler that is triggered when a "ready"
   * signal is received by the host application.
   */
  protected onReady(handler: (typeof this.handlers)['readyReceived']): this {
    if (!this.initialized) {
      this.init();
    }

    this.handlers.readyReceived = handler;
    return this;
  }

  /**
   * Handles incoming messages from the host window.
   *
   * It filters messages based on the message source, origin, application ID, and message type, only processing those that pass these checks.
   * Once a valid message is received, it is passed to a callback function for further processing.
   *
   * If a message does not pass the checks, it is logged as a non-valid message with debug level log.
   *
   * @param {Function} cb - A callback function to handle valid messages. The callback receives an object with the following properties:
   *  - `body`: The body of the message.
   *  - `message`: The message itself.
   *  - `meta`: Any metadata included in the message.
   *
   * @example
   * this.handleIncomingMessages(data => {
   *  // Insert processing logic here.
   * });
   *
   */
  protected handleIncomingMessages(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cb: (data: { body: any; message: any; meta: any }) => void
  ): void {
    // @TODO: validate incoming messages properly, zod?
    window.addEventListener('message', (event) => {
      if (
        !(
          event.origin === this.settings.targetOrigin &&
          event.data &&
          event.data.source === this.properties.hostSource &&
          event.data.appId === this.settings.appId &&
          typeof event.data.message === 'string'
        )
      ) {
        this.debug('Received message not valid', {
          message: JSON.stringify(event.data),
        });
        return;
      }

      this.debug('Received host message', {
        payload: JSON.stringify(event.data),
      });

      if (event.data.message === HostMessage.Info) {
        return this.debug(
          event.data.message,
          event.data.body.meta ? { ...event.data.body.meta } : undefined
        );
      }

      cb({
        body: event.data.body,
        message: event.data.message,
        meta: event.data?.body?.meta,
      });
    });
  }

  /**
   * Handles the rejection of a promise when the timeout is reached.
   */
  protected handleTimeoutRejection(reject: (reason?: string) => void): void {
    const rejectIntv = setInterval(() => {
      if (!this.actionStartedAt) {
        clearInterval(rejectIntv);
        return;
      }

      if (Date.now() > this.actionStartedAt + this.abortActionTimeoutMs) {
        clearInterval(rejectIntv);
        reject('Operation timeout');
      }
    }, 1000);
  }

  /**  Posts a message to the host window. */
  protected postMessage<T>(name: ClientMessage, body?: T): void {
    window?.top?.postMessage(
      {
        name,
        body,
        source: this.properties.clientSource,
        fingerprints: {
          appId: this.settings.appId,
          token: this.settings.token,
        },
      },
      this.settings.targetOrigin || this.properties.baseOrigin
    );
  }

  private debug(message: string, meta?: { [key: string]: string }): void {
    this.settings?.debug?.(message, meta);
  }
}
