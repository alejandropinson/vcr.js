"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var request = require("supertest");
var server_1 = require("../server");
var path = require("path");
var listAllFixtures_1 = require("../listAllFixtures");
var fs_extra_1 = require("fs-extra");
var child_process_1 = require("child_process");
var BluebirdPromise = require("bluebird");
var killProcessTree_1 = require("./helpers/killProcessTree");
var mockServer;
beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (mockServer)
                    return [2 /*return*/];
                mockServer = child_process_1.spawn('yarn', ['ts-node', '--', 'src/__tests__/helpers/server.ts'], { stdio: [0, 1, 2] });
                console.log('Started mock server process, PID: ', mockServer.pid);
                return [4 /*yield*/, BluebirdPromise.delay(3000)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Stopping mock server process, PID: ', mockServer.pid);
                killProcessTree_1.default(mockServer.pid, 'SIGKILL');
                return [4 /*yield*/, BluebirdPromise.delay(1000)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Stub server', function () {
    var app = server_1.default([path.join(__dirname, 'fixtures')], 'https://jsonplaceholder.typicode.com');
    it('should respond with index', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/')
                        .expect(404)
                        .then(function (res) {
                        return expect(res.body.message).toEqual('STUB SERVER: Sorry but we couldn\'t find any fixture by GET /');
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    it('should respond with list of possible endpoints', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/')
                        .expect(404)
                        .then(function (res) {
                        expect(res.body.endpoints).toEqual([
                            {
                                endpoint: '/cnx-gbl-org-quality/qa/v1/dm/jobsites/1',
                                method: 'GET',
                                variants: {
                                    default: path.join(__dirname, 'fixtures/cnx-gbl-org-quality/qa/v1/dm/jobsites/1/GET.default.json')
                                }
                            },
                            {
                                endpoint: '/cnx-gbl-org-quality/qa/v1/dm/jobsites',
                                method: 'GET',
                                variants: {
                                    'page=5&size=10': path.join(__dirname, 'fixtures/cnx-gbl-org-quality/qa/v1/dm/jobsites/GET.page=5&size=10.json'),
                                }
                            },
                            {
                                endpoint: '/cnx-gbl-org-quality/qa/v1/dm/jobsites/{id}',
                                method: 'GET',
                                variants: {
                                    default: path.join(__dirname, 'fixtures/cnx-gbl-org-quality/qa/v1/dm/jobsites/{id}/GET.default.js')
                                }
                            },
                            {
                                endpoint: '/cnx-gbl-org-quality/qa/v1/dtm/events',
                                method: 'GET',
                                variants: {
                                    default: path.join(__dirname, 'fixtures/cnx-gbl-org-quality/qa/v1/dtm/events/GET.default.json')
                                }
                            }
                        ]);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    it('should respond with empty list matched endpoints when nothing found', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/nonexistingEndpoint')
                        .expect(404)
                        .then(function (res) {
                        expect(res.body.matchedEndpoints).toEqual([]);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    it('should respond with list of matched endpoints for existing ones', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/cnx-gbl-org-quality/qa/v1/dm/jobsites')
                        .expect(404)
                        .then(function (res) {
                        expect(res.body.matchedEndpoints).toEqual([
                            {
                                endpoint: '/cnx-gbl-org-quality/qa/v1/dm/jobsites/1',
                                method: 'GET',
                                variants: {
                                    default: path.join(__dirname, 'fixtures/cnx-gbl-org-quality/qa/v1/dm/jobsites/1/GET.default.json')
                                }
                            },
                            {
                                endpoint: '/cnx-gbl-org-quality/qa/v1/dm/jobsites',
                                method: 'GET',
                                variants: {
                                    'page=5&size=10': path.join(__dirname, 'fixtures/cnx-gbl-org-quality/qa/v1/dm/jobsites/GET.page=5&size=10.json'),
                                }
                            },
                            {
                                endpoint: '/cnx-gbl-org-quality/qa/v1/dm/jobsites/{id}',
                                method: 'GET',
                                variants: {
                                    default: path.join(__dirname, 'fixtures/cnx-gbl-org-quality/qa/v1/dm/jobsites/{id}/GET.default.js')
                                }
                            },
                        ]);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    it('should return default fixture', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/cnx-gbl-org-quality/qa/v1/dm/jobsites/10')
                        .expect(200)
                        .then(function (res) { return expect(res.body).toEqual({ id: '10' }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return fixture based on url params', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/cnx-gbl-org-quality/qa/v1/dm/jobsites?size=10&page=5')
                        .expect(200)
                        .then(function (res) { return expect(res.body).toEqual({ jobsites: [{ id: 1 }, { id: 2 }, { id: 3 }] }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return error when error in fixture', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/cnx-gbl-org-quality/qa/v1/dm/jobsites/returnError')
                        .expect(500)
                        .then(function (res) {
                        return expect(res.body.error.message).toEqual('Something went wrong in fixture');
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return all setted variants', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.agent(app)
                        .get('/variants')
                        .set('Cookie', 'variants=/foo/bar/GET.unauthorized')
                        .expect(200)
                        .then(function (res) {
                        return expect(res.body.variants).toEqual(['/foo/bar/GET.unauthorized']);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return all possible variants', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/variants')
                        .expect(200)
                        .then(function (res) {
                        return expect(res.body.possibleVariants).toEqual([
                            '/cnx-gbl-org-quality/qa/v1/dm/jobsites/1/GET.default',
                            '/cnx-gbl-org-quality/qa/v1/dm/jobsites/GET.page=5&size=10',
                            '/cnx-gbl-org-quality/qa/v1/dm/jobsites/{id}/GET.default',
                            '/cnx-gbl-org-quality/qa/v1/dtm/events/GET.default'
                        ]);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should add variant to cookie by calling variants endpoint', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.agent(app)
                        .get('/variants?add=/fooBar/GET.blacklisted')
                        .set('Cookie', 'variants=/foo/bar/GET.unauthorized')
                        .expect(200)
                        .then(function (res) {
                        expect(res.body.variants).toEqual(['/foo/bar/GET.unauthorized', '/fooBar/GET.blacklisted']);
                        expect(res.header['set-cookie'][0]).toEqual("variants=/foo/bar/GET.unauthorized,/fooBar/GET.blacklisted; Path=/");
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should clear variants in cookie by calling variants endpoint with clear flag', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.agent(app)
                        .get('/variants?clear=t')
                        .set('Cookie', 'variants=/foo/bar/GET.unauthorized')
                        .expect(200)
                        .then(function (res) {
                        expect(res.body.variants).toEqual([]);
                        expect(res.header['set-cookie'][0]).toEqual("variants=; Path=/");
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should overwrite variants cookie by calling variants endpoint', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.agent(app)
                        .get('/variants?set=/fooBar/GET.blacklisted,/foo/GET.blacklisted')
                        .set('Cookie', 'variants=/foo/bar/GET.unauthorized')
                        .expect(200)
                        .then(function (res) {
                        expect(res.body.variants).toEqual(['/fooBar/GET.blacklisted', '/foo/GET.blacklisted']);
                        expect(res.header['set-cookie'][0]).toEqual("variants=/fooBar/GET.blacklisted,/foo/GET.blacklisted; Path=/");
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should remove duplicate variants when adding new', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.agent(app)
                        .get('/variants?add=/fooBar/GET.unauthorized')
                        .set('Cookie', 'variants=/fooBar/GET.blacklisted,/foo/bar/GET.unauthorized')
                        .expect(200)
                        .then(function (res) {
                        expect(res.body.variants).toEqual(['/foo/bar/GET.unauthorized', '/fooBar/GET.unauthorized']);
                        expect(res.header['set-cookie'][0]).toEqual("variants=/foo/bar/GET.unauthorized,/fooBar/GET.unauthorized; Path=/");
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should pass GET not matched request by proxy real api', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.agent(app)
                        .get('/users')
                        .expect(200)
                        .then(function (res) {
                        expect(res.body.length).toEqual(10); // should return 10 users
                        expect(res.body[0].id).toEqual(1); // should return id 1 for first user
                        expect(res.body[0].username).toEqual('Bret'); // should return id 1 for first user
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Stub server in proxy mode', function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var outputFixturesDir, fixtureDirs;
    return __generator(this, function (_a) {
        outputFixturesDir = path.join(__dirname, 'generatedFixtures');
        fixtureDirs = [path.join(__dirname, 'fixtures')];
        beforeEach(function () {
            // console.log('=======', listAllFixtures(outputFixturesDir));
            fs_extra_1.emptyDirSync(outputFixturesDir);
        });
        afterEach(function () {
            fs_extra_1.emptyDirSync(outputFixturesDir);
        });
        it('should proxy requests and keep correct encoding - gzip', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked')
                                .set('accept-encoding', 'gzip')
                                .expect(200)
                                .expect('content-encoding', 'gzip')
                                .then(function (res) { })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should proxy requests and keep correct encoding - deflate', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked')
                                .set('accept-encoding', 'deflate')
                                .expect(200)
                                .expect('content-encoding', 'deflate')
                                .then(function (res) { })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should proxy requests and keep correct encoding - gzip, deflate', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked')
                                .set('accept-encoding', 'deflate, gzip')
                                .expect(200)
                                .expect('content-encoding', 'deflate')
                                .then(function (res) { })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should save correctly decoded fixture to fixturePath ', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked')
                                .expect(200)
                                .then(function (res) {
                                var fixturesMap = listAllFixtures_1.default(outputFixturesDir);
                                expect(Object.keys(fixturesMap).length).toBe(1);
                                var fixtureName = Object.keys(fixturesMap)[0];
                                var fixturePath = fixturesMap[fixtureName];
                                var fixture = require(fixturePath);
                                expect(fixtureName.search(/mocked/) > -1).toBeTruthy();
                                expect(fixture.answer).toBe(42);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should proxy and save custom variant when cookie record_fixture_variant is set but default fixture is present', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked')
                                .expect(200)
                                .then(function (res) {
                                var fixturesMap = listAllFixtures_1.default(outputFixturesDir);
                                expect(Object.keys(fixturesMap).length).toBe(1);
                                var fixtureName = Object.keys(fixturesMap)[0];
                                var fixturePath = fixturesMap[fixtureName];
                                var fixture = require(fixturePath);
                                expect(fixtureName.search(/default/) > -1).toBeTruthy();
                                expect(fixture.answer).toBe(42);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked')
                                .set('Cookie', 'record_fixture_variant=someVariant')
                                .expect(200)
                                .then(function (res) {
                                var fixturesMap = listAllFixtures_1.default(outputFixturesDir);
                                expect(Object.keys(fixturesMap).length).toBe(2);
                                var fixtureName = Object.keys(fixturesMap)[1];
                                var fixturePath = fixturesMap[fixtureName];
                                var fixture = require(fixturePath);
                                expect(fixtureName.search(/someVariant/) > -1).toBeTruthy();
                                expect(fixture.answer).toBe(42);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should proxy and save variant derived from request query when no variant specified in cookie', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked?size=10&page=3')
                                .expect(200)
                                .then(function (res) {
                                var fixturesMap = listAllFixtures_1.default(outputFixturesDir);
                                expect(Object.keys(fixturesMap).length).toBe(1);
                                var fixtureName = Object.keys(fixturesMap)[0];
                                var fixturePath = fixturesMap[fixtureName];
                                var fixture = require(fixturePath);
                                expect(fixtureName.search(/page=3&size=10/) > -1).toBeTruthy();
                                expect(fixture.answer).toBe(42);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should proxy requests and keep query params', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .get('/mocked?query=1')
                                .expect(200)
                                .then(function (res) {
                                expect(res.header['x-proxied-to']).toBe('http://localhost:5000/mocked?query=1');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should save correctly decoded fixture to fixturePath for POST request ', function () { return __awaiter(_this, void 0, void 0, function () {
            var appserver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appserver = server_1.default(fixtureDirs, 'http://localhost:5000', outputFixturesDir);
                        return [4 /*yield*/, request.agent(appserver)
                                .post('/mocked')
                                .send({ bodyProp: 42 })
                                .expect(200)
                                .then(function (res) {
                                var fixturesMap = listAllFixtures_1.default(outputFixturesDir);
                                expect(Object.keys(fixturesMap).length).toBe(1);
                                var fixtureName = Object.keys(fixturesMap)[0];
                                var fixturePath = fixturesMap[fixtureName];
                                var fixture = require(fixturePath);
                                expect(fixtureName.search(/POST/) > -1).toBeTruthy();
                                expect(fixture.bodyProp).toBe(42);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=server.spec.js.map