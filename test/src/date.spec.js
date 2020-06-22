const { expect } = require('chai');
const sinon = require('sinon');

const { getDateTime } = require('../../src/utils');

describe('date utils', function() {
  describe('getDateTime', function() {
    it('gets a specific date time', function() {
      const res = getDateTime(new Date('Jan 1 2000'));
      expect(res).to.equal('Saturday, January 1, 2000 0:0:0');
    });

    it('gets Date.now as default', function() {
      sinon.stub(Date.prototype, 'constructor').returns(new Date('Jan 1 2000'));
      const res = getDateTime(new Date());
      expect(res).to.equal('Saturday, January 1, 2000 0:0:0');
    });
  });
});
