import { LogContent } from '@shopify/admin-api-client';
import { ConfigInterface } from '../base-types';
import { AbstractFetchFunc } from '../../runtime';
export declare function getUserAgent(config: ConfigInterface): string;
export declare function clientLoggerFactory(config: ConfigInterface): (logContent: LogContent) => void;
export declare function throwFailedRequest(body: any, response: Awaited<ReturnType<AbstractFetchFunc>>, retry?: boolean): never;
//# sourceMappingURL=common.d.ts.map