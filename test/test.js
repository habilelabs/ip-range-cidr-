"use strict";

const assert = require('chai').assert;
const IP4CIDR = require('../index');


let validIPStartRange = '46.28.104.0';
let validIPEndRange = '46.28.111.255';

let validCIDR = '46.28.104.0/21'


let invalidIPStartRange = '234.23.0';
let invalidIPEndRange = '000.00000.0';

describe('IP4CIDR:', function () {
  describe('check validity:', function () {
    it('should be valid', function () {
      let cidr = new IP4CIDR(validIPStartRange,validIPEndRange);
      assert.isOk(cidr.isValid());
    });

    it('should be invalid', function () {
      let ipcidr = new IP4CIDR(invalidIPStartRange,invalidIPEndRange);
      assert.isNotOk(ipcidr.isValid());
    });
  });


  describe("check methods", function () {
    it('.iprange2cidr()', function () {
      let ipcidr = new IP4CIDR(validIPStartRange,validIPEndRange);
      assert.equal(ipcidr.iprange2cidr(), validCIDR);
    });

  });

});