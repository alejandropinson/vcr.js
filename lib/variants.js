"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function cleanupVariantsConflicts(variants) {
    var variantsMap = variants.reduce(function (acc, variant) {
        var _a = variant.split('.'), path = _a[0], name = _a[1];
        if (!path || !name)
            return acc;
        return __assign({}, acc, (_b = {}, _b[path] = name, _b));
        var _b;
    }, {});
    return Object.keys(variantsMap).map(function (path) { return [path, variantsMap[path]].join('.'); });
}
exports.cleanupVariantsConflicts = cleanupVariantsConflicts;
//# sourceMappingURL=variants.js.map