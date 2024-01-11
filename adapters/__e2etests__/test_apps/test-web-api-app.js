"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("../../web-api");
const lib_1 = require("../../../lib");
const admin_1 = require("../../../lib/clients/admin");
const utils_1 = require("../utils");
const test_config_types_1 = require("../test_config_types");
const test_handle_graphql_1 = require("../test_handle_graphql");
/* Codes for different Colours */
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[39m';
const RestClient = (0, admin_1.restClientClass)({
    config: Object.assign(Object.assign({}, utils_1.config), { hostScheme: 'http' }),
    formatPaths: false,
});
const defaultRetryTimer = RestClient.RETRY_WAIT_TIME;
let testCount = 0;
function params(testRequest) {
    return {
        path: testRequest.url,
        type: testRequest.bodyType,
        data: JSON.stringify(testRequest.body),
    };
}
function setRestClientRetryTime(time) {
    RestClient.RETRY_WAIT_TIME = time;
}
/* eslint-disable-next-line import/no-anonymous-default-export */
exports.default = {
    fetch(req, _env, _ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const apiServerPort = parseInt(globalThis.HTTP_SERVER_PORT || '3000', 10);
            const apiServer = `localhost:${apiServerPort}`;
            const client = new RestClient({
                session: new lib_1.Session(Object.assign(Object.assign({}, utils_1.session), { shop: apiServer })),
            });
            if (req.method === 'POST') {
                const testConfig = yield req.json();
                const testRequest = testConfig.testRequest;
                const expectedResponse = testConfig.expectedResponse;
                let testPassed = false;
                let testFailedDebug = '';
                let response;
                setRestClientRetryTime(defaultRetryTimer);
                testCount++;
                console.log(`[webApi] testRequest #${testCount} = ${JSON.stringify(testRequest, undefined, 2)}\n`);
                if (testRequest.type === test_config_types_1.TestType.Graphql) {
                    const result = yield (0, test_handle_graphql_1.handleGraphqlTest)({
                        apiServer,
                        testRequest,
                        expectedResponse,
                    });
                    testPassed = result.testPassed;
                    testFailedDebug = result.testFailedDebug;
                    console.log(`[webApi] testPassed=${testPassed}, testFailedDebug=${testFailedDebug}\n`);
                }
                else {
                    const tries = testRequest.tries || 1;
                    let timedOut = false;
                    let retryTimeout;
                    if (typeof testRequest.retryTimeoutTimer !== 'undefined') {
                        setRestClientRetryTime(testRequest.retryTimeoutTimer);
                        console.log(`[webApi] RETRY_TIME_WAIT (BEFORE) = ${RestClient.RETRY_WAIT_TIME}\n`);
                        if (testRequest.retryTimeoutTimer !== 0) {
                            console.log(`[webApi] setting setTimeout @ ${RestClient.RETRY_WAIT_TIME} ms\n`);
                            retryTimeout = setTimeout(() => {
                                try {
                                    throw new Error('Request was not retried within the interval defined by Retry-After, test failed');
                                }
                                catch (error) {
                                    console.log(`[webApi] ${RED}setTimeout fired!${RESET} @ ${RestClient.RETRY_WAIT_TIME}\n`);
                                    testFailedDebug = JSON.stringify({
                                        errorMessageReceived: error.message,
                                    });
                                    timedOut = true;
                                }
                            }, testRequest.retryTimeoutTimer);
                        }
                    }
                    switch (testRequest.method.toLowerCase()) {
                        case 'get':
                            try {
                                response = yield client.get({
                                    path: testRequest.url,
                                    tries,
                                    extraHeaders: testRequest.headers,
                                });
                                if (timedOut) {
                                    console.log(`[webApi] timedOut=${timedOut}, testPassed=${testPassed}, testFailedDebug=${testFailedDebug}\n`);
                                }
                                else {
                                    testPassed =
                                        (0, utils_1.matchHeaders)(response.headers, expectedResponse.headers) && JSON.stringify(response.body) === expectedResponse.body;
                                    testFailedDebug = JSON.stringify({
                                        bodyExpected: expectedResponse.body,
                                        bodyReceived: response.body,
                                        headersExpected: expectedResponse.headers,
                                        headersReceived: response.headers,
                                    });
                                }
                            }
                            catch (error) {
                                testPassed = error.constructor.name.startsWith(expectedResponse.errorType);
                                if (expectedResponse.errorType === 'HttpResponseError') {
                                    testPassed =
                                        testPassed &&
                                            'response' in error &&
                                            'code' in error.response &&
                                            error.response.code === expectedResponse.statusCode &&
                                            'statusText' in error.response &&
                                            error.response.statusText === expectedResponse.statusText;
                                }
                                if ('expectRequestId' in expectedResponse) {
                                    testPassed =
                                        testPassed &&
                                            error.message.includes(expectedResponse.expectRequestId);
                                }
                                if ('errorMessage' in expectedResponse) {
                                    testPassed =
                                        testPassed && error.message === expectedResponse.errorMessage;
                                }
                                testFailedDebug = JSON.stringify({
                                    statusCodeExpected: expectedResponse.statusCode,
                                    statusCodeReceived: error.code,
                                    statusTextExpected: expectedResponse.statusText,
                                    statusTextReceived: error.statusText,
                                    errorTypeExpected: expectedResponse.errorType,
                                    errorTypeReceived: error.constructor.name,
                                    errorMessageExpected: expectedResponse.errorMessage,
                                    errorMessageReceived: error.message,
                                });
                            }
                            break;
                        case 'post':
                            response = yield client.post(params(testRequest));
                            testPassed =
                                JSON.stringify(response.body) === expectedResponse.body;
                            break;
                        case 'put':
                            response = yield client.put(params(testRequest));
                            testPassed =
                                JSON.stringify(response.body) === expectedResponse.body;
                            break;
                        case 'delete':
                            response = yield client.delete({ path: testRequest.url });
                            testPassed =
                                JSON.stringify(response.body) === expectedResponse.body;
                            break;
                        default:
                            testPassed = false;
                    }
                    if (typeof testRequest.retryTimeoutTimer !== 'undefined' &&
                        testRequest.retryTimeoutTimer !== 0 &&
                        typeof retryTimeout !== 'undefined') {
                        clearTimeout(retryTimeout);
                    }
                }
                console.log(`[webApi] test #${testCount} passed=${testPassed ? GREEN : RED}${testPassed}${RESET}, debug=${JSON.stringify(testFailedDebug, undefined, 2)}\n`);
                if (testPassed) {
                    return new Response('Test passed!', { status: 200 });
                }
                else {
                    return new Response(testFailedDebug, {
                        status: 500,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                }
            }
            else {
                return new Response('Ready!', { status: 200 });
            }
        });
    },
};
//# sourceMappingURL=test-web-api-app.js.map