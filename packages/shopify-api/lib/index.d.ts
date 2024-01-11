import { ShopifyRestResources } from '../rest/types';
import { FutureFlagOptions } from '../future/flags';
import { ConfigParams, ConfigInterface } from './base-types';
import { ShopifyClients } from './clients';
import { ShopifyAuth } from './auth';
import { ShopifySession } from './session';
import { ShopifyUtils } from './utils';
import { ShopifyWebhooks } from './webhooks';
import { ShopifyBilling } from './billing';
import { ShopifyLogger } from './logger';
export * from './error';
export * from './session/classes';
export * from '../rest/types';
export * from './types';
export * from './base-types';
export * from './auth/types';
export * from './billing/types';
export * from './clients/types';
export * from './session/types';
export * from './webhooks/types';
export interface Shopify<Params extends ConfigParams = ConfigParams, Resources extends ShopifyRestResources = ShopifyRestResources, Future extends FutureFlagOptions = FutureFlagOptions> {
    config: ConfigInterface<Params>;
    clients: ShopifyClients;
    auth: ShopifyAuth<Future>;
    session: ShopifySession;
    utils: ShopifyUtils;
    webhooks: ShopifyWebhooks;
    billing: ShopifyBilling;
    logger: ShopifyLogger;
    rest: Resources;
}
export declare function shopifyApi<Params extends ConfigParams<Resources, Future>, Resources extends ShopifyRestResources, Future extends FutureFlagOptions>({ future, restResources, ...config }: {
    future?: Future;
    restResources?: Resources;
} & Params): Shopify<Params, Resources, Future>;
//# sourceMappingURL=index.d.ts.map