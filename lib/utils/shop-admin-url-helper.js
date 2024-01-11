"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.legacyUrlToShopAdminUrl = exports.shopAdminUrlToLegacyUrl = void 0;
// Converts admin.shopify.com/store/my-shop to my-shop.myshopify.com
function shopAdminUrlToLegacyUrl(shopAdminUrl) {
    const shopUrl = removeProtocol(shopAdminUrl);
    const isShopAdminUrl = shopUrl.split('.')[0] === 'admin';
    if (!isShopAdminUrl) {
        return null;
    }
    const regex = new RegExp(`admin\\..+/store/([^/]+)`);
    const matches = shopUrl.match(regex);
    if (matches && matches.length === 2) {
        const shopName = matches[1];
        const isSpinUrl = shopUrl.includes('spin.dev/store/');
        if (isSpinUrl) {
            return spinAdminUrlToLegacyUrl(shopUrl);
        }
        else {
            return `${shopName}.myshopify.com`;
        }
    }
    else {
        return null;
    }
}
exports.shopAdminUrlToLegacyUrl = shopAdminUrlToLegacyUrl;
// Converts my-shop.myshopify.com to admin.shopify.com/store/my-shop
function legacyUrlToShopAdminUrl(legacyAdminUrl) {
    const shopUrl = removeProtocol(legacyAdminUrl);
    const regex = new RegExp(`(.+)\\.myshopify\\.com$`);
    const matches = shopUrl.match(regex);
    if (matches && matches.length === 2) {
        const shopName = matches[1];
        return `admin.shopify.com/store/${shopName}`;
    }
    else {
        const isSpinUrl = shopUrl.endsWith('spin.dev');
        if (isSpinUrl) {
            return spinLegacyUrlToAdminUrl(shopUrl);
        }
        else {
            return null;
        }
    }
}
exports.legacyUrlToShopAdminUrl = legacyUrlToShopAdminUrl;
function spinAdminUrlToLegacyUrl(shopAdminUrl) {
    const spinRegex = new RegExp(`admin\\.web\\.(.+\\.spin\\.dev)/store/(.+)`);
    const spinMatches = shopAdminUrl.match(spinRegex);
    if (spinMatches && spinMatches.length === 3) {
        const spinUrl = spinMatches[1];
        const shopName = spinMatches[2];
        return `${shopName}.shopify.${spinUrl}`;
    }
    else {
        return null;
    }
}
function spinLegacyUrlToAdminUrl(legacyAdminUrl) {
    const spinRegex = new RegExp(`(.+)\\.shopify\\.(.+\\.spin\\.dev)`);
    const spinMatches = legacyAdminUrl.match(spinRegex);
    if (spinMatches && spinMatches.length === 3) {
        const shopName = spinMatches[1];
        const spinUrl = spinMatches[2];
        return `admin.web.${spinUrl}/store/${shopName}`;
    }
    else {
        return null;
    }
}
function removeProtocol(url) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
//# sourceMappingURL=shop-admin-url-helper.js.map