"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyReviseToken = void 0;
const utils_1 = require("./utils");
/**
 * Verifies the Revise Token and returns the payload.
 */
function verifyReviseToken(token, options) {
    return (0, utils_1.verifyDryWrapper)(token, utils_1.getReviseToken, options);
}
exports.verifyReviseToken = verifyReviseToken;
//# sourceMappingURL=verifyReviseToken.js.map