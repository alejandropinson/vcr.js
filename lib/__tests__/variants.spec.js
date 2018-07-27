"use strict";
var variants_1 = require("../variants");
it('should resolve correctly conflicts', function () {
    var input = ['/foo/bar/GET.unauthorized', '/fooBar/GET.blacklisted', '/fooBar/GET.unauthorized'];
    var output = ['/foo/bar/GET.unauthorized', '/fooBar/GET.unauthorized'];
    expect(variants_1.cleanupVariantsConflicts(input)).toEqual(output);
});
//# sourceMappingURL=variants.spec.js.map