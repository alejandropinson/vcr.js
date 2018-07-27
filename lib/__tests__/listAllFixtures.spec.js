"use strict";
var path = require("path");
var listAllFixtures_1 = require("../listAllFixtures");
describe('listDirectoryFixtures()', function () {
    it('returns list of all files in directory', function () {
        expect(listAllFixtures_1.listDirectoryFixtures(path.join(__dirname, 'listFiles')))
            .toEqual({
            'bar/GET.fooBar.json': path.join(__dirname, 'listFiles/bar/GET.fooBar.json'),
            'foo/POST.bar.js': path.join(__dirname, 'listFiles/foo/POST.bar.js')
        });
    });
    it('returns list of all files for second test dir', function () {
        expect(listAllFixtures_1.listDirectoryFixtures(path.join(__dirname, 'listFilesB')))
            .toEqual({
            'POST.foo.json': path.join(__dirname, 'listFilesB/POST.foo.json'),
            'bar/GET.fooBar.json': path.join(__dirname, 'listFilesB/bar/GET.fooBar.json')
        });
    });
    it('should ignore files not starting with method word (GET, POST, ...)', function () {
        expect(listAllFixtures_1.listDirectoryFixtures(path.join(__dirname, 'listFilesWithExtra')))
            .toEqual({
            'bar/GET.fooBar.json': path.join(__dirname, 'listFilesWithExtra/bar/GET.fooBar.json'),
            'foo/POST.bar.js': path.join(__dirname, 'listFilesWithExtra/foo/POST.bar.js')
        });
    });
});
describe('listAllFixtures()', function () {
    it('should return all fixtures', function () {
        expect(listAllFixtures_1.default([path.join(__dirname, 'listFiles'), path.join(__dirname, 'listFilesB')]))
            .toEqual({
            'POST.foo.json': path.join(__dirname, 'listFilesB/POST.foo.json'),
            'foo/POST.bar.js': path.join(__dirname, 'listFiles/foo/POST.bar.js'),
            'bar/GET.fooBar.json': path.join(__dirname, 'listFilesB/bar/GET.fooBar.json'),
        });
    });
    it('should return all fixtures even with dynamic params', function () {
        var baseDir = 'fixtures/cnx-gbl-org-quality/qa/v1';
        expect(listAllFixtures_1.default([path.join(__dirname, baseDir)]))
            .toEqual({
            'dm/jobsites/1/GET.default.json': path.join(__dirname, baseDir, 'dm/jobsites/1/GET.default.json'),
            'dm/jobsites/{id}/GET.default.js': path.join(__dirname, baseDir, 'dm/jobsites/{id}/GET.default.js'),
            'dtm/events/GET.default.json': path.join(__dirname, baseDir, 'dtm/events/GET.default.json'),
            'dm/jobsites/GET.page=5&size=10.json': path.join(__dirname, baseDir, 'dm/jobsites/GET.page=5&size=10.json')
        });
    });
});
//# sourceMappingURL=listAllFixtures.spec.js.map