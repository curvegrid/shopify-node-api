import { AdapterArgs } from '../../runtime/types';
import { Session } from '../session/session';
export declare enum DeliveryMethod {
    Http = "http",
    EventBridge = "eventbridge",
    PubSub = "pubsub"
}
export type WebhookHandlerFunction = (topic: string, shop_domain: string, body: string, webhookId: string, apiVersion?: string) => Promise<void>;
interface BaseWebhookHandler {
    id?: string;
    includeFields?: string[];
    metafieldNamespaces?: string[];
}
export interface HttpWebhookHandler extends BaseWebhookHandler {
    deliveryMethod: DeliveryMethod.Http;
    callbackUrl: string;
}
export interface HttpWebhookHandlerWithCallback extends HttpWebhookHandler {
    callback: WebhookHandlerFunction;
}
export interface EventBridgeWebhookHandler extends BaseWebhookHandler {
    deliveryMethod: DeliveryMethod.EventBridge;
    arn: string;
}
export interface PubSubWebhookHandler extends BaseWebhookHandler {
    deliveryMethod: DeliveryMethod.PubSub;
    pubSubProject: string;
    pubSubTopic: string;
}
export type WebhookHandler = HttpWebhookHandler | HttpWebhookHandlerWithCallback | EventBridgeWebhookHandler | PubSubWebhookHandler;
export type WebhookRegistry<Handler extends WebhookHandler = WebhookHandler> = Record<string, Handler[]>;
export declare enum WebhookOperation {
    Create = "create",
    Update = "update",
    Delete = "delete"
}
export interface RegisterParams {
    session: Session;
}
export interface RegisterResult {
    success: boolean;
    deliveryMethod: DeliveryMethod;
    result: unknown;
    operation: WebhookOperation;
}
export type RegisterReturn = Record<string, RegisterResult[]>;
export interface WebhookCheckResponseNode<T = {
    endpoint: {
        __typename: 'WebhookHttpEndpoint';
        callbackUrl: string;
    } | {
        __typename: 'WebhookEventBridgeEndpoint';
        arn: string;
    } | {
        __typename: 'WebhookPubSubEndpoint';
        pubSubProject: string;
        pubSubTopic: string;
    };
}> {
    node: {
        id: string;
        topic: string;
        includeFields: string[];
        metafieldNamespaces: string[];
    } & T;
}
export interface WebhookCheckResponse<T = WebhookCheckResponseNode> {
    webhookSubscriptions: {
        edges: T[];
        pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
        };
    };
}
export type AddHandlersParams = Record<string, WebhookHandler | WebhookHandler[]>;
export interface WebhookProcessParams extends AdapterArgs {
    rawBody: string;
}
export interface WebhookValidateParams extends WebhookProcessParams {
}
export declare enum WebhookValidationErrorReason {
    MissingHeaders = "missing_headers",
    MissingBody = "missing_body",
    InvalidHmac = "invalid_hmac"
}
export interface WebhookFields {
    webhookId: string;
    apiVersion: string;
    domain: string;
    hmac: string;
    topic: string;
}
export interface WebhookValidationInvalid {
    valid: false;
    reason: WebhookValidationErrorReason;
}
export interface WebhookValidationMissingHeaders extends WebhookValidationInvalid {
    reason: WebhookValidationErrorReason.MissingHeaders;
    missingHeaders: string[];
}
export interface WebhookValidationValid extends WebhookFields {
    valid: true;
}
export type WebhookValidation = WebhookValidationValid | WebhookValidationInvalid | WebhookValidationMissingHeaders;
export {};
//# sourceMappingURL=types.d.ts.map