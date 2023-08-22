export { PublishApp };
import { WebClient } from './WebClient';
import { PublishEventHandlers, PublishQueryPayload, ReadyOptions, Settings, SuccessfulResponse } from './types';
/**
 *
 * The PublishApp class extends WebClient and is specifically tailored
 * for handling operations related to the publishing functionality.
 *
 */
declare class PublishApp extends WebClient {
    constructor(settings: Settings);
    /** @inheritdoc */
    init: (options?: ReadyOptions) => {
        onReady: (handler: PublishEventHandlers['readyReceived']) => this;
    };
    /** @inheritdoc */
    complete(): void;
    /** @inheritdoc */
    onReady(handler: PublishEventHandlers['readyReceived']): this;
    /**
     * Initiates the process to publish an application based on the provided payload.
     */
    publish(payload: PublishQueryPayload): Promise<SuccessfulResponse>;
}
