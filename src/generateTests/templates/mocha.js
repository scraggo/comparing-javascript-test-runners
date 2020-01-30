const { expect } = require('chai');

const { fullCircle, range } = require('../src');

describe('fullCircle', function() {
  range(0, 25).forEach(num => {
    it(`returns self in ${num} milliseconds`, function() {
      const res = fullCircle('hi', num);
      expect(res).to.equal('hi');
    });
  });
});
