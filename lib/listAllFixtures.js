"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var fs = require("fs");
var path = require("path");
;
var SUPPORTED_METHODS = new Set(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);
// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function (dir, filelist) {
    if (filelist === void 0) { filelist = []; }
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        }
        else {
            filelist.push(filePath);
        }
    });
    return filelist;
};
var isFixture = function (absolutePath) {
    var extensionSupported = /\.(js|json)$/.test(absolutePath);
    var fixtureMethod = path.basename(absolutePath).split('.')[0].toUpperCase();
    var methodSupported = SUPPORTED_METHODS.has(fixtureMethod);
    return extensionSupported && methodSupported;
};
exports.listDirectoryFixtures = function (basePath) {
    return walkSync(basePath)
        .filter(isFixture)
        .reduce(function (acc, absolute) {
        return (__assign({}, acc, (_a = {}, _a[path.relative(basePath, absolute).replace(/\\/g, '/')] = absolute, _a)));
        var _a;
    }, {});
};
var listAllFixtures = function (dirs) {
    return [].concat(dirs)
        .reduce(function (acc, dir) { return (__assign({}, acc, exports.listDirectoryFixtures(dir))); }, {});
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = listAllFixtures;
//# sourceMappingURL=listAllFixtures.js.map