"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlClientClass = exports.GraphqlClient = void 0;
const tslib_1 = require("tslib");
const admin_api_client_1 = require("@shopify/admin-api-client");
const logger_1 = require("../../../logger");
const ShopifyErrors = tslib_1.__importStar(require("../../../error"));
const runtime_1 = require("../../../../runtime");
const common_1 = require("../../common");
class GraphqlClient {
    constructor(params) {
        var _a, _b;
        const config = this.graphqlClass().config;
        if (!config.isCustomStoreApp && !params.session.accessToken) {
            throw new ShopifyErrors.MissingRequiredArgument('Missing access token when creating GraphQL client');
        }
        if (params.apiVersion) {
            const message = params.apiVersion === config.apiVersion
                ? `Admin client has a redundant API version override to the default ${params.apiVersion}`
                : `Admin client overriding default API version ${config.apiVersion} with ${params.apiVersion}`;
            (0, logger_1.logger)(config).debug(message);
        }
        this.session = params.session;
        this.apiVersion = params.apiVersion;
        this.client = (0, admin_api_client_1.createAdminApiClient)({
            accessToken: (_a = config.adminApiAccessToken) !== null && _a !== void 0 ? _a : this.session.accessToken,
            apiVersion: (_b = this.apiVersion) !== null && _b !== void 0 ? _b : config.apiVersion,
            storeDomain: this.session.shop,
            customFetchApi: runtime_1.abstractFetch,
            logger: (0, common_1.clientLoggerFactory)(config),
            userAgentPrefix: (0, common_1.getUserAgent)(config),
        });
    }
    query(params) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, logger_1.logger)(this.graphqlClass().config).deprecated('10.0.0', 'The query method is deprecated, and was replaced with the request method.\n' +
                'See the migration guide: https://github.com/Shopify/shopify-api-js/blob/main/packages/shopify-api/docs/migrating-to-v9.md#using-the-new-clients.');
            if ((typeof params.data === 'string' && params.data.length === 0) ||
                Object.entries(params.data).length === 0) {
                throw new ShopifyErrors.MissingRequiredArgument('Query missing.');
            }
            let operation;
            let variables;
            if (typeof params.data === 'string') {
                operation = params.data;
            }
            else {
                operation = params.data.query;
                variables = params.data.variables;
            }
            const headers = Object.fromEntries(Object.entries((_a = params === null || params === void 0 ? void 0 : params.extraHeaders) !== null && _a !== void 0 ? _a : {}).map(([key, value]) => [
                key,
                Array.isArray(value) ? value.join(', ') : value.toString(),
            ]));
            const response = yield this.request(operation, {
                headers,
                retries: params.tries ? params.tries - 1 : undefined,
                variables,
            });
            return { body: response, headers: {} };
        });
    }
    request(operation, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.request(operation, Object.assign({ apiVersion: this.apiVersion || this.graphqlClass().config.apiVersion }, options));
            if (response.errors) {
                const fetchResponse = response.errors.response;
                (0, common_1.throwFailedRequest)(response, fetchResponse, false);
            }
            return response;
        });
    }
    graphqlClass() {
        return this.constructor;
    }
}
exports.GraphqlClient = GraphqlClient;
function graphqlClientClass({ config, }) {
    class NewGraphqlClient extends GraphqlClient {
    }
    NewGraphqlClient.config = config;
    Reflect.defineProperty(NewGraphqlClient, 'name', {
        value: 'GraphqlClient',
    });
    return NewGraphqlClient;
}
exports.graphqlClientClass = graphqlClientClass;
//# sourceMappingURL=client.js.map