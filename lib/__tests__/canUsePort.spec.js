"use strict";
var canUsePort_1 = require("../canUsePort");
describe('canUsePort()', function () {
    var testCases = [
        { port: 8000, expectedResult: true },
        { port: '8000', expectedResult: true },
        { port: undefined, expectedResult: false },
        { port: null, expectedResult: false },
        { port: NaN, expectedResult: false },
        { port: 'something', expectedResult: false },
        { port: 'omg3000', expectedResult: false },
    ];
    testCases.forEach(function (testCase) {
        it("should return " + testCase.expectedResult + " for " + testCase.port, function () {
            expect(canUsePort_1.default(testCase.port)).toBe(testCase.expectedResult);
        });
    });
});
//# sourceMappingURL=canUsePort.spec.js.map