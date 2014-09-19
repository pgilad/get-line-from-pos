'use strict';
var expect = require('expect.js');
var fs = require('fs');
var getLineFromPos = require('../index');

describe('getLineFromPos', function () {
    it('should get the linePos from empty string', function () {
        expect(getLineFromPos('', 0)).to.eql(1);
    });

    it('should work with a string with no line breaks', function () {
        var str = 'this is a string without any line breaks';
        expect(getLineFromPos(str, 6)).to.eql(1);
    });

    it('should parse a basic line break string', function () {
        var str = 'this is a string\nwith line breaks';
        var str2 = 'this is a string\rwith line breaks';
        expect(getLineFromPos(str, 6)).to.eql(1);
        expect(getLineFromPos(str, str.length - 1)).to.eql(2);
        expect(getLineFromPos(str2, 25)).to.eql(2);
    });

    it('should work with edge cases of strings', function () {
        var str = 'this\nis\na\nstring';
        expect(getLineFromPos(str, 6)).to.eql(2);
        expect(getLineFromPos(str, 4)).to.eql(1);
    });

    it('should work negative positions', function () {
        var str = 'this\nstring is kewl';
        expect(getLineFromPos(str, -1)).to.eql(2);
        expect(getLineFromPos(str, -2)).to.eql(2);
        expect(getLineFromPos(str, -str.length + 1)).to.eql(1);
    });

    it('should correctly get line number from regex', function () {
        var data = fs.readFileSync('./tests/fixtures/basic.html', 'utf8');
        var rBody = /body/gi;
        var result = rBody.exec(data);
        expect(result).to.be.ok();
        expect(result.index).to.be.greaterThan(0);
        var line = getLineFromPos(data, result.index);
        expect(line).to.eql(8);
        var secondResult = rBody.exec(data);
        expect(secondResult).to.be.ok();
        expect(secondResult.index).to.be.greaterThan(result.index);
        line = getLineFromPos(data, secondResult.index);
        expect(line).to.eql(10);
    });
});
