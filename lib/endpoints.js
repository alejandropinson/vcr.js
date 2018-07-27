"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var path = require("path");
function joinEndpointVariants(acc, val) {
    var key = val.endpoint + " " + val.method;
    return _a = {},
        _a[key] = __assign({}, val, { variants: __assign({}, (acc[key] || {}).variants, val.variants) }),
        _a;
    var _a;
}
function extractEndpointsIntoObject(fixtures) {
    return Object
        .keys(fixtures)
        .map(function (relative) { return endpoint(relative, fixtures[relative]); })
        .reduce(function (acc, val) { return (__assign({}, acc, joinEndpointVariants(acc, val))); }, {});
}
exports.extractEndpointsIntoObject = extractEndpointsIntoObject;
function extractEndpoints(fixtures) {
    var endpoints = extractEndpointsIntoObject(fixtures);
    return Object.keys(endpoints).map(function (key) { return endpoints[key]; });
}
exports.extractEndpoints = extractEndpoints;
function endpoint(relativePath, absolutePath) {
    var _a = path
        .basename(relativePath, path.extname(relativePath))
        .split('.'), method = _a[0], variantParts = _a.slice(1);
    var variant = variantParts.join('.');
    var endpoint = ("/" + path.dirname(relativePath)).replace(/\\/g, '/'); // WINdows
    return {
        endpoint: endpoint,
        method: method,
        variants: (_b = {},
            _b[variant] = absolutePath,
            _b)
    };
    var _b;
}
exports.endpoint = endpoint;
//# sourceMappingURL=endpoints.js.map