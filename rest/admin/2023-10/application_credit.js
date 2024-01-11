"use strict";
/***********************************************************************************************************************
* This file is auto-generated. If you have an issue, please create a GitHub issue.                                     *
***********************************************************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationCredit = void 0;
const tslib_1 = require("tslib");
const base_1 = require("../../base");
const types_1 = require("../../../lib/types");
const currency_1 = require("./currency");
class ApplicationCredit extends base_1.Base {
    static find({ session, id, fields = null }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.baseFind({
                session: session,
                urlIds: { "id": id },
                params: { "fields": fields },
            });
            return result.data ? result.data[0] : null;
        });
    }
    static all(_a) {
        var { session, fields = null } = _a, otherArgs = tslib_1.__rest(_a, ["session", "fields"]);
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield this.baseFind({
                session: session,
                urlIds: {},
                params: Object.assign({ "fields": fields }, otherArgs),
            });
            return response;
        });
    }
}
exports.ApplicationCredit = ApplicationCredit;
ApplicationCredit.apiVersion = types_1.ApiVersion.October23;
ApplicationCredit.hasOne = {
    "currency": currency_1.Currency
};
ApplicationCredit.hasMany = {};
ApplicationCredit.paths = [
    { "http_method": "get", "operation": "get", "ids": [], "path": "application_credits.json" },
    { "http_method": "get", "operation": "get", "ids": ["id"], "path": "application_credits/<id>.json" }
];
ApplicationCredit.resourceNames = [
    {
        "singular": "application_credit",
        "plural": "application_credits"
    }
];
//# sourceMappingURL=application_credit.js.map