"use strict";
var chalk = require("chalk");
var fs = require("fs-extra");
var path = require("path");
var decompress_1 = require("./decompress");
// const outputPath = path.join(outputDir, req.path);
function writeFixture(fullPath, proxyRes, next) {
    console.log(chalk.magenta('[Stub server]') + " Writing fixture to: " + fullPath);
    try {
        // fs.accessSync(fullPath, 'wx')
        if (fs.existsSync(fullPath))
            return next(Error("[Stub server] Can not write fixture, file exists: " + fullPath));
        fs.mkdirpSync(path.dirname(fullPath));
        var write$ = fs.createWriteStream(fullPath);
        write$.on('error', function (e) { console.log('write$ error'); next(e); });
        // write$.on('close', () => {console.log('write$ close')})
        proxyRes
            .pipe(decompress_1.default(proxyRes.headers['content-encoding']))
            .pipe(write$);
    }
    catch (e) {
        console.error("[Stub server] fixture from api NOT written at path " + fullPath);
        next(e);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = writeFixture;
//# sourceMappingURL=writeFixture.js.map