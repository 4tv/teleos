export { verifyPublishToken };
import { PublishToken, VerifyTokenOptions } from './types';
/**
 * Verifies the Publish Token and returns the payload.
 */
declare function verifyPublishToken(token: string, options?: VerifyTokenOptions): PublishToken;
