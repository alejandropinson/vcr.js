"use strict";
var encodeUrlParams_1 = require("../encodeUrlParams");
it('encodeUrlParams', function () {
    expect(encodeUrlParams_1.encodeUrlParams({ foo: 'bar' })).toEqual('foo=bar');
    expect(encodeUrlParams_1.encodeUrlParams({ foo: 'bar foo' })).toEqual('foo=bar%20foo');
    expect(encodeUrlParams_1.encodeUrlParams({ bar: 'foo', foo: 'bar' })).toEqual('bar=foo&foo=bar');
});
it('encodeUrlParams with sorted keys', function () {
    expect(encodeUrlParams_1.encodeUrlParams({ c: 'c', a: 'a', b: 'b' })).toEqual('a=a&b=b&c=c');
});
it('encodeUrlParams works without any data', function () {
    expect(encodeUrlParams_1.encodeUrlParams()).toEqual('');
});
//# sourceMappingURL=encodeUrlParams.spec.js.map