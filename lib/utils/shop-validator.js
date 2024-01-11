"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHost = exports.sanitizeShop = void 0;
const error_1 = require("../error");
const decode_host_1 = require("../auth/decode-host");
const shop_admin_url_helper_1 = require("./shop-admin-url-helper");
function sanitizeShop(config) {
    return (shop, throwOnInvalid = false) => {
        let shopUrl = shop;
        const domainsRegex = ['myshopify\\.com', 'shopify\\.com', 'myshopify\\.io'];
        if (config.customShopDomains) {
            domainsRegex.push(...config.customShopDomains.map((regex) => typeof regex === 'string' ? regex : regex.source));
        }
        const shopUrlRegex = new RegExp(`^[a-zA-Z0-9][a-zA-Z0-9-_]*\\.(${domainsRegex.join('|')})[/]*$`);
        const shopAdminRegex = new RegExp(`^admin\\.(${domainsRegex.join('|')})/store/([a-zA-Z0-9][a-zA-Z0-9-_]*)$`);
        const isShopAdminUrl = shopAdminRegex.test(shopUrl);
        if (isShopAdminUrl) {
            shopUrl = (0, shop_admin_url_helper_1.shopAdminUrlToLegacyUrl)(shopUrl) || '';
        }
        const sanitizedShop = shopUrlRegex.test(shopUrl) ? shopUrl : null;
        if (!sanitizedShop && throwOnInvalid) {
            throw new error_1.InvalidShopError('Received invalid shop argument');
        }
        return sanitizedShop;
    };
}
exports.sanitizeShop = sanitizeShop;
function sanitizeHost() {
    return (host, throwOnInvalid = false) => {
        const base64regex = /^[0-9a-zA-Z+/]+={0,2}$/;
        let sanitizedHost = base64regex.test(host) ? host : null;
        if (sanitizedHost) {
            const { hostname } = new URL(`https://${(0, decode_host_1.decodeHost)(sanitizedHost)}`);
            const originsRegex = [
                'myshopify\\.com',
                'shopify\\.com',
                'myshopify\\.io',
                'spin\\.dev',
            ];
            const hostRegex = new RegExp(`\\.(${originsRegex.join('|')})$`);
            if (!hostRegex.test(hostname)) {
                sanitizedHost = null;
            }
        }
        if (!sanitizedHost && throwOnInvalid) {
            throw new error_1.InvalidHostError('Received invalid host argument');
        }
        return sanitizedHost;
    };
}
exports.sanitizeHost = sanitizeHost;
//# sourceMappingURL=shop-validator.js.map