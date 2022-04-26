"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batteryOfTests = void 0;
var tslib_1 = require("tslib");
var session_1 = require("../../session");
function batteryOfTests(storageFactory) {
    var _this = this;
    it('can store and delete offline sessions', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var storage, sessionId, session;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storageFactory()];
                case 1:
                    storage = _a.sent();
                    sessionId = 'test_session';
                    session = new session_1.Session(sessionId, 'shop', 'state', false);
                    return [4 /*yield*/, expect(storage.storeSession(session)).resolves.toBe(true)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, expect(storage.loadSession(sessionId)).resolves.toEqual(session)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, expect(storage.storeSession(session)).resolves.toBe(true)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, expect(storage.loadSession(sessionId)).resolves.toEqual(session)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, expect(storage.deleteSession(sessionId)).resolves.toBe(true)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, expect(storage.loadSession(sessionId)).resolves.toBeUndefined()];
                case 7:
                    _a.sent();
                    // Deleting a non-existing session should work
                    return [4 /*yield*/, expect(storage.deleteSession(sessionId)).resolves.toBe(true)];
                case 8:
                    // Deleting a non-existing session should work
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('can store and delete sessions with online tokens', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var storage, sessionId, session;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storageFactory()];
                case 1:
                    storage = _a.sent();
                    sessionId = 'test_session';
                    session = new session_1.Session(sessionId, 'shop', 'state', true);
                    return [4 /*yield*/, expect(storage.storeSession(session)).resolves.toBe(true)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, expect(storage.loadSession(sessionId)).resolves.toEqual(session)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('wrong ids return null sessions', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var storage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storageFactory()];
                case 1:
                    storage = _a.sent();
                    return [4 /*yield*/, expect(storage.loadSession('not_a_session_id')).resolves.toBeUndefined()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.batteryOfTests = batteryOfTests;
