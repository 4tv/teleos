export { verifyReviseToken };
import { ReviseToken, VerifyTokenOptions } from './types';
/**
 * Verifies the Revise Token and returns the payload.
 */
declare function verifyReviseToken(token: string, options?: VerifyTokenOptions): ReviseToken;
