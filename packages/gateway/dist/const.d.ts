export { ErrorMessage, Config };
declare const ErrorMessage: {
    readonly InvalidJwt: "Invalid JWT";
    readonly InvalidJwtSignature: "Invalid JWT signature";
    readonly InvalidJwtPayload: "Invalid JWT payload";
    readonly TokenExpired: "Token is expired";
    readonly TokenIsNotObject: "Token is not an object";
    readonly AssertionFailed: "Assertion failed";
};
declare const Config: {
    readonly PublicKey: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqSMnLBuhWeTK+lgLhdUW\n8mNtwl+YDkhFQHbYIMdgYOSEZ1DY9nB8TuIaPGp3cMLFLuslpvQodW8s9Mq29nCS\nIlQcwEMya5mIE7lkK7l5W8Lx8kBZrJsbFWpfhlk0sosivCb4dA6eIGkNwMXgJmqa\n9V26ASU+rBSjnXARRb08twhQE4zlwuMv36j+BfW7NcedKfo+LwtwXeZTD9VmM0zU\nOAmz415Jx7gqKnqOyCVDWF1rUOIkTw27dyWKHu1sBdIkO7rpJPW/vU2eqFyeJ3e5\nwGIkNT5HTg4U2CG6FFYXVxF4DzwHgF37jN+XUzLRnYPb77N7Z+a0foi3tiUNS0b7\nFQIDAQAB\n-----END PUBLIC KEY-----";
};
