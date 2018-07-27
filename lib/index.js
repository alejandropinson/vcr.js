"use strict";
var chalk = require("chalk");
var express = require("express");
var path = require("path");
var server_1 = require("./server");
var app = express();
var PORT = process.env.PORT || 3000;
// const realApiUrl = 'https://js-developer-second-round.herokuapp.com/api/v1';
var realApiUrl = 'http://localhost:5000';
app.use(server_1.default([path.join(__dirname, 'fixtures')], realApiUrl, path.join(__dirname, 'generatedFixtures')));
app.listen(PORT, '0.0.0.0', function (err) {
    if (err) {
        return console.error(err);
    }
    console.log(chalk.magenta('[Stub server]') + " listening at http://localhost:" + chalk.cyan(PORT) + "/");
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=index.js.map