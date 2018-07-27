"use strict";
function encodeUrlParams(params) {
    if (params === void 0) { params = {}; }
    return Object.keys(params)
        .sort()
        .map(function (key) { return key + "=" + encodeURIComponent(params[key]); })
        .join('&');
}
exports.encodeUrlParams = encodeUrlParams;
//# sourceMappingURL=encodeUrlParams.js.map