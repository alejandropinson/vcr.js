"use strict";
var matcher_1 = require("../matcher");
var testCasesMatches = {
    '/jobs/{id}': [
        '/jobs/foo',
        '/jobs/100',
        '/jobs/0',
    ],
    '/jobs/{id}/site': [
        '/jobs/foo/site',
        '/jobs/100/site',
        '/jobs/0/site',
    ],
    '/jobs/1/site': [
        '/jobs/1/site',
    ]
};
var testCasesNotMatches = {
    '/jobs/{id}': [
        '/jobs/foo/sites',
        '/jobs/100/sites',
        '/jobs/0/sites',
        '/v2/jobs/0/sites',
        '/v2/jobs/0',
    ],
    '/jobs/{id}/site': [
        '/jobs/foo/sites',
        '/v2/jobs/0/site',
    ],
    '/jobs/1/site': [
        '/v2/jobs/1/site',
        '/jobs/1/sites',
    ]
};
var truthyWithMessage = function (test, message) {
    if (!test)
        console.error(message);
    expect(test).toEqual(true);
};
it('matcher matches request urls', function () {
    Object.keys(testCasesMatches).map(function (pattern) {
        return testCasesMatches[pattern].map(function (reqPath) {
            return truthyWithMessage(matcher_1.default(pattern, reqPath), "Should Match: " + pattern + " === " + reqPath);
        });
    });
});
it('matcher does not match request urls', function () {
    Object.keys(testCasesNotMatches).map(function (pattern) {
        return testCasesNotMatches[pattern].map(function (reqPath) {
            return truthyWithMessage(!matcher_1.default(pattern, reqPath), "Should Not Match: " + pattern + " === " + reqPath);
        });
    });
});
it('extracts params from path', function () {
    expect(matcher_1.extract('/jobs/{id}/site', '/jobs/100/site')).toEqual({ id: '100' });
    expect(matcher_1.extract('/jobs/{id}/site/{siteId}', '/jobs/101/site/3d')).toEqual({ id: '101', siteId: '3d' });
    expect(matcher_1.extract('/jobs/{id}/site/{id}', '/jobs/100/site/123')).toEqual({ id: '123' });
    expect(matcher_1.extract('/jobs/site', '/jobs/site')).toEqual({});
});
var endpoints = [
    {
        'endpoint': '/foo/1',
        'method': 'GET',
        'variants': {
            'default': '/absolutePat/foo/1/GET.default.json',
            'param1=foo&param2=bar': '/absolutePat/foo/1/GET.param1=foo&param2=bar.json',
            'unathorized': '/absolutePat/foo/1/GET.unathorized.json'
        }
    },
    {
        'endpoint': '/foo/{id}',
        'method': 'GET',
        'variants': {
            'default': '/absolutePat/foo/{id}/GET.default.json'
        }
    },
    {
        'endpoint': '/foo/1',
        'method': 'POST',
        'variants': {
            'default': '/absolutePat/foo/1/POST.default.json'
        }
    }
];
var findTestFixture = function (allEndpoints, request) {
    return matcher_1.findFixture(request, matcher_1.findEndpoint(allEndpoints, request));
};
it('should return fixture path for request', function () {
    expect(findTestFixture(endpoints, { path: '/foo/1', method: 'GET' })).toBe('/absolutePat/foo/1/GET.default.json');
});
it('should return fixture path for request with query', function () {
    expect(findTestFixture(endpoints, { path: '/foo/1', query: { param2: 'bar', param1: 'foo' }, method: 'GET' })).toBe('/absolutePat/foo/1/GET.param1=foo&param2=bar.json');
});
it('should return fixture path for request with dynamic path', function () {
    expect(findTestFixture(endpoints, { path: '/foo/10', method: 'GET' })).toBe('/absolutePat/foo/{id}/GET.default.json');
});
it('should return false when fixture for request not found by method', function () {
    expect(findTestFixture(endpoints, { path: '/foo/1', method: 'PUT' })).toBe(null);
});
it('should return false when fixture for request not found', function () {
    expect(findTestFixture(endpoints, { path: '/foo', method: 'GET' })).toBe(null);
});
it('should return fixture variant for request', function () {
    expect(findTestFixture(endpoints, { path: '/foo/1', method: 'GET', cookies: { variants: '/foo/1/GET.unathorized,/foo/2/GET.other' } })).toBe('/absolutePat/foo/1/GET.unathorized.json');
});
it('should return fixture default variant for request with unknown variant', function () {
    expect(findTestFixture(endpoints, { path: '/foo/1', method: 'GET', cookies: { variants: '/foo/1/GET.unknown' } })).toBe('/absolutePat/foo/1/GET.default.json');
});
var testCases = [
    {
        endpoint: '/foo',
        cookies: { variants: '/otherEndpoint/GET.unauthorized' },
        path: '/foo',
        method: 'GET',
        variant: 'default',
    },
    {
        endpoint: '/foo/{id}',
        cookies: { variants: '/foo/{id}/GET.unauthorized' },
        path: '/foo/1',
        method: 'GET',
        variant: 'unauthorized',
    },
    {
        endpoint: '/foo/1',
        cookies: { variants: '/foo/1/GET.unauthorized' },
        path: '/foo/1',
        method: 'GET',
        variant: 'unauthorized',
    },
    {
        endpoint: '/foo/{id}',
        cookies: { variants: '/foo/1/GET.unauthorized' },
        path: '/foo/1',
        method: 'GET',
        variant: 'unauthorized',
    },
    {
        endpoint: '/foo/1',
        cookies: { variants: '/foo/{id}/GET.unauthorized' },
        path: '/foo/1',
        method: 'GET',
        variant: 'unauthorized',
    },
    {
        endpoint: '/foo',
        cookies: { variants: '/foo/GET.unauthorized' },
        path: '/foo',
        method: 'GET',
        variant: 'unauthorized',
    },
    {
        endpoint: '/foo',
        cookies: { variants: '/foo/POST.unauthorized' },
        path: '/foo',
        method: 'GET',
        variant: 'default',
    },
    {
        endpoint: '/foo',
        cookies: { variants: '/foo/GET.unauthorized' },
        path: '/foo',
        method: 'POST',
        variant: 'default',
    },
    {
        endpoint: '/noVariants',
        cookies: {},
        path: '/noVariants',
        method: 'GET',
        variant: 'default',
    },
    {
        endpoint: '/staticOverDynamicSorting/{dynamic}',
        cookies: { variants: '/staticOverDynamicSorting/{dynamic}/GET.dynamic,/staticOverDynamicSorting/static/GET.static' },
        path: '/staticOverDynamicSorting/static',
        method: 'GET',
        variant: 'static',
    },
];
var equalWithMessage = function (test, result, message) {
    if (test !== result)
        console.error(message);
    expect(test).toEqual(result);
};
it('extractVariant returns correct variant', function () {
    testCases.map(function (_a) {
        var endpoint = _a.endpoint, cookies = _a.cookies, path = _a.path, method = _a.method, variant = _a.variant;
        var result = matcher_1.extractVariant({ endpoint: endpoint }, { cookies: cookies, path: path, method: method });
        equalWithMessage(result, variant, "testing: " + path + "/" + method + " should return " + variant + " but got " + result + " COOKIES: " + JSON.stringify(cookies));
    });
});
//# sourceMappingURL=matcher.spec.js.map