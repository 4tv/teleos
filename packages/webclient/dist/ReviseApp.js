"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviseApp = void 0;
const WebClient_1 = require("./WebClient");
const enum_1 = require("./enum");
/**
 * Class ReviseApp is an extension of the WebClient class,
 * specifically designed for revising content.
 * This class inherits the functionalities of the WebClient,
 * and further adds additional methods relevant for the revision process.
 *
 * @param settings {Settings} - Contains settings for the WebClient
 */
class ReviseApp extends WebClient_1.WebClient {
    constructor(settings) {
        super(settings);
        /** @inheritdoc */
        this.init = (options) => {
            super.init(options, enum_1.ClientMode.Revise);
            this.handleIncomingMessages(({ body, message }) => {
                switch (message) {
                    case enum_1.HostMessage.ReadyReceived:
                        return this.handlers.readyReceived(body);
                    case enum_1.HostMessage.ReviseEntrySuccess:
                        return this.handlers.handleSuccess(body);
                    case enum_1.HostMessage.ReviseEntryFailed:
                        return this.handlers.handleFailure(body);
                }
            });
            return {
                onReady: this.onReady.bind(this),
            };
        };
    }
    /** @inheritdoc */
    complete() {
        super.complete();
    }
    /** @inheritdoc */
    onReady(handler) {
        super.onReady(handler);
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
    async revise(payload) {
        this.startAction();
        this.postMessage(enum_1.ClientMessage.Revise, payload);
        return new Promise((resolve, reject) => {
            const rejectHandler = this.rejectHandler(reject);
            this.handleTimeoutRejection(rejectHandler);
            this.handlers.handleSuccess = resolve;
            this.handlers.handleFailure = reject;
        });
    }
}
exports.ReviseApp = ReviseApp;
//# sourceMappingURL=ReviseApp.js.map