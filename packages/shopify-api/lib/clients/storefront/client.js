"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storefrontClientClass = exports.StorefrontClient = void 0;
const tslib_1 = require("tslib");
const storefront_api_client_1 = require("@shopify/storefront-api-client");
const logger_1 = require("../../logger");
const ShopifyErrors = tslib_1.__importStar(require("../../error"));
const error_1 = require("../../error");
const runtime_1 = require("../../../runtime");
const common_1 = require("../common");
class StorefrontClient {
    constructor(params) {
        var _a;
        const config = this.storefrontClass().config;
        if (!config.isCustomStoreApp && !params.session.accessToken) {
            throw new ShopifyErrors.MissingRequiredArgument('Missing access token when creating GraphQL client');
        }
        if (params.apiVersion) {
            const message = params.apiVersion === config.apiVersion
                ? `Storefront client has a redundant API version override to the default ${params.apiVersion}`
                : `Storefront client overriding default API version ${config.apiVersion} with ${params.apiVersion}`;
            (0, logger_1.logger)(config).debug(message);
        }
        let accessToken;
        if (config.isCustomStoreApp) {
            accessToken = config.privateAppStorefrontAccessToken;
            if (!accessToken) {
                throw new error_1.MissingRequiredArgument('Custom store apps must set the privateAppStorefrontAccessToken property to call the Storefront API.');
            }
        }
        else {
            accessToken = params.session.accessToken;
            if (!accessToken) {
                throw new error_1.MissingRequiredArgument('Session missing access token.');
            }
        }
        this.session = params.session;
        this.apiVersion = params.apiVersion;
        this.client = (0, storefront_api_client_1.createStorefrontApiClient)({
            privateAccessToken: accessToken,
            apiVersion: (_a = this.apiVersion) !== null && _a !== void 0 ? _a : config.apiVersion,
            storeDomain: this.session.shop,
            customFetchApi: runtime_1.abstractFetch,
            logger: (0, common_1.clientLoggerFactory)(config),
            clientName: (0, common_1.getUserAgent)(config),
        });
    }
    query(params) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (0, logger_1.logger)(this.storefrontClass().config).deprecated('10.0.0', 'The query method is deprecated, and was replaced with the request method.\n' +
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
            const response = yield this.client.request(operation, Object.assign({ apiVersion: this.apiVersion || this.storefrontClass().config.apiVersion }, options));
            if (response.errors) {
                const fetchResponse = response.errors.response;
                (0, common_1.throwFailedRequest)(response, fetchResponse, false);
            }
            return response;
        });
    }
    storefrontClass() {
        return this.constructor;
    }
}
exports.StorefrontClient = StorefrontClient;
function storefrontClientClass(params) {
    const { config } = params;
    class NewStorefrontClient extends StorefrontClient {
    }
    NewStorefrontClient.config = config;
    Reflect.defineProperty(NewStorefrontClient, 'name', {
        value: 'StorefrontClient',
    });
    return NewStorefrontClient;
}
exports.storefrontClientClass = storefrontClientClass;
//# sourceMappingURL=client.js.map