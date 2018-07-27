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
var zlib = require("zlib");
var Stream = require("stream");
var through = require("through");
exports.STATUS_TO_RESPONSE = {
    '201': null,
    '401': { message: 'unauthorized' },
    '404': { message: 'not found' },
    '500': { message: 'internal server error' },
    DEFAULT: {
        message: 'success',
        info: 'From simple JSON server with encoding!',
        answer: 42,
    }
};
// append request headers to affect returned stub
exports.HEADERS = {
    STATUS: 'x-stub-status',
};
var getJson$ = function (statusCode) {
    var status = statusCode.toString();
    var body = status in exports.STATUS_TO_RESPONSE ? exports.STATUS_TO_RESPONSE[status] : exports.STATUS_TO_RESPONSE.DEFAULT;
    var json$ = new Stream.Readable;
    if (!!body)
        json$.push(JSON.stringify(body));
    json$.push(null);
    // json$.pipe(process.stdout);
    return json$;
};
var parseEncoding = function (acceptEncodingHeader) {
    if (acceptEncodingHeader === void 0) { acceptEncodingHeader = ''; }
    var matched = acceptEncodingHeader.match(/(gzip)|(deflate)/);
    var encoding = matched && matched[0] || '';
    var encoder = {
        'gzip': zlib.createGzip(),
        'deflate': zlib.createDeflate(),
    }[encoding] || through();
    return { encoding: encoding, encoder: encoder };
};
var assembleHeaders = function (encoding) {
    return {
        'Content-Type': 'application/json',
        'content-encoding': encoding
    };
};
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var statusCode, _a, encoder, encoding, json$, encoded$;
        return __generator(this, function (_b) {
            statusCode = parseInt(req.headers[exports.HEADERS.STATUS], 10) || 200;
            if (req.method === 'POST') {
                res.writeHead(statusCode, { 'Content-Type': 'application/json' });
                req.pipe(res);
            }
            else {
                _a = parseEncoding(req.headers['accept-encoding']), encoder = _a.encoder, encoding = _a.encoding;
                json$ = getJson$(statusCode);
                encoded$ = json$.pipe(encoder);
                res.writeHead(statusCode, assembleHeaders(encoding));
                encoded$.pipe(res);
            }
            return [2 /*return*/];
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=handleMockRequest.js.map