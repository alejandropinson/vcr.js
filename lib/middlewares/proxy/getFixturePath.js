"use strict";
var path = require("path");
var getFixtureVariant_1 = require("./getFixtureVariant");
function getFixturePath(req, outputDir) {
    var variant = getFixtureVariant_1.default(req);
    var dirName = req.path.replace(/^\//, '');
    var fileName = req.method.toUpperCase() + "." + variant + ".json";
    return path.join(outputDir, dirName, fileName);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFixturePath;
//# sourceMappingURL=getFixturePath.js.map