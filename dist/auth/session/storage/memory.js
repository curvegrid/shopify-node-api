"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemorySessionStorage = void 0;
var tslib_1 = require("tslib");
var shop_validator_1 = require("../../../utils/shop-validator");
var MemorySessionStorage = /** @class */ (function () {
    function MemorySessionStorage() {
        this.sessions = {};
    }
    MemorySessionStorage.prototype.storeSession = function (session) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.sessions[session.id] = session;
                return [2 /*return*/, true];
            });
        });
    };
    MemorySessionStorage.prototype.loadSession = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.sessions[id] || undefined];
            });
        });
    };
    MemorySessionStorage.prototype.deleteSession = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.sessions[id]) {
                    delete this.sessions[id];
                }
                return [2 /*return*/, true];
            });
        });
    };
    MemorySessionStorage.prototype.deleteSessions = function (ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                ids.forEach(function (id) { return delete _this.sessions[id]; });
                return [2 /*return*/, true];
            });
        });
    };
    MemorySessionStorage.prototype.findSessionsByShop = function (shop) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cleanShop, results;
            return tslib_1.__generator(this, function (_a) {
                cleanShop = (0, shop_validator_1.sanitizeShop)(shop, true);
                results = Object.values(this.sessions).filter(function (session) { return session.shop === cleanShop; });
                return [2 /*return*/, results];
            });
        });
    };
    return MemorySessionStorage;
}());
exports.MemorySessionStorage = MemorySessionStorage;
