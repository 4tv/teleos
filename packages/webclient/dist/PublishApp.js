"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishApp = void 0;
const WebClient_1 = require("./WebClient");
const enum_1 = require("./enum");
/**
 *
 * The PublishApp class extends WebClient and is specifically tailored
 * for handling operations related to the publishing functionality.
 *
 */
class PublishApp extends WebClient_1.WebClient {
    constructor(settings) {
        super(settings);
        /** @inheritdoc */
        this.init = (options) => {
            super.init(options, enum_1.ClientMode.Publish);
            // Register the event handlers
            this.handleIncomingMessages(({ body, message }) => {
                switch (message) {
                    case enum_1.HostMessage.ReadyReceived:
                        return this.handlers.readyReceived(body);
                    case enum_1.HostMessage.PublishEntrySuccess:
                        return this.handlers.handleSuccess(body);
                    case enum_1.HostMessage.PublishEntryFailed:
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
     * Initiates the process to publish an application based on the provided payload.
     */
    async publish(payload) {
        // Initiate the monitoring of the action. This can be useful in scenarios where
        // the action needs to be cancelled midway due to some condition.
        this.startAction();
        // Send a 'Publish' message to the client with the given payload.
        // Navigation is prevented by default. However, this behavior
        // can be overridden by the payload provided to the method.
        this.postMessage(enum_1.ClientMessage.Publish, {
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
exports.PublishApp = PublishApp;
//# sourceMappingURL=PublishApp.js.map