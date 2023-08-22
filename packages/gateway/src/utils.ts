/* eslint-disable @typescript-eslint/no-explicit-any */

export {
  verifyDryWrapper,
  getReviseToken,
  getPublishToken,
  invariant,
  getSplittedJwt,
};

import crypto from 'crypto';
import { Config, ErrorMessage } from './const';
import { ReviseToken, TokenPayload, VerifyTokenOptions } from './types';

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
function invariant(
  condition: unknown,
  errorMessage?: string
): asserts condition {
  if (!condition) {
    throw new Error(
      `${ErrorMessage.AssertionFailed}${
        errorMessage ? `: ${errorMessage}` : ''
      }`
    );
  }
}

/**
 * Extracts the payload from the given token object.
 * Validates the necessary fields and constructs a TokenPayload object.
 *
 * @param {any} token - The token object that contains the payload information.
 * @returns {TokenPayload} An object containing essential token attributes.
 * @throws Will throw an error if the token is not an object
 * or if any essential attributes are missing or of incorrect type.
 */
function getTokenPayload(token: any): TokenPayload {
  // Check if the token is an object and not null
  // If not, an error message will be thrown
  invariant(
    typeof token === 'object' && token !== null,
    ErrorMessage.TokenIsNotObject
  );

  // Gets the token payload
  const { aid, cid, iat, exp, iss } = token;

  // Checking for the validity of the required fields
  // These checks ensure that the essential attributes
  // of the token are present and of the correct type
  invariant(aid && typeof aid === 'string', 'aid is missing');
  invariant(cid && typeof cid === 'string', 'cid is missing');
  invariant(exp && typeof exp === 'number', 'exp is missing');
  invariant(iat && typeof iat === 'number', 'iat is missing');

  // Optionally, retrieve eid (Entity ID)
  // and url if they are present and of type string
  // If not, they will be set to undefined
  const eid = typeof token.eid === 'string' ? token.eid : undefined;
  const url = typeof token.url === 'string' ? token.url : undefined;

  return { aid, cid, iat, exp, iss, eid, url };
}

/**
 * Checks validity of JWT signature.
 */
function getIsSignatureValid(jwt: {
  header: string;
  payload: string;
  signature: string;
  key: string;
}): boolean {
  const verifyObj = crypto.createVerify('RSA-SHA256');

  verifyObj.write(`${jwt.header}.${jwt.payload}`);
  verifyObj.end();

  return verifyObj.verify(jwt.key, jwt.signature, 'base64');
}

/**
 * Parses a stringified JSON object.
 */
const parseString = (payload: string): unknown => {
  return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
};

/**
 * Checks if JWT payload is valid
 */
const getIsPayloadValid = (payload: any): boolean => {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }
  if (!(payload.iat && typeof payload.iat === 'number')) {
    return false;
  }
  if (!(payload.iss && typeof payload.iss === 'string')) {
    return false;
  }
  if (!(payload.exp && typeof payload.exp === 'number')) {
    return false;
  }

  return true;
};

/**
 * Verifies a JWT and returns the encoded payload if valid.
 *
 * @param {string} jwtToken - The JWT string that needs to be verified.
 *
 * @throws {Error} If the JWT is invalid, or if the signature
 * or payload are not valid.
 *
 * @returns {EncodedPayload} The encoded payload of the JWT
 * if all verifications are successful.
 */
function verifyJwtToken(jwtToken: string) {
  const splittedJWT = jwtToken.split('.');
  if (splittedJWT.length !== 3) {
    throw new Error(ErrorMessage.InvalidJwt);
  }

  const [header, payload, signature] = splittedJWT;

  // Gets validity of the signature
  const validSignature = getIsSignatureValid({
    header,
    payload,
    signature,
    key: Config.PublicKey,
  });

  // If the signature is invalid, an error will be thrown
  if (!validSignature) {
    throw new Error(ErrorMessage.InvalidJwtSignature);
  }

  const parsedString = parseString(payload);

  // If the payload does not contain the required JWT fields,
  // an error will be thrown
  if (!getIsPayloadValid(parsedString)) {
    throw new Error(ErrorMessage.InvalidJwtPayload);
  }

  return parsedString;
}

/**
 * Determines if a token has expired.
 *
 * This function checks whether the expiration time (`exp`)
 * of the given token has passed the current date and time.
 *
 * @param {TokenPayload} token - The payload of the token,
 * containing an `exp` field with the expiration time.
 *
 * @returns {boolean} Returns `true` if the token
 * has expired, otherwise `false`.
 */
function getIsExpired(token: TokenPayload): boolean {
  const now = Date.now();
  return token.exp * 1000 < now;
}

/**
 * Returns the publish token payload.
 */
function getPublishToken(data: unknown) {
  const token = getTokenPayload(data);
  const isExpired = getIsExpired(token);
  return {
    appId: token.aid,
    clientId: token.cid,
    createdAt: token.iat * 1000,
    expirationAt: token.exp * 1000,
    isExpired,
  };
}

/**
 * Returns the revise token payload.
 */
function getReviseToken(data: unknown): ReviseToken {
  const token = getTokenPayload(data);
  // Revise token mostly has the same structure as publish token
  // except for the entryId and url fields
  const publishToken = getPublishToken(data);
  invariant(token.eid, 'eid is missing');
  invariant(token.url, 'url is missing');

  return {
    ...publishToken,
    entryId: token.eid,
    url: token.url,
  };
}

/** Split JWT into 3 parts, header, payload and signature */
const getSplittedJwt = (testJwt: string) => {
  const splittedJwt = testJwt.match(/(.+)\.(.+)\.(.+)/);
  // If the JWT is invalid, an error will be thrown
  if (!(splittedJwt && splittedJwt.length === 4)) {
    throw new Error('Invalid JWT');
  }
  return {
    header: splittedJwt[1],
    body: splittedJwt[2],
    signature: splittedJwt[3],
  };
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
function verifyDryWrapper<T extends { isExpired: boolean }>(
  token: string,
  getTokenPayload: (token: unknown) => T,
  options?: VerifyTokenOptions
): T {
  const unknownPayload = verifyJwtToken(token);
  const payload = getTokenPayload(unknownPayload);
  // Set default value for errorIfExpired
  const errorIfExpired = options?.errorIfExpired ?? true;
  if (errorIfExpired && payload.isExpired) {
    throw new Error(ErrorMessage.TokenExpired);
  }
  return payload;
}
