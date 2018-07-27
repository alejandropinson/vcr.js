"use strict";
var chalk = require("chalk");
function requireUncached(mod) {
    delete require.cache[require.resolve(mod)];
    return require(mod);
}
function loadFixture(filePath) {
    var fixture;
    try {
        fixture = requireUncached(filePath);
        if (fixture.default && typeof fixture.default === 'function')
            return fixture.default;
        return fixture;
    }
    catch (e) {
        console.error(chalk.magenta('[Stub server]') + " ERROR in loadFixture: " + chalk.red(e.message));
        console.error(e.stack);
        throw e;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadFixture;
//# sourceMappingURL=loadFixture.js.map