export { verifyDryWrapper, getReviseToken, getPublishToken, invariant, getSplittedJwt, };
import { ReviseToken, VerifyTokenOptions } from './types';
/**
 * The function is a utility that throws an error when the provided
 * condition is not met. This is typically used for assertion checks
 * where you want to ensure that some condition always holds true.
 * If the condition does not hold true, an Error will be thrown
 * with the provided error message.
 *
 * @param condition {unknown} - The condition to be checked.
 * @param errorMessage? {string} - Optional custom error message.
 *
 * @throws {Error} Throws an Error message 'Assertion Failed: {cause}'.
 * @example
 * ```javascript
 * invariant(someVariable !== null, 'someVariable should not be null');
 * ```
 */
declare function invariant(condition: unknown, errorMessage?: string): asserts condition;
/**
 * Returns the publish token payload.
 */
declare function getPublishToken(data: unknown): {
    appId: string;
    clientId: string;
    createdAt: number;
    expirationAt: number;
    isExpired: boolean;
};
/**
 * Returns the revise token payload.
 */
declare function getReviseToken(data: unknown): ReviseToken;
/** Split JWT into 3 parts, header, payload and signature */
declare const getSplittedJwt: (testJwt: string) => {
    header: string;
    body: string;
    signature: string;
};
/**
 * This function is a wrapper for
 * verifyPublishToken and verifyReviseToken functions.
 * It is used to avoid code duplication.
 *
 * @param {string} token - The JWT token string that needs to be verified.
 * @param {function} getTokenPayload - A function that takes the unknown payload
 * and returns a payload object with type T.
 *
 * @param {VerifyTokenOptions} [options] - Optional configuration
 * options for token verification.
 *
 * @returns {T} A payload object of type T, isExpired always present.
 */
declare function verifyDryWrapper<T extends {
    isExpired: boolean;
}>(token: string, getTokenPayload: (token: unknown) => T, options?: VerifyTokenOptions): T;
