"use strict";
/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceFeedback = void 0;
const tslib_1 = require("tslib");
const base_1 = require("../../base");
const types_1 = require("../../../lib/types");
class ResourceFeedback extends base_1.Base {
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
exports.ResourceFeedback = ResourceFeedback;
ResourceFeedback.apiVersion = types_1.ApiVersion.April23;
ResourceFeedback.hasOne = {};
ResourceFeedback.hasMany = {};
ResourceFeedback.paths = [
    { "http_method": "get", "operation": "get", "ids": [], "path": "resource_feedback.json" },
    { "http_method": "post", "operation": "post", "ids": [], "path": "resource_feedback.json" }
];
ResourceFeedback.resourceNames = [
    {
        "singular": "resource_feedback",
        "plural": "resource_feedbacks"
    }
];
//# sourceMappingURL=resource_feedback.js.map