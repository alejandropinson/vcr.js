"use strict";
var getFixturePath_1 = require("./getFixturePath");
function getProxyResponseHeaders(req, apiReqURL, outputDir) {
    var proxyHeaders = {
        'x-proxied-by': 'Stub server proxy middleware',
        'x-proxied-to': apiReqURL,
        'x-write-fixture-on-the-disc': !!outputDir ? 'ENABLED' : 'DISABLED',
    };
    if (!!outputDir)
        proxyHeaders['x-write-fixture-attempt-path'] = getFixturePath_1.default(req, outputDir);
    return proxyHeaders;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getProxyResponseHeaders;
;
//# sourceMappingURL=getProxyResponseHeaders.js.map