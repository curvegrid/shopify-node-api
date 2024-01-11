import { ConfigInterface } from '../base-types';
export declare function shopifyWebhooks(config: ConfigInterface): {
    addHandlers: (handlersToAdd: import("./types").AddHandlersParams) => void;
    getTopicsAdded: () => string[];
    getHandlers: (topic: string) => import("./types").WebhookHandler[];
    register: ({ session, }: import("./types").RegisterParams) => Promise<import("./types").RegisterReturn>;
    process: ({ rawBody, ...adapterArgs }: import("./types").WebhookProcessParams) => Promise<any>;
    validate: ({ rawBody, ...adapterArgs }: import("./types").WebhookValidateParams) => Promise<import("./types").WebhookValidation>;
};
export type ShopifyWebhooks = ReturnType<typeof shopifyWebhooks>;
//# sourceMappingURL=index.d.ts.map