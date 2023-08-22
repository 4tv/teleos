"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPublishToken = void 0;
const utils_1 = require("./utils");
/**
 * Verifies the Publish Token and returns the payload.
 */
function verifyPublishToken(token, options) {
    return (0, utils_1.verifyDryWrapper)(token, utils_1.getPublishToken, options);
}
exports.verifyPublishToken = verifyPublishToken;
//# sourceMappingURL=verifyPublishToken.js.map