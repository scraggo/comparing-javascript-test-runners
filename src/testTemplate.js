const { expect } = require('chai');

const { fullCircle, range } = require('../src');

describe('fullCircle', function() {
  it('returns self in 0 seconds', function() {
    const res = fullCircle('hi', 0);
    expect(res).to.equal('hi');
  });
  range(1, 25).forEach(num => {
    it(`returns self in ${num} milliseconds`, function() {
      const res = fullCircle('hi', num);
      expect(res).to.equal('hi');
    });
  });
});
