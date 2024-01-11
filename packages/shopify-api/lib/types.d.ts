export declare enum LogSeverity {
    Error = 0,
    Warning = 1,
    Info = 2,
    Debug = 3
}
export declare enum ApiVersion {
    October22 = "2022-10",
    January23 = "2023-01",
    April23 = "2023-04",
    July23 = "2023-07",
    October23 = "2023-10",
    January24 = "2024-01",
    Unstable = "unstable"
}
export declare const LIBRARY_NAME = "Shopify API Library";
export declare const LATEST_API_VERSION = ApiVersion.January24;
export declare enum ShopifyHeader {
    AccessToken = "X-Shopify-Access-Token",
    ApiVersion = "X-Shopify-API-Version",
    Domain = "X-Shopify-Shop-Domain",
    Hmac = "X-Shopify-Hmac-Sha256",
    Topic = "X-Shopify-Topic",
    WebhookId = "X-Shopify-Webhook-Id",
    StorefrontPrivateToken = "Shopify-Storefront-Private-Token",
    StorefrontSDKVariant = "X-SDK-Variant",
    StorefrontSDKVersion = "X-SDK-Version"
}
export declare enum ClientType {
    Rest = "rest",
    Graphql = "graphql"
}
export declare const privacyTopics: string[];
export declare enum BillingInterval {
    OneTime = "ONE_TIME",
    Every30Days = "EVERY_30_DAYS",
    Annual = "ANNUAL",
    Usage = "USAGE"
}
export type RecurringBillingIntervals = Exclude<BillingInterval, BillingInterval.OneTime>;
export declare enum BillingReplacementBehavior {
    ApplyImmediately = "APPLY_IMMEDIATELY",
    ApplyOnNextBillingCycle = "APPLY_ON_NEXT_BILLING_CYCLE",
    Standard = "STANDARD"
}
//# sourceMappingURL=types.d.ts.map