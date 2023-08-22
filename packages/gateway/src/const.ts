export { ErrorMessage, Config };

const ErrorMessage = {
  InvalidJwt: 'Invalid JWT',
  InvalidJwtSignature: 'Invalid JWT signature',
  InvalidJwtPayload: 'Invalid JWT payload',
  TokenExpired: 'Token is expired',
  TokenIsNotObject: 'Token is not an object',
  AssertionFailed: 'Assertion failed',
} as const;

const Config = {
  PublicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqSMnLBuhWeTK+lgLhdUW
8mNtwl+YDkhFQHbYIMdgYOSEZ1DY9nB8TuIaPGp3cMLFLuslpvQodW8s9Mq29nCS
IlQcwEMya5mIE7lkK7l5W8Lx8kBZrJsbFWpfhlk0sosivCb4dA6eIGkNwMXgJmqa
9V26ASU+rBSjnXARRb08twhQE4zlwuMv36j+BfW7NcedKfo+LwtwXeZTD9VmM0zU
OAmz415Jx7gqKnqOyCVDWF1rUOIkTw27dyWKHu1sBdIkO7rpJPW/vU2eqFyeJ3e5
wGIkNT5HTg4U2CG6FFYXVxF4DzwHgF37jN+XUzLRnYPb77N7Z+a0foi3tiUNS0b7
FQIDAQAB
-----END PUBLIC KEY-----`,
} as const;
