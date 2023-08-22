export { verifyReviseToken };

import { ReviseToken, VerifyTokenOptions } from './types';
import { getReviseToken, verifyDryWrapper } from './utils';

/**
 * Verifies the Revise Token and returns the payload.
 */
function verifyReviseToken(
  token: string,
  options?: VerifyTokenOptions
): ReviseToken {
  return verifyDryWrapper(token, getReviseToken, options);
}
