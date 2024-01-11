"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const runtime_1 = require("../../runtime");
const adapter_1 = require("./adapter");
// For the purposes of this package, fetch correctly implements everything we need
(0, runtime_1.setAbstractFetchFunc)(node_fetch_1.default);
(0, runtime_1.setAbstractConvertRequestFunc)(adapter_1.nodeConvertRequest);
(0, runtime_1.setAbstractConvertIncomingResponseFunc)(adapter_1.nodeConvertIncomingResponse);
(0, runtime_1.setAbstractConvertResponseFunc)(adapter_1.nodeConvertAndSendResponse);
(0, runtime_1.setAbstractConvertHeadersFunc)(adapter_1.nodeConvertAndSetHeaders);
(0, runtime_1.setAbstractRuntimeString)(adapter_1.nodeRuntimeString);
(0, runtime_1.setCrypto)(crypto_1.default);
//# sourceMappingURL=index.js.map