"use strict";
var through = require("through");
var zlib = require("zlib");
var decompress = function (encoding) {
    switch (encoding) {
        // or, just use zlib.createUnzip() to handle both cases
        case 'gzip': return zlib.createGunzip();
        case 'deflate': return zlib.createInflate();
        default: return through();
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decompress;
//# sourceMappingURL=decompress.js.map