"use strict";
var psTree = require("ps-tree");
function killProcessTree(pid, signal) {
    if (signal === void 0) { signal = 'SIGKILL'; }
    psTree(pid, function (err, children) {
        return [pid]
            .concat(children.map(function (_a) {
            var PID = _a.PID;
            return PID;
        }))
            .forEach(function (tpid) {
            // console.log(`[killProcessTree] gonna kill ${tpid} !!! (${signal})`);
            try {
                process.kill(tpid, signal);
            }
            catch (e) {
                console.log("[killProcessTree] ERROR killing PID: " + tpid + " ERR: " + e);
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = killProcessTree;
;
//# sourceMappingURL=killProcessTree.js.map