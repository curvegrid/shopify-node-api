import { AdminRestApiClient } from '@shopify/admin-api-client';
import { ConfigInterface } from '../../../base-types';
import { RestRequestReturn, RestClientParams } from '../types';
import type { GetRequestParams, PutRequestParams, PostRequestParams, DeleteRequestParams } from '../../types';
export interface RestClientClassParams {
    config: ConfigInterface;
    formatPaths?: boolean;
}
export declare class RestClient {
    static config: ConfigInterface;
    static formatPaths: boolean;
    static LINK_HEADER_REGEXP: RegExp;
    static DEFAULT_LIMIT: string;
    static RETRY_WAIT_TIME: number;
    static readonly DEPRECATION_ALERT_DELAY = 300000;
    loggedDeprecations: Record<string, number>;
    readonly client: AdminRestApiClient;
    constructor({ session, apiVersion }: RestClientParams);
    /**
     * Performs a GET request on the given path.
     */
    get<T = any>(params: GetRequestParams): Promise<RestRequestReturn<T>>;
    /**
     * Performs a POST request on the given path.
     */
    post<T = any>(params: PostRequestParams): Promise<RestRequestReturn<T>>;
    /**
     * Performs a PUT request on the given path.
     */
    put<T = any>(params: PutRequestParams): Promise<RestRequestReturn<T>>;
    /**
     * Performs a DELETE request on the given path.
     */
    delete<T = any>(params: DeleteRequestParams): Promise<RestRequestReturn<T>>;
    private request;
    private restClass;
    private buildRequestParams;
    private logDeprecations;
}
export declare function restClientClass(params: RestClientClassParams): typeof RestClient;
//# sourceMappingURL=client.d.ts.map