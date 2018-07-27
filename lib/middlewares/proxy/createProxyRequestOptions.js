"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var url = require("url");
var path = require("path");
var allowedEncodings = ['deflate', 'gzip'];
function createProxyRequestOptions(req, realApiBaseUrl) {
    // create options for request to real API
    var uri = url.parse(realApiBaseUrl, true);
    var options = __assign({}, uri, { method: req.method, rejectUnauthorized: false, requestCert: false, path: path.join(uri.path, req.url), headers: req.headers, port: parseInt(uri.port || '', 10) || undefined });
    delete options.headers['host']; // tslint:disable-line:no-string-literal
    var givenEncodings = ("" + options.headers['accept-encoding']).split(',').map(function (x) { return x.trim(); }); // tslint:disable-line:no-string-literal
    options.headers['accept-encoding'] = allowedEncodings.filter(function (e) { return givenEncodings.indexOf(e) !== -1; })[0];
    return options;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createProxyRequestOptions;
//# sourceMappingURL=createProxyRequestOptions.js.map