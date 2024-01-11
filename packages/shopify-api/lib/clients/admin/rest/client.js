"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restClientClass = exports.RestClient = void 0;
const tslib_1 = require("tslib");
const admin_api_client_1 = require("@shopify/admin-api-client");
const network_1 = require("@shopify/network");
const common_1 = require("../../common");
const runtime_1 = require("../../../../runtime");
const ShopifyErrors = tslib_1.__importStar(require("../../../error"));
const logger_1 = require("../../../logger");
class RestClient {
    constructor({ session, apiVersion }) {
        var _a;
        this.loggedDeprecations = {};
        const config = this.restClass().config;
        if (!config.isCustomStoreApp && !session.accessToken) {
            throw new ShopifyErrors.MissingRequiredArgument('Missing access token when creating REST client');
        }
        if (apiVersion) {
            const message = apiVersion === config.apiVersion
                ? `REST client has a redundant API version override to the default ${apiVersion}`
                : `REST client overriding default API version ${config.apiVersion} with ${apiVersion}`;
            (0, logger_1.logger)(config).debug(message);
        }
        const customStoreAppAccessToken = (_a = config.adminApiAccessToken) !== null && _a !== void 0 ? _a : config.apiSecretKey;
        this.client = (0, admin_api_client_1.createAdminRestApiClient)({
            scheme: config.hostScheme,
            storeDomain: session.shop,
            apiVersion: apiVersion !== null && apiVersion !== void 0 ? apiVersion : config.apiVersion,
            accessToken: config.isCustomStoreApp
                ? customStoreAppAccessToken
                : session.accessToken,
            customFetchApi: runtime_1.abstractFetch,
            logger: (0, common_1.clientLoggerFactory)(config),
            userAgentPrefix: (0, common_1.getUserAgent)(config),
            defaultRetryTime: this.restClass().RETRY_WAIT_TIME,
            formatPaths: this.restClass().formatPaths,
        });
    }
    /**
     * Performs a GET request on the given path.
     */
    get(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({ method: network_1.Method.Get }, params));
        });
    }
    /**
     * Performs a POST request on the given path.
     */
    post(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({ method: network_1.Method.Post }, params));
        });
    }
    /**
     * Performs a PUT request on the given path.
     */
    put(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({ method: network_1.Method.Put }, params));
        });
    }
    /**
     * Performs a DELETE request on the given path.
     */
    delete(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({ method: network_1.Method.Delete }, params));
        });
    }
    request(params) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const requestParams = {
                headers: Object.assign(Object.assign({}, params.extraHeaders), (params.type ? { 'Content-Type': params.type.toString() } : {})),
                retries: params.tries ? params.tries - 1 : undefined,
                searchParams: params.query,
            };
            let response;
            switch (params.method) {
                case network_1.Method.Get:
                    response = yield this.client.get(params.path, requestParams);
                    break;
                case network_1.Method.Put:
                    response = yield this.client.put(params.path, Object.assign(Object.assign({}, requestParams), { data: params.data }));
                    break;
                case network_1.Method.Post:
                    response = yield this.client.post(params.path, Object.assign(Object.assign({}, requestParams), { data: params.data }));
                    break;
                case network_1.Method.Delete:
                    response = yield this.client.delete(params.path, requestParams);
                    break;
                default:
                    throw new ShopifyErrors.InvalidRequestError(`Unsupported request method '${params.method}'`);
            }
            const body = yield response.json();
            const responseHeaders = (0, runtime_1.canonicalizeHeaders)(Object.fromEntries(response.headers.entries()));
            if (!response.ok) {
                (0, common_1.throwFailedRequest)(body, response, ((_a = params.tries) !== null && _a !== void 0 ? _a : 1) <= 1);
            }
            const requestReturn = {
                body,
                headers: responseHeaders,
            };
            yield this.logDeprecations({
                method: params.method,
                url: params.path,
                headers: requestParams.headers,
                body: params.data ? JSON.stringify(params.data) : undefined,
            }, requestReturn);
            const link = response.headers.get('Link');
            if (link !== undefined) {
                const pageInfo = {
                    limit: ((_b = params.query) === null || _b === void 0 ? void 0 : _b.limit)
                        ? (_c = params.query) === null || _c === void 0 ? void 0 : _c.limit.toString()
                        : RestClient.DEFAULT_LIMIT,
                };
                if (link) {
                    const links = link.split(', ');
                    for (const link of links) {
                        const parsedLink = link.match(RestClient.LINK_HEADER_REGEXP);
                        if (!parsedLink) {
                            continue;
                        }
                        const linkRel = parsedLink[2];
                        const linkUrl = new URL(parsedLink[1]);
                        const linkFields = linkUrl.searchParams.get('fields');
                        const linkPageToken = linkUrl.searchParams.get('page_info');
                        if (!pageInfo.fields && linkFields) {
                            pageInfo.fields = linkFields.split(',');
                        }
                        if (linkPageToken) {
                            switch (linkRel) {
                                case 'previous':
                                    pageInfo.previousPageUrl = parsedLink[1];
                                    pageInfo.prevPage = this.buildRequestParams(parsedLink[1]);
                                    break;
                                case 'next':
                                    pageInfo.nextPageUrl = parsedLink[1];
                                    pageInfo.nextPage = this.buildRequestParams(parsedLink[1]);
                                    break;
                            }
                        }
                    }
                }
                requestReturn.pageInfo = pageInfo;
            }
            return requestReturn;
        });
    }
    restClass() {
        return this.constructor;
    }
    buildRequestParams(newPageUrl) {
        const pattern = `^/admin/api/[^/]+/(.*).json$`;
        const url = new URL(newPageUrl);
        const path = url.pathname.replace(new RegExp(pattern), '$1');
        return {
            path,
            query: Object.fromEntries(url.searchParams.entries()),
        };
    }
    logDeprecations(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const config = this.restClass().config;
            const deprecationReason = (0, runtime_1.getHeader)(response.headers, 'X-Shopify-API-Deprecated-Reason');
            if (deprecationReason) {
                const deprecation = {
                    message: deprecationReason,
                    path: request.url,
                };
                if (request.body) {
                    // This can only be a string, since we're always converting the body before calling this method
                    deprecation.body = `${request.body.substring(0, 100)}...`;
                }
                const depHash = yield (0, runtime_1.createSHA256HMAC)(config.apiSecretKey, JSON.stringify(deprecation), runtime_1.HashFormat.Hex);
                if (!Object.keys(this.loggedDeprecations).includes(depHash) ||
                    Date.now() - this.loggedDeprecations[depHash] >=
                        RestClient.DEPRECATION_ALERT_DELAY) {
                    this.loggedDeprecations[depHash] = Date.now();
                    const stack = new Error().stack;
                    const message = `API Deprecation Notice ${new Date().toLocaleString()} : ${JSON.stringify(deprecation)}  -  Stack Trace: ${stack}`;
                    yield (0, logger_1.logger)(config).warning(message);
                }
            }
        });
    }
}
exports.RestClient = RestClient;
RestClient.LINK_HEADER_REGEXP = /<([^<]+)>; rel="([^"]+)"/;
RestClient.DEFAULT_LIMIT = '50';
RestClient.RETRY_WAIT_TIME = 1000;
RestClient.DEPRECATION_ALERT_DELAY = 300000;
function restClientClass(params) {
    const { config, formatPaths } = params;
    class NewRestClient extends RestClient {
    }
    NewRestClient.config = config;
    NewRestClient.formatPaths = formatPaths === undefined ? true : formatPaths;
    Reflect.defineProperty(NewRestClient, 'name', {
        value: 'RestClient',
    });
    return NewRestClient;
}
exports.restClientClass = restClientClass;
//# sourceMappingURL=client.js.map