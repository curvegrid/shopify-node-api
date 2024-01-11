/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
import { Base, FindAllResponse } from '../../base';
import { ResourcePath, ResourceNames } from '../../types';
import { Session } from '../../../lib/session/session';
import { ApiVersion } from '../../../lib/types';
interface AllArgs {
    [key: string]: unknown;
    session: Session;
}
export declare class AccessScope extends Base {
    static apiVersion: ApiVersion;
    protected static hasOne: {
        [key: string]: typeof Base;
    };
    protected static hasMany: {
        [key: string]: typeof Base;
    };
    protected static customPrefix: string | null;
    protected static paths: ResourcePath[];
    protected static resourceNames: ResourceNames[];
    static all({ session, ...otherArgs }: AllArgs): Promise<FindAllResponse<AccessScope>>;
    handle: string | null;
    access_scopes: {
        [key: string]: unknown;
    }[] | null;
}
export {};
//# sourceMappingURL=access_scope.d.ts.map