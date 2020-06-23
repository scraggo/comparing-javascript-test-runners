const { expect } = require('chai');
const sinon = require('sinon');

const { getDateTime } = require('../../src/utils');

const randomDate = new Date('Jan 1 2000');
const convertedDate = 'Saturday, January 1, 2000 0:0:0';

describe('date utils', function() {
  describe('getDateTime', function() {
    it('gets a specific date time', function() {
      const res = getDateTime(randomDate);
      expect(res).to.equal(convertedDate);
    });

    it('gets Date.now as default', function() {
      const stub = sinon.stub(global, 'Date').returns(randomDate);
      const res = getDateTime();
      expect(res).to.equal(convertedDate);
      stub.restore();
    });
  });
});
