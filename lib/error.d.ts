import { AdapterResponse } from '../runtime/http/types';
export declare class ShopifyError extends Error {
    constructor(...args: any);
}
export declare class InvalidHmacError extends ShopifyError {
}
export declare class InvalidShopError extends ShopifyError {
}
export declare class InvalidHostError extends ShopifyError {
}
export declare class InvalidJwtError extends ShopifyError {
}
export declare class MissingJwtTokenError extends ShopifyError {
}
export declare class InvalidDeliveryMethodError extends ShopifyError {
}
export declare class SafeCompareError extends ShopifyError {
}
export declare class PrivateAppError extends ShopifyError {
}
export declare class HttpRequestError extends ShopifyError {
}
export declare class HttpMaxRetriesError extends ShopifyError {
}
interface HttpResponseData {
    code: number;
    statusText: string;
    body?: Record<string, unknown>;
    headers?: Record<string, unknown>;
}
interface HttpResponseErrorParams extends HttpResponseData {
    message: string;
}
export declare class HttpResponseError<ResponseType extends HttpResponseData = HttpResponseData> extends ShopifyError {
    readonly response: ResponseType;
    constructor({ message, code, statusText, body, headers, }: HttpResponseErrorParams);
}
export declare class HttpRetriableError<ResponseType extends HttpResponseData = HttpResponseData> extends HttpResponseError<ResponseType> {
}
export declare class HttpInternalError extends HttpRetriableError {
}
interface HttpThrottlingErrorData extends HttpResponseData {
    retryAfter?: number;
}
interface HttpThrottlingErrorParams extends HttpThrottlingErrorData {
    message: string;
}
export declare class HttpThrottlingError extends HttpRetriableError<HttpThrottlingErrorData> {
    constructor({ retryAfter, ...params }: HttpThrottlingErrorParams);
}
export declare class RestResourceError extends ShopifyError {
}
export declare class GraphqlQueryError extends ShopifyError {
    readonly response: Record<string, unknown>;
    headers?: Record<string, unknown>;
    constructor({ message, response, headers, }: {
        message: string;
        response: Record<string, unknown>;
        headers?: Record<string, unknown>;
    });
}
export declare class InvalidOAuthError extends ShopifyError {
}
export declare class BotActivityDetected extends ShopifyError {
}
export declare class CookieNotFound extends ShopifyError {
}
export declare class InvalidSession extends ShopifyError {
}
interface InvalidWebhookParams {
    message: string;
    response: AdapterResponse;
}
export declare class InvalidWebhookError extends ShopifyError {
    readonly response: AdapterResponse;
    constructor({ message, response }: InvalidWebhookParams);
}
export declare class MissingWebhookCallbackError extends InvalidWebhookError {
}
export declare class SessionStorageError extends ShopifyError {
}
export declare class MissingRequiredArgument extends ShopifyError {
}
export declare class UnsupportedClientType extends ShopifyError {
}
export declare class InvalidRequestError extends ShopifyError {
}
export declare class BillingError extends ShopifyError {
    readonly errorData: any;
    constructor({ message, errorData }: {
        message: string;
        errorData: any;
    });
}
export declare class FeatureDeprecatedError extends ShopifyError {
}
export {};
//# sourceMappingURL=error.d.ts.map