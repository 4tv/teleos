export { ReviseApp };
import { WebClient } from './WebClient';
import { PublishQueryPayload, ReadyOptions, ReviseEventHandlers, Settings, SuccessfulResponse } from './types';
/**
 * Class ReviseApp is an extension of the WebClient class,
 * specifically designed for revising content.
 * This class inherits the functionalities of the WebClient,
 * and further adds additional methods relevant for the revision process.
 *
 * @param settings {Settings} - Contains settings for the WebClient
 */
declare class ReviseApp extends WebClient {
    constructor(settings: Settings);
    /** @inheritdoc */
    init: (options?: ReadyOptions) => {
        onReady: (handler: ReviseEventHandlers['readyReceived']) => this;
    };
    /** @inheritdoc */
    complete(): void;
    /** @inheritdoc */
    onReady(handler: ReviseEventHandlers['readyReceived']): this;
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
    revise(payload: PublishQueryPayload): Promise<SuccessfulResponse>;
}
