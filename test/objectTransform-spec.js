'use strict';

var chai = require('chai'),
    expect = chai.expect,
    transform = require('../');

describe('main function ()', function() {

    it('should convert in both ways in the same way', function() {

        var src = {'servername': 'pro.mac', upstreamPort: 7000, upstreamHost: '10.1.16.119', ws: true};
        var res = transform.deep(src);
        var dest = transform.flat(res);

        expect(src).eql(dest);
    });
});
