export { verifyPublishToken };

import { PublishToken, VerifyTokenOptions } from './types';
import { getPublishToken, verifyDryWrapper } from './utils';

/**
 * Verifies the Publish Token and returns the payload.
 */
function verifyPublishToken(
  token: string,
  options?: VerifyTokenOptions
): PublishToken {
  return verifyDryWrapper(token, getPublishToken, options);
}
