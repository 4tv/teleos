export { ReviseToken, VerifyTokenOptions, TokenPayload, PublishToken };

/**
 * Represents the payload structure of a JWT (JSON Web Token).
 */
type TokenPayload = {
  /** Application ID, identifies the application making the request. */
  aid: string;
  /** Client ID, identifies the customer associated with the request. */
  cid: string;
  /** Issued At timestamp, records when the JWT was created. */
  iat: number;
  /** Expiration timestamp, specifies when the JWT should expire. */
  exp: number;
  /** Issuer identifier, specifies the issuer of the token. */
  iss: 'ToSv1';
  /** Optional entity ID, might be used to identify
   * a specific entity related to the request. */
  eid?: string;
  /** Optional URL, might be used to store a related URL for the request. */
  url?: string;
};

interface PublishToken {
  appId: string;
  clientId: string;
  isExpired: boolean;
  createdAt: number;
  expirationAt: number;
}

interface ReviseToken extends PublishToken {
  entryId: string;
  url: string;
}

type VerifyTokenOptions = {
  /**
   * Throw an error if the token is expired.
   * @default true
   */
  errorIfExpired?: boolean;
};
