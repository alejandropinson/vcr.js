"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var chalk = require("chalk");
var request = require("request");
var createProxyRequestOptions_1 = require("./createProxyRequestOptions");
var getFixturePath_1 = require("./getFixturePath");
var getProxyResponseHeaders_1 = require("./getProxyResponseHeaders");
var writeFixture_1 = require("./writeFixture");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (realApiBaseUrl, outputDir) {
    return function (req, res, next) {
        if (req.path === '/')
            return next();
        if (req.originalUrl.indexOf('@') !== -1) {
            var urlParts = req.originalUrl.split('/').splice(2);
            console.log(urlParts);
            req.originalUrl = '/' + urlParts.join('/');
        }
        var apiReqURL = "" + realApiBaseUrl + req.originalUrl;
        // pipe request from stub server to real API
        req
            .pipe(request(apiReqURL, createProxyRequestOptions_1.default(req, realApiBaseUrl)))
            .on('error', function (e) { return next(e); })
            .on('response', function (proxyRes) {
            // response from real API, if not OK, pass control to next
            if (!proxyRes.statusCode || proxyRes.statusCode < 200 || proxyRes.statusCode >= 300) {
                console.log(chalk.magenta('[Stub server]') + " proxy request to " + chalk.yellow(realApiBaseUrl + req.originalUrl) + " ended up with " + chalk.red("" + proxyRes.statusCode));
                return next();
            }
            // response from API is OK
            console.log(chalk.magenta('[Stub server]') + " proxy request to " + chalk.yellow(realApiBaseUrl + req.originalUrl) + " ended up with " + chalk.green("" + proxyRes.statusCode) + " returning its response");
            var headers = __assign({}, proxyRes.headers, getProxyResponseHeaders_1.default(req, apiReqURL, outputDir));
            res.writeHead(proxyRes.statusCode || 500, headers);
            // pipe API response to client till the 'end'
            proxyRes.pipe(res);
            proxyRes.on('error', function (e) { console.log('proxyRes.on error', e); next(e); });
            proxyRes.on('end', function () { res.end(); });
            // write response as fixture on the disc
            if (outputDir) {
                var fullPath = getFixturePath_1.default(req, outputDir);
                writeFixture_1.default(fullPath, proxyRes, next);
            }
        });
    };
};
//# sourceMappingURL=index.js.map