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
var cookieParser = require("cookie-parser");
var express = require("express");
var cors = require("cors");
var morgan = require("morgan");
var listAllFixtures_1 = require("./listAllFixtures");
var loadFixture_1 = require("./loadFixture");
var proxy_1 = require("./middlewares/proxy");
var variants_1 = require("./variants");
var endpoints_1 = require("./endpoints");
var matcher_1 = require("./matcher");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (fixtureDirs, realApiBaseUrl, outputDir) {
    if (fixtureDirs === void 0) { fixtureDirs = []; }
    var app = express();
    app.use(function (req, res, next) {
        // needed for ajax requests from app - fetch init.credentials must be set to pass cookies with ajax
        // without following cors setup client blocks response
        cors({ origin: req.get('Origin'), credentials: true })(req, res, next);
    });
    app.use(cookieParser());
    app.use(morgan(chalk.magenta('[Stub server]') + " " + chalk.green(':method') + " :url " + chalk.magenta(':status') + " " + chalk.cyan(':response-time ms') + " HTTP/:http-version :date[iso]"));
    console.log(chalk.magenta('[Stub server]') + " looking for fixtures in:");
    console.log(chalk.yellow(fixtureDirs.join(',')));
    console.log(chalk.magenta('[Stub server]') + " found fixtures:");
    console.log(endpoints_1.extractEndpoints(listAllFixtures_1.default(fixtureDirs)).map(function (e) {
        return chalk.green(e.method) + " " + e.endpoint + " { " + chalk.yellow(Object.keys(e.variants).join(', ')) + " }";
    }).join('\n'));
    if (realApiBaseUrl) {
        console.log(chalk.magenta('[Stub server]') + " not found fixtures are handled by:");
        console.log(chalk.yellow(realApiBaseUrl));
        if (outputDir) {
            console.log(chalk.magenta('[Stub server]') + " resolved fixtures from proxy will be saved to:");
            console.log(chalk.yellow(outputDir));
        }
    }
    // Variants handler
    app.get('/variants', function (req, res, next) {
        var variants = matcher_1.extractVariantsFromRequest(req);
        if (req.query.set)
            variants = req.query.set.split(',');
        else if (req.query.add)
            variants = variants_1.cleanupVariantsConflicts(variants.concat(req.query.add.split(',')));
        else if (req.query.clear)
            variants = [];
        res
            .cookie('variants', variants.join(','), { encode: String })
            .json({
            variants: variants,
            possibleVariants: endpoints_1.extractEndpoints(listAllFixtures_1.default(fixtureDirs)).reduce(function (acc, endpoint) {
                return acc.concat(Object.keys(endpoint.variants).map(function (variant) { return endpoint.endpoint + "/" + endpoint.method + "." + variant; }));
            }, [])
        });
    });
    // Resolve fixture
    app.use(function (req, res, next) {
        var endpoints = endpoints_1.extractEndpoints(listAllFixtures_1.default(fixtureDirs));
        var foundEndpoint = matcher_1.findEndpoint(endpoints, req);
        var foundFixturePath = foundEndpoint && matcher_1.findFixture(req, foundEndpoint);
        if (foundEndpoint && foundFixturePath) {
            var fixture = loadFixture_1.default(foundFixturePath);
            req.params = __assign({}, req.params, matcher_1.extract(foundEndpoint.endpoint, req.path));
            console.log(chalk.magenta('[Stub server]') + " using fixture from " + chalk.yellow(foundFixturePath));
            typeof fixture === 'function' ? fixture(req, res, next) : res.json(fixture);
        }
        else {
            next();
        }
    });
    // Proxy to real API
    if (realApiBaseUrl) {
        app.use(proxy_1.default(realApiBaseUrl, outputDir));
    }
    // Fallback path for displaying all possible endpoints
    app.use(function (req, res, next) {
        var endpoints = endpoints_1.extractEndpoints(listAllFixtures_1.default(fixtureDirs));
        var matchedEndpoints = endpoints.filter(function (e) { return e.method === req.method && e.endpoint.indexOf(req.path) > -1; });
        res.status(404).json({
            message: "STUB SERVER: Sorry but we couldn't find any fixture by " + req.method + " " + req.path,
            matchedEndpoints: matchedEndpoints,
            endpoints: endpoints,
            proxyTo: realApiBaseUrl,
            outputDirForProxied: outputDir,
            usingVariantsFromCookie: matcher_1.extractVariantsFromRequest(req),
        });
    });
    // Error handler
    app.use(function (error, req, res, next) {
        console.error(error);
        res.status(500);
        res.json({
            request: {
                path: req.path,
                params: req.params,
                query: req.query,
                method: req.method,
                cookies: req.cookies,
            },
            error: {
                message: error.message || error,
                stack: ("" + error.stack).split('\n')
            }
        });
    });
    return app;
};
//# sourceMappingURL=server.js.map