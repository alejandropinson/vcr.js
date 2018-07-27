"use strict";
var encodeUrlParams_1 = require("../../encodeUrlParams");
function getFixtureVariant(req, defaultVariant, cookieName) {
    if (defaultVariant === void 0) { defaultVariant = 'default'; }
    if (cookieName === void 0) { cookieName = 'record_fixture_variant'; }
    // const foundFixturePath = foundEndpoint && findFixture(req, foundEndpoint);
    var queryVariant = (req.query && Object.keys(req.query).length > 0) ? encodeUrlParams_1.encodeUrlParams(req.query) : null;
    return req.cookies[cookieName] || queryVariant || defaultVariant;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getFixtureVariant;
//# sourceMappingURL=getFixtureVariant.js.map