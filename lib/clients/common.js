"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwFailedRequest = exports.clientLoggerFactory = exports.getUserAgent = void 0;
const tslib_1 = require("tslib");
const network_1 = require("@shopify/network");
const ShopifyErrors = tslib_1.__importStar(require("../error"));
const types_1 = require("../types");
const version_1 = require("../version");
const runtime_1 = require("../../runtime");
const logger_1 = require("../logger");
function getUserAgent(config) {
    let userAgentPrefix = `${types_1.LIBRARY_NAME} v${version_1.SHOPIFY_API_LIBRARY_VERSION} | ${(0, runtime_1.abstractRuntimeString)()}`;
    if (config.userAgentPrefix) {
        userAgentPrefix = `${config.userAgentPrefix} | ${userAgentPrefix}`;
    }
    return userAgentPrefix;
}
exports.getUserAgent = getUserAgent;
function clientLoggerFactory(config) {
    return (logContent) => {
        if (config.logger.httpRequests) {
            switch (logContent.type) {
                case 'HTTP-Response': {
                    const responseLog = logContent.content;
                    (0, logger_1.logger)(config).debug('Received response for HTTP request', {
                        requestParams: JSON.stringify(responseLog.requestParams),
                        response: JSON.stringify(responseLog.response),
                    });
                    break;
                }
                case 'HTTP-Retry': {
                    const responseLog = logContent.content;
                    (0, logger_1.logger)(config).debug('Retrying HTTP request', {
                        requestParams: JSON.stringify(responseLog.requestParams),
                        retryAttempt: responseLog.retryAttempt,
                        maxRetries: responseLog.maxRetries,
                        response: JSON.stringify(responseLog.lastResponse),
                    });
                    break;
                }
                default: {
                    (0, logger_1.logger)(config).debug(`HTTP request event: ${logContent.content}`);
                    break;
                }
            }
        }
    };
}
exports.clientLoggerFactory = clientLoggerFactory;
function throwFailedRequest(body, response, retry = true) {
    var _a, _b, _c;
    const responseHeaders = (0, runtime_1.canonicalizeHeaders)(Object.fromEntries((_a = response.headers.entries()) !== null && _a !== void 0 ? _a : []));
    if (response.status === network_1.StatusCode.Ok && body.errors.graphQLErrors) {
        throw new ShopifyErrors.GraphqlQueryError({
            message: (_c = (_b = body.errors.graphQLErrors) === null || _b === void 0 ? void 0 : _b[0].message) !== null && _c !== void 0 ? _c : 'GraphQL operation failed',
            response: response,
            headers: responseHeaders,
        });
    }
    const errorMessages = [];
    if (body.errors) {
        errorMessages.push(JSON.stringify(body.errors, null, 2));
    }
    const xRequestId = (0, runtime_1.getHeader)(responseHeaders, 'x-request-id');
    if (xRequestId) {
        errorMessages.push(`If you report this error, please include this id: ${xRequestId}`);
    }
    const errorMessage = errorMessages.length
        ? `:\n${errorMessages.join('\n')}`
        : '';
    const code = response.status;
    const statusText = response.statusText;
    switch (true) {
        case response.status === network_1.StatusCode.TooManyRequests: {
            if (retry) {
                const retryAfter = (0, runtime_1.getHeader)(responseHeaders, 'Retry-After');
                throw new ShopifyErrors.HttpThrottlingError({
                    message: `Shopify is throttling requests${errorMessage}`,
                    code,
                    statusText,
                    body,
                    headers: responseHeaders,
                    retryAfter: retryAfter ? parseFloat(retryAfter) : undefined,
                });
            }
            else {
                throw new ShopifyErrors.HttpMaxRetriesError('Attempted the maximum number of retries for HTTP request.');
            }
        }
        case response.status >= network_1.StatusCode.InternalServerError:
            if (retry) {
                throw new ShopifyErrors.HttpInternalError({
                    message: `Shopify internal error${errorMessage}`,
                    code,
                    statusText,
                    body,
                    headers: responseHeaders,
                });
            }
            else {
                throw new ShopifyErrors.HttpMaxRetriesError('Attempted the maximum number of retries for HTTP request.');
            }
        default:
            throw new ShopifyErrors.HttpResponseError({
                message: `Received an error response (${response.status} ${response.statusText}) from Shopify${errorMessage}`,
                code,
                statusText,
                body,
                headers: responseHeaders,
            });
    }
}
exports.throwFailedRequest = throwFailedRequest;
//# sourceMappingURL=common.js.map