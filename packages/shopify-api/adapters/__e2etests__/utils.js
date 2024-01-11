"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = exports.config = exports.matchHeaders = void 0;
const http_1 = require("../../runtime/http");
const types_1 = require("../../lib/types");
const scopes_1 = require("../../lib/auth/scopes");
const lib_1 = require("../../lib");
function matchHeaders(received, expected) {
    let expectedHeadersCorrect = true;
    const canonicalizedReceived = (0, http_1.canonicalizeHeaders)(received);
    const canonicalizedExpected = (0, http_1.canonicalizeHeaders)(expected);
    if (Object.keys(canonicalizedExpected).length > 0) {
        for (const [expectedKey, expectedValues] of Object.entries(canonicalizedExpected)) {
            expectedHeadersCorrect =
                expectedHeadersCorrect &&
                    expectedKey in canonicalizedReceived &&
                    received[expectedKey][0].includes(expectedValues[0]);
            if (!expectedHeadersCorrect)
                return false;
        }
    }
    return expectedHeadersCorrect;
}
exports.matchHeaders = matchHeaders;
exports.config = {
    apiKey: 'test_key',
    apiSecretKey: 'test_secret_key',
    scopes: new scopes_1.AuthScopes('test_scope'),
    hostName: 'test_host_name',
    hostScheme: 'https',
    apiVersion: types_1.LATEST_API_VERSION,
    isEmbeddedApp: true,
    isCustomStoreApp: false,
    logger: {
        log: () => Promise.resolve(),
        level: types_1.LogSeverity.Debug,
        httpRequests: false,
        timestamps: false,
    },
    future: {
        unstable_tokenExchange: true,
    },
};
exports.session = new lib_1.Session({
    id: 'test_session',
    isOnline: false,
    shop: 'test-shop.myshopify.io',
    state: '1234',
    scope: 'test_scope',
    accessToken: 'test_access_token',
});
//# sourceMappingURL=utils.js.map