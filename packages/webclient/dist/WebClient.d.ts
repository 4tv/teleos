export { WebClient };
import { ClientMessage } from './enum';
import { ClientMode } from './enum';
import { EventHandlers, ReadyOptions, Settings } from './types';
declare abstract class WebClient {
    private readonly settings;
    protected actionStartedAt: number | null;
    protected initialized: boolean;
    private readonly properties;
    protected handlers: EventHandlers;
    abortActionTimeoutMs: number;
    constructor(settings: Settings);
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
    showLoading(): void;
    /** The method sends a message to the host to hide the loading indicator. */
    hideLoading(): void;
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
    closeWithError(message?: string): void;
    /**
     * Retrieves the current mode: revise, publish or undefined.
     * It specifically looks for a `mode` parameter in the current URL.
     * If no `mode` parameter is found or if it is not recognized, the method returns `undefined`.
     *
     * This method is typically used to adjust the behavior
     * of the client app depending on the mode in which it is running.
     */
    getMode(): ClientMode | undefined;
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
    protected complete(): void;
    protected rejectHandler(reject: () => void): () => void;
    /**
     * Called when the application is ready to accept user interaction.
     */
    protected sendReady(options?: ReadyOptions): void;
    /**
     * Tracks the start of an action fromEventHandlers options,
     * throws an error if another action is already in progress.
     */
    protected startAction(): void;
    /**
     * The method is responsible for initializing the application for use,
     * typically called when the application is ready to accept user interaction.
     *
     * The loading animation will be shown on the host side
     * until this method is called.
     */
    protected init(options?: ReadyOptions, mode?: ClientMode | undefined): void;
    /**
     * Register an event handler that is triggered when a "ready"
     * signal is received by the host application.
     */
    protected onReady(handler: (typeof this.handlers)['readyReceived']): this;
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
    protected handleIncomingMessages(cb: (data: {
        body: any;
        message: any;
        meta: any;
    }) => void): void;
    /**
     * Handles the rejection of a promise when the timeout is reached.
     */
    protected handleTimeoutRejection(reject: (reason?: string) => void): void;
    /**  Posts a message to the host window. */
    protected postMessage<T>(name: ClientMessage, body?: T): void;
    private debug;
}
