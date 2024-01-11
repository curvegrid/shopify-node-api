"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./admin/types"), exports);
tslib_1.__exportStar(require("./graphql_proxy/types"), exports);
/* eslint-disable @shopify/typescript/prefer-pascal-case-enums */
var DataType;
(function (DataType) {
    DataType["JSON"] = "application/json";
    DataType["GraphQL"] = "application/graphql";
    DataType["URLEncoded"] = "application/x-www-form-urlencoded";
})(DataType || (exports.DataType = DataType = {}));
//# sourceMappingURL=types.js.map