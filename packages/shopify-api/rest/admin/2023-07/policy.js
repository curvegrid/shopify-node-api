"use strict";
/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = void 0;
const tslib_1 = require("tslib");
const base_1 = require("../../base");
const types_1 = require("../../../lib/types");
class Policy extends base_1.Base {
    static all(_a) {
        var { session } = _a, otherArgs = tslib_1.__rest(_a, ["session"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield this.baseFind({
                session: session,
                urlIds: {},
                params: Object.assign({}, otherArgs),
            });
            return response;
        });
    }
}
exports.Policy = Policy;
Policy.apiVersion = types_1.ApiVersion.July23;
Policy.hasOne = {};
Policy.hasMany = {};
Policy.paths = [
    { "http_method": "get", "operation": "get", "ids": [], "path": "policies.json" }
];
Policy.resourceNames = [
    {
        "singular": "policy",
        "plural": "policies"
    }
];
//# sourceMappingURL=policy.js.map