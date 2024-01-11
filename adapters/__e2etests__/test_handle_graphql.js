"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGraphqlTest = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line import/no-extraneous-dependencies
const graphql_client_1 = require("@shopify/graphql-client");
const runtime_1 = require("../../runtime");
function graphqlClientFactory(apiServer) {
    return (0, graphql_client_1.createGraphQLClient)({
        url: `http://${apiServer}`,
        headers: {},
        fetchApi: runtime_1.abstractFetch,
    });
}
const handleGraphqlTest = ({ apiServer, testRequest, expectedResponse, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const graphqlClient = graphqlClientFactory(apiServer);
    let operation;
    let variables;
    try {
        const bodyJSON = JSON.parse(testRequest.body);
        operation = bodyJSON.query;
        variables = bodyJSON.variables;
    }
    catch (error) {
        operation = testRequest.body;
    }
    const headers = Object.entries(testRequest.headers).reduce((acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? value : value.join(', ');
        return acc;
    }, {});
    let testPassed = false;
    let testFailedDebug = '';
    try {
        const response = yield graphqlClient.fetch(operation, {
            url: testRequest.url
                ? `http://${apiServer}${testRequest.url}`
                : undefined,
            variables,
            headers,
            retries: testRequest.retries,
        });
        testPassed =
            expectedResponse.statusCode === response.status &&
                expectedResponse.statusText === response.statusText;
        testFailedDebug = JSON.stringify({
            errorMessageReceived: undefined,
            statusCodeExpected: expectedResponse.statusCode,
            statusCodeReceived: response.status,
            statusTextExpected: expectedResponse.statusText,
            statusTextReceived: response.statusText,
        });
    }
    catch (error) {
        testFailedDebug = JSON.stringify({
            errorMessageReceived: error.message,
        });
    }
    return { testPassed, testFailedDebug };
});
exports.handleGraphqlTest = handleGraphqlTest;
//# sourceMappingURL=test_handle_graphql.js.map