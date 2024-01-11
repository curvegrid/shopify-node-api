import { ConfigInterface } from '../base-types';
import { FeatureEnabled, FutureFlagOptions } from '../../future/flags';
import { OAuthBegin, OAuthCallback } from './oauth/oauth';
import { Nonce } from './oauth/nonce';
import { SafeCompare } from './oauth/safe-compare';
import { GetEmbeddedAppUrl, BuildEmbeddedAppUrl } from './get-embedded-app-url';
import { TokenExchange } from './oauth/token-exchange';
export declare function shopifyAuth<Config extends ConfigInterface>(config: Config): ShopifyAuth<Config['future']>;
export type ShopifyAuth<Future extends FutureFlagOptions> = {
    begin: OAuthBegin;
    callback: OAuthCallback;
    nonce: Nonce;
    safeCompare: SafeCompare;
    getEmbeddedAppUrl: GetEmbeddedAppUrl;
    buildEmbeddedAppUrl: BuildEmbeddedAppUrl;
} & (FeatureEnabled<Future, 'unstable_tokenExchange'> extends true ? {
    tokenExchange: TokenExchange;
} : Record<string, never>);
//# sourceMappingURL=index.d.ts.map