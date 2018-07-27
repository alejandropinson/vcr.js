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
var named_regexp_1 = require("named-regexp");
var encodeUrlParams_1 = require("./encodeUrlParams");
function convertEndpointToPatternMatcher(endpoint) {
    return endpoint.indexOf('{') > -1
        ? endpoint.replace(/\{/gi, '(:<').replace(/\}/gi, '>[^\/]+)')
        : endpoint;
}
exports.convertEndpointToPatternMatcher = convertEndpointToPatternMatcher;
function matcher(pattern, path) {
    return named_regexp_1.named(new RegExp("^" + convertEndpointToPatternMatcher(pattern) + "$")).test(path);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = matcher;
function extract(pattern, path) {
    var matched = named_regexp_1.named(new RegExp("^" + convertEndpointToPatternMatcher(pattern) + "$")).exec(path);
    if (!matched)
        return {};
    var captures = matched.captures;
    return Object.keys(captures).reduce(function (acc, key) {
        return (__assign({}, acc, (_a = {}, _a[key] = matched.capture(key), _a)));
        var _a;
    }, {});
}
exports.extract = extract;
function extractVariantsFromRequest(req) {
    return ((req.cookies || {}).variants || '').split(',').sort();
}
exports.extractVariantsFromRequest = extractVariantsFromRequest;
function extractVariant(foundEndpoint, req) {
    if (req.query && Object.keys(req.query).length > 0) {
        var queryVariant = encodeUrlParams_1.encodeUrlParams(req.query);
        if (Object.keys(foundEndpoint.variants).indexOf(queryVariant) !== -1) {
            return queryVariant;
        }
    }
    // endpoint      /foo/{id}
    // cookieVariant /foo/{id}/GET.variantName
    return extractVariantsFromRequest(req)
        .map(function (cookieVariant) {
        var cookiePath = path.dirname(cookieVariant);
        var _a = path.basename(cookieVariant).split('.'), method = _a[0], variant = _a[1];
        return ((matcher(foundEndpoint.endpoint, cookiePath) ||
            matcher(cookiePath, req.path) ||
            foundEndpoint.endpoint === cookiePath) && method === req.method)
            ? variant
            : null;
    })
        .filter(function (x) { return !!x; })[0] || 'default';
}
exports.extractVariant = extractVariant;
function findEndpoint(endpoints, req) {
    return endpoints.find(function (e) { return e.method === req.method && matcher(e.endpoint, req.path); });
}
exports.findEndpoint = findEndpoint;
function findFixture(req, foundEndpoint) {
    if (!foundEndpoint)
        return null;
    var variant = extractVariant(foundEndpoint, req);
    return foundEndpoint.variants[variant] || foundEndpoint.variants['default'] || null;
}
exports.findFixture = findFixture;
//# sourceMappingURL=matcher.js.map