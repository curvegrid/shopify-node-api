"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingReplacementBehavior = exports.BillingInterval = exports.privacyTopics = exports.ClientType = exports.ShopifyHeader = exports.LATEST_API_VERSION = exports.LIBRARY_NAME = exports.ApiVersion = exports.LogSeverity = void 0;
var LogSeverity;
(function (LogSeverity) {
    LogSeverity[LogSeverity["Error"] = 0] = "Error";
    LogSeverity[LogSeverity["Warning"] = 1] = "Warning";
    LogSeverity[LogSeverity["Info"] = 2] = "Info";
    LogSeverity[LogSeverity["Debug"] = 3] = "Debug";
})(LogSeverity || (exports.LogSeverity = LogSeverity = {}));
var ApiVersion;
(function (ApiVersion) {
    ApiVersion["October22"] = "2022-10";
    ApiVersion["January23"] = "2023-01";
    ApiVersion["April23"] = "2023-04";
    ApiVersion["July23"] = "2023-07";
    ApiVersion["October23"] = "2023-10";
    ApiVersion["January24"] = "2024-01";
    ApiVersion["Unstable"] = "unstable";
})(ApiVersion || (exports.ApiVersion = ApiVersion = {}));
exports.LIBRARY_NAME = 'Shopify API Library';
exports.LATEST_API_VERSION = ApiVersion.January24;
/* eslint-disable @shopify/typescript/prefer-pascal-case-enums */
var ShopifyHeader;
(function (ShopifyHeader) {
    ShopifyHeader["AccessToken"] = "X-Shopify-Access-Token";
    ShopifyHeader["ApiVersion"] = "X-Shopify-API-Version";
    ShopifyHeader["Domain"] = "X-Shopify-Shop-Domain";
    ShopifyHeader["Hmac"] = "X-Shopify-Hmac-Sha256";
    ShopifyHeader["Topic"] = "X-Shopify-Topic";
    ShopifyHeader["WebhookId"] = "X-Shopify-Webhook-Id";
    ShopifyHeader["StorefrontPrivateToken"] = "Shopify-Storefront-Private-Token";
    ShopifyHeader["StorefrontSDKVariant"] = "X-SDK-Variant";
    ShopifyHeader["StorefrontSDKVersion"] = "X-SDK-Version";
})(ShopifyHeader || (exports.ShopifyHeader = ShopifyHeader = {}));
/* eslint-enable @shopify/typescript/prefer-pascal-case-enums */
var ClientType;
(function (ClientType) {
    ClientType["Rest"] = "rest";
    ClientType["Graphql"] = "graphql";
})(ClientType || (exports.ClientType = ClientType = {}));
exports.privacyTopics = [
    'CUSTOMERS_DATA_REQUEST',
    'CUSTOMERS_REDACT',
    'SHOP_REDACT',
];
var BillingInterval;
(function (BillingInterval) {
    BillingInterval["OneTime"] = "ONE_TIME";
    BillingInterval["Every30Days"] = "EVERY_30_DAYS";
    BillingInterval["Annual"] = "ANNUAL";
    BillingInterval["Usage"] = "USAGE";
})(BillingInterval || (exports.BillingInterval = BillingInterval = {}));
var BillingReplacementBehavior;
(function (BillingReplacementBehavior) {
    BillingReplacementBehavior["ApplyImmediately"] = "APPLY_IMMEDIATELY";
    BillingReplacementBehavior["ApplyOnNextBillingCycle"] = "APPLY_ON_NEXT_BILLING_CYCLE";
    BillingReplacementBehavior["Standard"] = "STANDARD";
})(BillingReplacementBehavior || (exports.BillingReplacementBehavior = BillingReplacementBehavior = {}));
//# sourceMappingURL=types.js.map