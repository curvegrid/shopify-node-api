import { GraphqlTestRequest, TestResponse } from './test_config_types';
interface HandleGraphqlTestOptions {
    apiServer: string;
    testRequest: GraphqlTestRequest;
    expectedResponse: TestResponse;
}
export declare const handleGraphqlTest: ({ apiServer, testRequest, expectedResponse, }: HandleGraphqlTestOptions) => Promise<{
    testPassed: boolean;
    testFailedDebug: string;
}>;
export {};
//# sourceMappingURL=test_handle_graphql.d.ts.map