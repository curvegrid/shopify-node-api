"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTestResponse = exports.initTestRequest = exports.TestType = void 0;
var TestType;
(function (TestType) {
    TestType["Rest"] = "rest";
    TestType["Graphql"] = "graphql";
})(TestType || (exports.TestType = TestType = {}));
function initTestRequest(options) {
    if ((options === null || options === void 0 ? void 0 : options.type) === TestType.Graphql) {
        return Object.assign(Object.assign({ headers: {}, url: '/admin/api/graphql.json', method: 'post', body: 'testOperation' }, options), { type: TestType.Graphql });
    }
    else {
        return Object.assign(Object.assign({ method: 'get', url: '/url/path', headers: {} }, options), { type: TestType.Rest });
    }
}
exports.initTestRequest = initTestRequest;
function initTestResponse(options) {
    const defaults = {
        statusCode: 200,
        statusText: 'OK',
        headers: {},
        body: JSON.stringify({ message: 'Your HTTP request was successful!' }),
    };
    return Object.assign(Object.assign({}, defaults), options);
}
exports.initTestResponse = initTestResponse;
//# sourceMappingURL=test_config_types.js.map