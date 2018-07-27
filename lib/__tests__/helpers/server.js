"use strict";
var express = require("express");
var handleMockRequest_1 = require("./handleMockRequest");
var app = express();
app.use(handleMockRequest_1.default);
app.listen(5000, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log("listening at http://localhost:5000/");
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=server.js.map