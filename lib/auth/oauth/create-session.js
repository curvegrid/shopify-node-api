"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const session_1 = require("../../session/session");
const logger_1 = require("../../logger");
const session_utils_1 = require("../../session/session-utils");
function createSession({ config, accessTokenResponse, shop, state, }) {
    const associatedUser = accessTokenResponse
        .associated_user;
    const isOnline = Boolean(associatedUser);
    (0, logger_1.logger)(config).info('Creating new session', { shop, isOnline });
    if (isOnline) {
        let sessionId;
        const responseBody = accessTokenResponse;
        const { access_token, scope } = responseBody, rest = tslib_1.__rest(responseBody, ["access_token", "scope"]);
        const sessionExpiration = new Date(Date.now() + responseBody.expires_in * 1000);
        if (config.isEmbeddedApp) {
            sessionId = (0, session_utils_1.getJwtSessionId)(config)(shop, `${rest.associated_user.id}`);
        }
        else {
            sessionId = (0, uuid_1.v4)();
        }
        return new session_1.Session({
            id: sessionId,
            shop,
            state,
            isOnline,
            accessToken: access_token,
            scope,
            expires: sessionExpiration,
            onlineAccessInfo: rest,
        });
    }
    else {
        return new session_1.Session({
            id: (0, session_utils_1.getOfflineId)(config)(shop),
            shop,
            state,
            isOnline,
            accessToken: accessTokenResponse.access_token,
            scope: accessTokenResponse.scope,
        });
    }
}
exports.createSession = createSession;
//# sourceMappingURL=create-session.js.map