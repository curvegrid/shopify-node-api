"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callback = exports.begin = void 0;
const tslib_1 = require("tslib");
const isbot_1 = tslib_1.__importDefault(require("isbot"));
const common_1 = require("../../clients/common");
const processed_query_1 = tslib_1.__importDefault(require("../../utils/processed-query"));
const ShopifyErrors = tslib_1.__importStar(require("../../error"));
const shop_validator_1 = require("../../utils/shop-validator");
const http_1 = require("../../../runtime/http");
const logger_1 = require("../../logger");
const types_1 = require("../../clients/types");
const types_2 = require("./types");
const nonce_1 = require("./nonce");
const create_session_1 = require("./create-session");
const logForBot = ({ request, log, func }) => {
    log.debug(`Possible bot request to auth ${func}: `, {
        userAgent: request.headers['User-Agent'],
    });
};
function begin(config) {
    return (_a) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var { shop, callbackPath, isOnline } = _a, adapterArgs = tslib_1.__rest(_a, ["shop", "callbackPath", "isOnline"]);
        throwIfCustomStoreApp(config.isCustomStoreApp, 'Cannot perform OAuth for private apps');
        const log = (0, logger_1.logger)(config);
        log.info('Beginning OAuth', { shop, isOnline, callbackPath });
        const request = yield (0, http_1.abstractConvertRequest)(adapterArgs);
        const response = yield (0, http_1.abstractConvertIncomingResponse)(adapterArgs);
        if ((0, isbot_1.default)(request.headers['User-Agent'])) {
            logForBot({ request, log, func: 'begin' });
            response.statusCode = 410;
            return (0, http_1.abstractConvertResponse)(response, adapterArgs);
        }
        const cookies = new http_1.Cookies(request, response, {
            keys: [config.apiSecretKey],
            secure: true,
        });
        const state = (0, nonce_1.nonce)();
        yield cookies.setAndSign(types_2.STATE_COOKIE_NAME, state, {
            expires: new Date(Date.now() + 60000),
            sameSite: 'lax',
            secure: true,
            path: callbackPath,
        });
        const query = {
            client_id: config.apiKey,
            scope: config.scopes.toString(),
            redirect_uri: `${config.hostScheme}://${config.hostName}${callbackPath}`,
            state,
            'grant_options[]': isOnline ? 'per-user' : '',
        };
        const processedQuery = new processed_query_1.default();
        processedQuery.putAll(query);
        const cleanShop = (0, shop_validator_1.sanitizeShop)(config)(shop, true);
        const redirectUrl = `https://${cleanShop}/admin/oauth/authorize${processedQuery.stringify()}`;
        response.statusCode = 302;
        response.statusText = 'Found';
        response.headers = Object.assign(Object.assign(Object.assign({}, response.headers), cookies.response.headers), { Location: redirectUrl });
        log.debug(`OAuth started, redirecting to ${redirectUrl}`, { shop, isOnline });
        return (0, http_1.abstractConvertResponse)(response, adapterArgs);
    });
}
exports.begin = begin;
function callback(config) {
    return function callback(_a) {
        var adapterArgs = tslib_1.__rest(_a, []);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throwIfCustomStoreApp(config.isCustomStoreApp, 'Cannot perform OAuth for private apps');
            const log = (0, logger_1.logger)(config);
            const request = yield (0, http_1.abstractConvertRequest)(adapterArgs);
            const query = new URL(request.url, `${config.hostScheme}://${config.hostName}`).searchParams;
            const shop = query.get('shop');
            const response = {};
            if ((0, isbot_1.default)(request.headers['User-Agent'])) {
                logForBot({ request, log, func: 'callback' });
                throw new ShopifyErrors.BotActivityDetected('Invalid OAuth callback initiated by bot');
            }
            log.info('Completing OAuth', { shop });
            const cookies = new http_1.Cookies(request, response, {
                keys: [config.apiSecretKey],
                secure: true,
            });
            const stateFromCookie = '';
            cookies.deleteCookie(types_2.STATE_COOKIE_NAME);
            log.debug('OAuth request is valid, requesting access token', { shop });
            const body = {
                client_id: config.apiKey,
                client_secret: config.apiSecretKey,
                code: query.get('code'),
            };
            const cleanShop = (0, shop_validator_1.sanitizeShop)(config)(query.get('shop'), true);
            const postResponse = yield (0, http_1.abstractFetch)(`https://${cleanShop}/admin/oauth/access_token`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': types_1.DataType.JSON,
                    Accept: types_1.DataType.JSON,
                },
            });
            if (!postResponse.ok) {
                (0, common_1.throwFailedRequest)(yield postResponse.json(), postResponse, false);
            }
            const session = (0, create_session_1.createSession)({
                accessTokenResponse: yield postResponse.json(),
                shop: cleanShop,
                state: stateFromCookie,
                config,
            });
            if (!config.isEmbeddedApp) {
                yield cookies.setAndSign(types_2.SESSION_COOKIE_NAME, session.id, {
                    expires: session.expires,
                    sameSite: 'lax',
                    secure: true,
                    path: '/',
                });
            }
            return {
                headers: (yield (0, http_1.abstractConvertHeaders)(cookies.response.headers, adapterArgs)),
                session,
            };
        });
    };
}
exports.callback = callback;
function throwIfCustomStoreApp(isCustomStoreApp, message) {
    if (isCustomStoreApp) {
        throw new ShopifyErrors.PrivateAppError(message);
    }
}
//# sourceMappingURL=oauth.js.map